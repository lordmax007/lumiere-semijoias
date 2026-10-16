import { Link } from 'react-router-dom'
import SEOMeta from '../components/SEOMeta'

export default function NotFound() {
  return (
    <div style={{ minHeight:'70vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px 20px', background:'#010c10', color:'#fff' }}>
      <SEOMeta title="Página não encontrada" />
      <img src="/imgs/logo-perolla-transparent.png" alt="Pérolla do Tapajós" style={{ maxWidth:280, marginBottom:32, opacity:0.85 }} />
      <h1 style={{ color:'#D4AF37', fontSize:28, fontFamily:'serif', fontWeight:300, marginBottom:8 }}>Página não encontrada</h1>
      <p style={{ color:'#aaa', fontSize:15, marginBottom:32 }}>Essa joia parece ter saído do catálogo... mas temos muitas outras!</p>
      <Link to="/perolla" style={{ background:'#D4AF37', color:'#010c10', padding:'12px 28px', borderRadius:8, fontWeight:600, textDecoration:'none', marginBottom:32 }}>
        Voltar para a loja
      </Link>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginTop:16 }}>
        {[['Brincos','/perolla/brincos'],['Anéis','/perolla/aneis'],['Colares','/perolla/colares'],['Correntes','/perolla/correntes']].map(([n,h]) => (
          <Link key={n} to={h} style={{ color:'#D4AF37', fontSize:13, textDecoration:'underline' }}>{n}</Link>
        ))}
      </div>
    </div>
  )
}
