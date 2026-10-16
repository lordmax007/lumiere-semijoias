import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#333', lineHeight:1.8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:19, color:'#b8922a', margin:'32px 0 8px' }

export default function Trocas() {
  return (
    <div style={s}>
      <SEOMeta title="Trocas e Devoluções" description="Política de trocas, devoluções e direito de arrependimento da Pérolla do Tapajós." />
      <h1 style={{ fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }}>Política de Trocas e Devoluções</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <h2 style={h2}>1. Direito de arrependimento (CDC, art. 49)</h2>
      <p>Para compras realizadas <strong>pela internet</strong>, você tem direito de cancelar a compra em até <strong>7 dias corridos</strong> a partir do recebimento do produto, sem precisar apresentar nenhum motivo. O produto deve ser devolvido nas mesmas condições em que foi recebido.</p>

      <h2 style={h2}>2. Como solicitar</h2>
      <p>Entre em contato pelo WhatsApp <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>(93) 99217-5713</a> ou por e-mail <a href="mailto:[PREENCHER]" style={{ color:'#D4AF37' }}>[PREENCHER]</a> em até 7 dias após o recebimento. Informe o número do pedido e o motivo.</p>

      <h2 style={h2}>3. Condições do produto para troca/devolução</h2>
      <ul>
        <li>Produto sem sinais de uso;</li>
        <li>Na embalagem original (quando possível);</li>
        <li>Acompanhado de nota fiscal ou comprovante de compra.</li>
      </ul>

      <h2 style={h2}>4. Troca por defeito (CDC, art. 26)</h2>
      <p>Produtos com vício/defeito podem ser trocados em até <strong>30 dias</strong> após o recebimento (produtos não duráveis como semijoias). Envie foto do defeito pelo WhatsApp para iniciar o processo.</p>

      <h2 style={h2}>5. Frete de devolução</h2>
      <p>[PREENCHER — quem paga o frete de retorno: o cliente ou a loja?]</p>

      <h2 style={h2}>6. Reembolso</h2>
      <p>Após recebermos e conferirmos o produto devolvido, o reembolso será processado em até <strong>[PREENCHER]</strong> dias úteis, pelo mesmo meio de pagamento utilizado na compra.</p>

      <p style={{ marginTop:40, padding:16, background:'#fff3cd', borderRadius:8, fontSize:13, color:'#856404' }}>
        ⚠️ Modelo — revise com advogado antes de publicar.
      </p>
    </div>
  )
}
