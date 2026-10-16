import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#333', lineHeight:1.8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:19, color:'#b8922a', margin:'32px 0 8px' }

export default function Entrega() {
  return (
    <div style={s}>
      <SEOMeta title="Entrega e Frete" description="Prazos de entrega, transportadoras e frete da Pérolla do Tapajós." />
      <h1 style={{ fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }}>Política de Entrega e Frete</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <h2 style={h2}>Regiões atendidas</h2>
      <p>Enviamos para todo o Brasil.</p>

      <h2 style={h2}>Transportadora</h2>
      <p>[PREENCHER — ex: Correios (PAC/SEDEX), transportadora particular]</p>

      <h2 style={h2}>Prazos</h2>
      <p>Os pedidos são enviados em até <strong>[PREENCHER]</strong> dias úteis após a confirmação do pagamento. Após o envio, o prazo de entrega varia de acordo com a sua localidade e a modalidade de frete escolhida.</p>

      <h2 style={h2}>Cálculo do frete</h2>
      <p>O frete é calculado no momento do pedido, conforme o seu CEP e o peso/dimensões do produto. O valor será informado pelo WhatsApp antes da confirmação. [PREENCHER — se houver frete grátis a partir de determinado valor, informe aqui]</p>

      <h2 style={h2}>Rastreamento</h2>
      <p>Após a postagem, enviaremos o código de rastreamento pelo WhatsApp. Você pode acompanhar pelo site dos Correios ou da transportadora.</p>

      <h2 style={h2}>Retirada em loja</h2>
      <p>[PREENCHER — endereço para retirada, horários e como combinar]</p>

      <p style={{ marginTop:40, padding:16, background:'#fff3cd', borderRadius:8, fontSize:13, color:'#856404' }}>
        ⚠️ Modelo — revise com advogado antes de publicar.
      </p>
    </div>
  )
}
