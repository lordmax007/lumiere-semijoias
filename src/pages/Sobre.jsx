import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#222' }
const h1 = { fontFamily:'serif', fontWeight:300, fontSize:36, color:'#D4AF37', marginBottom:8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:22, color:'#b8922a', margin:'32px 0 8px' }
const sub = { color:'#888', fontSize:13, marginBottom:32, fontStyle:'italic' }

export default function Sobre() {
  return (
    <div style={s}>
      <SEOMeta title="Sobre nós" description="Conheça a história da Pérolla do Tapajós, de Santarém-PA." />
      <h1 style={h1}>Sobre a Pérolla do Tapajós</h1>
      <p style={sub}>Última atualização: outubro de 2026</p>

      <p>A <strong>Pérolla do Tapajós</strong> nasceu em Santarém, no coração do Pará, com uma missão simples: levar beleza e elegância para todo o Brasil, com preços acessíveis e atendimento de verdade.</p>

      <p>O nome é uma homenagem ao Rio Tapajós — o rio de águas azul-esverdeadas que deu à Santarém o apelido de "Pérola do Tapajós". Nossa frase de coração: <em>"A beleza que brilha como o Rio."</em></p>

      <h2 style={h2}>Nossa história</h2>
      <p>[PREENCHER — conte como a loja surgiu, quem é a fundadora, quando começou, inspiração pessoal]</p>

      <div style={{ background:'#D4AF3722', border:'1px dashed #D4AF37', borderRadius:8, padding:'20px 24px', margin:'24px 0', color:'#b8922a', fontStyle:'italic', textAlign:'center' }}>
        📷 Foto da loja [PREENCHER — adicione uma foto aqui]
      </div>

      <h2 style={h2}>O que vendemos</h2>
      <p>Trabalhamos com <strong>semijoias</strong>, <strong>folheados a ouro e prata</strong> e <strong>aço inoxidável</strong> — peças duráveis, elegantes e com ótimo custo-benefício. Brincos, anéis, colares, correntes, pulseiras, braceletes, chokers e conjuntos para todos os estilos.</p>

      <h2 style={h2}>Nossos valores</h2>
      <ul style={{ lineHeight:2 }}>
        <li>✨ <strong>Qualidade</strong> — peças selecionadas com cuidado</li>
        <li>💛 <strong>Beleza acessível</strong> — elegância sem pesar no bolso</li>
        <li>🤝 <strong>Atendimento humano</strong> — você fala direto com a loja pelo WhatsApp</li>
        <li>🌊 <strong>Orgulho amazônida</strong> — feito com amor de Santarém para o Brasil</li>
      </ul>

      <h2 style={h2}>Fale conosco</h2>
      <p>WhatsApp: <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>(93) 99217-5713</a> | Instagram: <a href="https://instagram.com/perolladotapajos" style={{ color:'#D4AF37' }}>@perolladotapajos</a></p>
    </div>
  )
}
