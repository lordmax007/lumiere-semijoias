import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    // Autenticar usuário via JWT (opcional — guest checkout permitido)
    const authHeader = req.headers.get("Authorization");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, // service role — nunca exposto ao cliente
    );

    const body = await req.json();
    const { items, customer, total } = body;

    // Validação básica
    if (!items?.length || !customer?.name || !customer?.email || !total) {
      return new Response(JSON.stringify({ error: "Dados inválidos" }), { status: 400, headers: { ...CORS, "Content-Type": "application/json" } });
    }

    // Sanitizar inputs
    const sanitizedCustomer = {
      name: String(customer.name).slice(0, 200),
      email: String(customer.email).slice(0, 254),
      phone: String(customer.phone || "").slice(0, 20),
      cpf: String(customer.cpf || "").replace(/\D/g, "").slice(0, 11),
      address: String(customer.address || "").slice(0, 300),
      city: String(customer.city || "").slice(0, 100),
      state: String(customer.state || "").slice(0, 2).toUpperCase(),
      zip: String(customer.zip || "").replace(/\D/g, "").slice(0, 8),
    };

    // Obter user_id se autenticado
    let userId: string | null = null;
    if (authHeader) {
      const { data: { user } } = await createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      ).auth.getUser();
      userId = user?.id ?? null;
    }

    // Criar pedido no banco
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({ user_id: userId, total, customer: sanitizedCustomer, status: "aguardando" })
      .select("id")
      .single();

    if (orderErr) throw orderErr;

    // Inserir itens
    await supabase.from("order_items").insert(
      items.map((i: any) => ({
        order_id: order.id,
        product_id: i.id,
        product_name: String(i.name).slice(0, 200),
        price: Number(i.price),
        qty: Number(i.qty),
        variant: i.variant ? String(i.variant).slice(0, 20) : null,
      }))
    );

    // Chamar InfinitePay
    const token = Deno.env.get("INFINITEPAY_TOKEN");
    if (!token) {
      return new Response(JSON.stringify({ error: "INFINITEPAY_TOKEN não configurado" }), {
        status: 500, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const ipResponse = await fetch("https://api.infinitepay.io/v2/payment_links", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total,
        installments: 6,
        description: `Pedido Lumière #${order.id.slice(0, 8)}`,
        customer_name: sanitizedCustomer.name,
        customer_email: sanitizedCustomer.email,
        customer_document: sanitizedCustomer.cpf,
        items: items.map((i: any) => ({
          name: String(i.name).slice(0, 100),
          unit_price: Number(i.price),
          quantity: Number(i.qty),
        })),
      }),
    });

    if (!ipResponse.ok) {
      const errBody = await ipResponse.text();
      console.error("InfinitePay error:", errBody);
      return new Response(JSON.stringify({ error: "Erro ao criar link de pagamento" }), {
        status: 502, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const ipData = await ipResponse.json();
    const paymentUrl: string = ipData.url || ipData.payment_url;

    // Salvar URL no pedido
    await supabase.from("orders").update({
      payment_url: paymentUrl,
      infinitepay_order_id: ipData.id,
    }).eq("id", order.id);

    return new Response(JSON.stringify({ payment_url: paymentUrl, order_id: order.id }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
