import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/mockData'
import { supabase, isConfigured } from '../lib/supabase'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', cpf: '', address: '', city: '', state: '', zip: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const required = ['name', 'email', 'phone', 'cpf', 'address', 'city', 'state', 'zip']
    for (const k of required) {
      if (!form[k].trim()) return `Preencha o campo ${k}`
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'E-mail inválido'
    if (items.length === 0) return 'Carrinho vazio'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const err = validate()
    if (err) { setError(err); return }
    setLoading(true)

    try {
      // Chama a edge function do Supabase que cria o pedido e retorna URL InfinitePay
      if (isConfigured && supabase) {
        const { data, error: fnErr } = await supabase.functions.invoke('checkout', {
          body: { items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, variant: i.variant })), customer: form, total },
        })
        if (fnErr) throw fnErr
        if (data?.payment_url) {
          clearCart()
          window.location.href = data.payment_url
          return
        }
      }
      // Modo demo: simula redirecionamento
      alert('Modo demonstração: pedido criado! Em produção você seria redirecionado ao pagamento.')
      clearCart()
    } catch (e) {
      setError('Erro ao processar pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">Seu carrinho está vazio.</p>
      <a href="/" className="text-sm underline">Voltar à loja</a>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl font-light mb-8">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} noValidate className="grid md:grid-cols-2 gap-8">
        {/* Dados */}
        <div className="space-y-4">
          <h2 className="font-serif text-xl font-light">Seus dados</h2>
          {[
            { k: 'name', label: 'Nome completo', type: 'text' },
            { k: 'email', label: 'E-mail', type: 'email' },
            { k: 'phone', label: 'Telefone / WhatsApp', type: 'tel' },
            { k: 'cpf', label: 'CPF', type: 'text' },
            { k: 'address', label: 'Endereço completo', type: 'text' },
            { k: 'city', label: 'Cidade', type: 'text' },
            { k: 'state', label: 'Estado (UF)', type: 'text' },
            { k: 'zip', label: 'CEP', type: 'text' },
          ].map(({ k, label, type }) => (
            <div key={k}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input
                type={type}
                value={form[k]}
                onChange={set(k)}
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors"
                maxLength={200}
                autoComplete="on"
              />
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div>
          <h2 className="font-serif text-xl font-light mb-4">Resumo do pedido</h2>
          <div className="bg-gray-50 rounded-card p-5 space-y-3">
            {items.map(i => (
              <div key={i._key} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate max-w-[60%]">{i.name}{i.variant ? ` (${i.variant})` : ''} ×{i.qty}</span>
                <span className="font-medium">{formatPrice(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-gray-400">Frete calculado na próxima etapa</p>
          </div>

          {error && <p className="text-red-500 text-sm mt-3 p-3 bg-red-50 rounded-btn">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gray-900 text-white py-3.5 rounded-btn font-medium hover:bg-gray-700 transition-colors disabled:opacity-60 text-sm tracking-wide"
          >
            {loading ? 'Processando...' : 'Ir para o pagamento →'}
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">🔒 Pagamento processado com segurança pela InfinitePay</p>
        </div>
      </form>
    </div>
  )
}
