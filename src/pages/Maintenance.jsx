export const MAINTENANCE_MODE = false

export default function Maintenance() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#010c10', color:'#fff', textAlign:'center', padding:40 }}>
      <img src="/imgs/logo-perolla-transparent.png" alt="Pérolla do Tapajós" style={{ maxWidth:280, marginBottom:32 }} />
      <h1 style={{ color:'#D4AF37', fontFamily:'serif', fontWeight:300, fontSize:26, marginBottom:12 }}>Estamos em manutenção</h1>
      <p style={{ color:'#aaa' }}>Voltamos em breve. Obrigada pela paciência! 💎</p>
    </div>
  )
}
