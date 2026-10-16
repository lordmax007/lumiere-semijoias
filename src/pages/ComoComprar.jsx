import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px' }
const h1 = { fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:20, color:'#b8922a', margin:'36px 0 12px' }
const th = { background:'#D4AF3715', padding:'8px 14px', textAlign:'left', borderBottom:'1px solid #ddd', fontWeight:600, fontSize:13 }
const td = { padding:'8px 14px', borderBottom:'1px solid #f0f0f0', fontSize:13 }

const aneis = [[10,'15.9'],[11,'16.5'],[12,'17.2'],[13,'17.8'],[14,'18.5'],[15,'19.1'],[16,'19.7'],[17,'20.4'],[18,'21.0'],[19,'21.7'],[20,'22.3'],[21,'22.9'],[22,'23.6'],[23,'24.2'],[24,'24.8'],[25,'25.5'],[26,'26.1']]

export default function ComoComprar() {
  return (
    <div style={s}>
      <SEOMeta title="Como comprar" description="Passo a passo para comprar na Pérolla do Tapajós e guia de tamanhos." />
      <h1 style={h1}>Como comprar</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <h2 style={h2}>Passo a passo</h2>
      <ol style={{ lineHeight:2.2, color:'#444', fontSize:14, paddingLeft:20 }}>
        <li>Navegue pelo catálogo e encontre a peça que quiser 💍</li>
        <li>Clique em <strong>"Comprar via WhatsApp"</strong> no produto desejado</li>
        <li>Confirme o pedido com a loja e informe seu endereço</li>
        <li>Receba o link ou chave Pix para pagamento</li>
        <li>Após confirmação do pagamento, o pedido é enviado 📦</li>
        <li>Você recebe o código de rastreamento pelo WhatsApp</li>
      </ol>

      <h2 style={h2}>Tamanho de anel (aro)</h2>
      <p style={{ fontSize:13, color:'#666', marginBottom:12 }}>Para medir: envolva o dedo com um pedaço de papel ou fita, marque onde se encontra, mida com régua e consulte a tabela abaixo.</p>
      <svg viewBox="0 0 200 80" style={{ maxWidth:240, display:'block', margin:'0 auto 16px' }}>
        <rect x="10" y="20" width="60" height="40" rx="4" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
        <text x="40" y="44" textAnchor="middle" fontSize="10" fill="#555">Dedo</text>
        <line x1="10" y1="70" x2="70" y2="70" stroke="#D4AF37" strokeWidth="1.5" markerEnd="url(#arr)"/>
        <text x="40" y="80" textAnchor="middle" fontSize="9" fill="#888">circunferência (mm)</text>
      </svg>
      <table style={{ borderCollapse:'collapse', width:'100%', marginBottom:32 }}>
        <thead><tr><th style={th}>Aro</th><th style={th}>Diâmetro interno (mm)</th></tr></thead>
        <tbody>{aneis.map(([a,d]) => <tr key={a}><td style={td}>{a}</td><td style={td}>{d}</td></tr>)}</tbody>
      </table>

      <h2 style={h2}>Tamanho de pulseira</h2>
      <table style={{ borderCollapse:'collapse', width:'100%', marginBottom:32 }}>
        <thead><tr><th style={th}>Tamanho</th><th style={th}>Comprimento</th></tr></thead>
        <tbody>
          {[['PP','14 cm'],['P','15–16 cm'],['M','17–18 cm'],['G','19–20 cm']].map(([t,c]) => <tr key={t}><td style={td}>{t}</td><td style={td}>{c}</td></tr>)}
        </tbody>
      </table>

      <h2 style={h2}>Tamanho de colar</h2>
      <table style={{ borderCollapse:'collapse', width:'100%', marginBottom:32 }}>
        <thead><tr><th style={th}>Comprimento</th><th style={th}>Onde fica</th></tr></thead>
        <tbody>
          {[['40 cm','Coleira (base do pescoço)'],['45 cm','Clavícula'],['50 cm','Busto']].map(([c,o]) => <tr key={c}><td style={td}>{c}</td><td style={td}>{o}</td></tr>)}
        </tbody>
      </table>

      <p style={{ fontSize:13, color:'#888' }}>Dúvidas? Fale conosco pelo <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>WhatsApp</a>!</p>
    </div>
  )
}
