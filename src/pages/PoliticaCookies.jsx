import { Link } from 'react-router-dom'
import { useCookieConsent } from '../components/CookieConsent'
import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#333', lineHeight:1.8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:19, color:'#b8922a', margin:'32px 0 8px' }

export default function PoliticaCookies() {
  const { setConsent } = useCookieConsent() || {}
  return (
    <div style={s}>
      <SEOMeta title="Política de Cookies" />
      <h1 style={{ fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }}>Política de Cookies</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <p>Usamos cookies para garantir o funcionamento do site e melhorar sua experiência. Veja abaixo o que cada tipo faz.</p>

      <h2 style={h2}>Cookies essenciais — sempre ativos</h2>
      <p>Necessários para o site funcionar: autenticação, sessão do usuário e preferências de cookies. Não podem ser desativados sem prejudicar o uso do site.</p>
      <p>Duração: sessão ou até 1 ano.</p>

      <h2 style={h2}>Cookies de desempenho (analytics) — opt-in</h2>
      <p>Coletam dados anônimos de navegação (páginas visitadas, tempo na página) para nos ajudar a melhorar o site. Só carregam com seu consentimento.</p>
      <p>Duração: até 2 anos.</p>

      <h2 style={h2}>Cookies de marketing — opt-in</h2>
      <p>Permitem exibir anúncios relevantes em outras plataformas. Só carregam com seu consentimento expresso.</p>
      <p>Duração: até 2 anos.</p>

      <h2 style={h2}>Como desativar</h2>
      <p>Você pode gerenciar cookies nas configurações do seu navegador (Chrome → Configurações → Privacidade → Cookies). Ao recusar cookies não essenciais, o site continua funcional.</p>

      <div style={{ margin:'32px 0' }}>
        <button onClick={() => setConsent?.('essential')}
          style={{ background:'transparent', border:'1px solid #D4AF37', color:'#D4AF37', padding:'10px 20px', borderRadius:8, cursor:'pointer', fontSize:13, marginRight:12 }}>
          Abrir preferências de cookies
        </button>
      </div>

      <p style={{ fontSize:13, color:'#888' }}>Dúvidas? Veja nossa <Link to="/privacidade" style={{ color:'#D4AF37' }}>Política de Privacidade</Link> ou fale conosco pelo <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>WhatsApp</a>.</p>

      <p style={{ marginTop:32, padding:16, background:'#fff3cd', borderRadius:8, fontSize:13, color:'#856404' }}>
        ⚠️ Modelo — revise com advogado antes de publicar.
      </p>
    </div>
  )
}
