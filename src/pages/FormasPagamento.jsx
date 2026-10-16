import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#333', lineHeight:1.8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:19, color:'#b8922a', margin:'32px 0 8px' }
const card = { border:'1px solid #eee', borderRadius:10, padding:'20px 24px', marginBottom:16 }

export default function FormasPagamento() {
  return (
    <div style={s}>
      <SEOMeta title="Formas de pagamento" description="Pix, cartão e link de pagamento InfinitePay na Pérolla do Tapajós." />
      <h1 style={{ fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }}>Formas de pagamento</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <div style={card}>
        <h2 style={{ ...h2, margin:'0 0 8px', color:'#059669' }}>⚡ Pix</h2>
        <p style={{ margin:0 }}>Pagamento instantâneo, disponível 24h por dia. Aprovação imediata — seu pedido é confirmado na hora. A chave Pix será enviada pelo WhatsApp após a confirmação do pedido.</p>
      </div>

      <div style={card}>
        <h2 style={{ ...h2, margin:'0 0 8px' }}>💳 Cartão de crédito ou débito</h2>
        <p style={{ margin:0 }}>Pagamento via <strong>link seguro da InfinitePay</strong>, enviado pelo WhatsApp. Aceitamos as principais bandeiras (Visa, Mastercard, Elo, Amex). Aprovação em até <strong>[PREENCHER]</strong> horas.</p>
      </div>

      <h2 style={h2}>Segurança da compra</h2>
      <p>Os pagamentos são processados diretamente pela <strong>InfinitePay</strong>, empresa regulada pelo Banco Central do Brasil. <strong>Nenhum dado de cartão é armazenado no site da Pérolla.</strong> Toda comunicação é criptografada via TLS/HTTPS.</p>

      <p>Dúvidas? Fale pelo <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>WhatsApp (93) 99217-5713</a>.</p>
    </div>
  )
}
