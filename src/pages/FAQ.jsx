import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'

const ITEMS = [
  ['Como comprar?', 'Navegue pelo catálogo, escolha a peça que quiser e clique em "Comprar via WhatsApp". Você será redirecionada direto para conversar com a loja e confirmar o pedido. Simples assim!'],
  ['Quais as formas de pagamento?', 'Aceitamos Pix à vista. O pagamento é combinado diretamente pelo WhatsApp após a confirmação do pedido.'],
  ['Qual o prazo de entrega?', '[PREENCHER] dias úteis após a confirmação do pagamento, dependendo da sua região.'],
  ['Como funciona a troca?', <>Você tem direito à troca em caso de defeito ou arrependimento. Veja todos os detalhes na nossa <Link to="/trocas" style={{ color:'#D4AF37' }}>Política de Trocas e Devoluções</Link>.</>],
  ['Como cuidar das semijoias?', 'Evite contato com perfume, água do mar, piscina, suor excessivo e atrito. Guarde cada peça separada em um saquinho ou caixinha. Limpe com um pano seco e macio após usar.'],
  ['Como medir o aro do anel?', <><Link to="/como-comprar" style={{ color:'#D4AF37' }}>Veja nosso guia completo</Link> com tabela de tamanhos e instruções simples para medir em casa.</>],
  ['Como medir o tamanho da pulseira?', <><Link to="/como-comprar" style={{ color:'#D4AF37' }}>Veja nosso guia de tamanhos</Link> com medidas de pulseira de 14 a 20 cm.</>],
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ maxWidth:720, margin:'0 auto', padding:'48px 20px' }}>
      <SEOMeta title="Perguntas frequentes" description="Dúvidas sobre compra, entrega, trocas e cuidados com semijoias." />
      <h1 style={{ fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }}>Perguntas frequentes</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:36 }}>Última atualização: outubro de 2026</p>
      {ITEMS.map(([q, a], i) => (
        <div key={i} style={{ borderBottom:'1px solid #eee', marginBottom:4 }}>
          <button onClick={() => setOpen(open === i ? null : i)}
            style={{ width:'100%', textAlign:'left', background:'none', border:'none', padding:'16px 0', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:15, fontWeight:500, color:'#222' }}>
            {q}
            <span style={{ color:'#D4AF37', fontSize:20, lineHeight:1 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <p style={{ padding:'0 0 16px', color:'#555', fontSize:14, lineHeight:1.7, margin:0 }}>{a}</p>}
        </div>
      ))}
    </div>
  )
}
