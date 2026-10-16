import { Link } from 'react-router-dom'
import { useCookieConsent } from '../CookieConsent'

const col = { minWidth:140 }
const title = { color:'#fff', fontSize:13, fontWeight:600, marginBottom:12, textTransform:'uppercase', letterSpacing:'0.05em' }
const li = { display:'block', color:'#9ca3af', fontSize:13, textDecoration:'none', padding:'3px 0', transition:'color .15s' }

export default function Footer() {
  const { setConsent } = useCookieConsent() || {}
  return (
    <footer style={{ background:'#111827', color:'#9ca3af', marginTop:80 }}>
      <div style={{ maxWidth:1152, margin:'0 auto', padding:'48px 20px 32px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:32 }}>

        {/* Coluna 1 */}
        <div style={{ gridColumn:'span 1' }}>
          <div style={{ fontFamily:'serif', color:'#D4AF37', fontSize:20, letterSpacing:'0.15em', marginBottom:8 }}>PÉROLLA</div>
          <p style={{ fontSize:12, color:'#6b7280', lineHeight:1.6, marginBottom:16 }}>A beleza que brilha como o Rio.</p>
          <div style={{ display:'flex', gap:12 }}>
            <a href="https://wa.me/5593992175713" target="_blank" rel="noreferrer" style={{ color:'#9ca3af', fontSize:12 }} aria-label="WhatsApp">WhatsApp</a>
            <a href="https://instagram.com/perolladotapajos" target="_blank" rel="noreferrer" style={{ color:'#9ca3af', fontSize:12 }} aria-label="Instagram">Instagram</a>
          </div>
        </div>

        {/* Coluna 2 — Atendimento */}
        <div style={col}>
          <div style={title}>Atendimento</div>
          <nav aria-label="Atendimento">
            {[['Contato','/contato'],['Perguntas frequentes','/faq'],['Como comprar','/como-comprar']].map(([l,h]) => (
              <Link key={l} to={h} style={li} onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='#9ca3af'}>{l}</Link>
            ))}
            <a href="https://wa.me/5593992175713" target="_blank" rel="noreferrer" style={li}>WhatsApp direto</a>
          </nav>
        </div>

        {/* Coluna 3 — Categorias */}
        <div style={col}>
          <div style={title}>Categorias</div>
          <nav aria-label="Categorias">
            {[['Brincos','/perolla/brincos'],['Anéis','/perolla/aneis'],['Colares','/perolla/colares'],['Correntes','/perolla/correntes'],['Pulseiras','/perolla/pulseiras'],['Braceletes','/perolla/braceletes']].map(([l,h]) => (
              <Link key={l} to={h} style={li} onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='#9ca3af'}>{l}</Link>
            ))}
          </nav>
        </div>

        {/* Coluna 4 — Legal */}
        <div style={col}>
          <div style={title}>Legal</div>
          <nav aria-label="Legal">
            {[['Privacidade','/privacidade'],['Cookies','/cookies'],['Termos de uso','/termos'],['Trocas e devoluções','/trocas'],['Entrega','/entrega'],['Formas de pagamento','/formas-pagamento']].map(([l,h]) => (
              <Link key={l} to={h} style={li} onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='#9ca3af'}>{l}</Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Barra inferior */}
      <div style={{ borderTop:'1px solid #1f2937', padding:'16px 20px', display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center', alignItems:'center', fontSize:11, color:'#6b7280', textAlign:'center' }}>
        <span>© {new Date().getFullYear()} Pérolla do Tapajós</span>
        <span>·</span>
        <span>[PREENCHER razão social]</span>
        <span>·</span>
        <span>CNPJ [PREENCHER]</span>
        <span>·</span>
        <span>[PREENCHER endereço completo]</span>
        <span>·</span>
        <span>[PREENCHER e-mail]</span>
        <span>·</span>
        <span>(93) 99217-5713</span>
        <span>·</span>
        <button onClick={() => setConsent?.('essential')}
          style={{ background:'none', border:'none', color:'#D4AF37', fontSize:11, cursor:'pointer', padding:0, textDecoration:'underline' }}>
          Preferências de cookies
        </button>
        <span>·</span>
        <span style={{ color:'#374151' }}>🔒 Site seguro HTTPS</span>
      </div>
    </footer>
  )
}
