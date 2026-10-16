export default function ErrorPage() {
  return (
    <div style={{ minHeight:'70vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:40, background:'#010c10', color:'#fff' }}>
      <img src="/imgs/logo-perolla-transparent.png" alt="Pérolla do Tapajós" style={{ maxWidth:240, marginBottom:28, opacity:0.7 }} />
      <h1 style={{ color:'#D4AF37', fontSize:24, fontFamily:'serif', fontWeight:300, marginBottom:8 }}>Algo deu errado</h1>
      <p style={{ color:'#aaa', marginBottom:28 }}>Tente novamente em alguns instantes.</p>
      <button onClick={() => window.history.back()} style={{ background:'#D4AF37', color:'#010c10', padding:'10px 24px', borderRadius:8, fontWeight:600, border:'none', cursor:'pointer' }}>Voltar</button>
    </div>
  )
}
