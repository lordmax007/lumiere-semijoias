import { useState, useEffect, createContext, useContext } from 'react'
import { Link } from 'react-router-dom'

const CookieCtx = createContext(null)

export function useCookieConsent() {
  return useContext(CookieCtx)
}

export default function CookieConsent({ children }) {
  const [consent, setConsentState] = useState(() => localStorage.getItem('cookie_consent'))
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!consent) setShow(true)
  }, [consent])

  function setConsent(val) {
    localStorage.setItem('cookie_consent', val)
    setConsentState(val)
    setShow(false)
  }

  return (
    <CookieCtx.Provider value={{ consent, setConsent }}>
      {children}
      {show && (
        <div role="dialog" aria-label="Preferências de cookies"
          style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:9999, background:'#010c10', borderTop:'1px solid #D4AF37', padding:'16px 20px' }}>
          <div style={{ maxWidth:960, margin:'0 auto', display:'flex', flexWrap:'wrap', alignItems:'center', gap:12 }}>
            <p style={{ flex:1, minWidth:220, color:'#ccc', fontSize:13, margin:0 }}>
              Usamos cookies essenciais para o funcionamento do site e, com seu consentimento, cookies de desempenho e marketing.{' '}
              <Link to="/cookies" style={{ color:'#D4AF37' }}>Política de Cookies</Link>
            </p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              <button onClick={() => setConsent('essential')}
                style={{ background:'transparent', border:'1px solid #555', color:'#ccc', padding:'6px 14px', borderRadius:6, fontSize:12, cursor:'pointer' }}>
                Recusar não essenciais
              </button>
              <button onClick={() => setConsent('essential')}
                style={{ background:'transparent', border:'1px solid #D4AF37', color:'#D4AF37', padding:'6px 14px', borderRadius:6, fontSize:12, cursor:'pointer' }}>
                Personalizar
              </button>
              <button onClick={() => setConsent('all')}
                style={{ background:'#D4AF37', border:'none', color:'#010c10', padding:'6px 16px', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer' }}>
                Aceitar tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieCtx.Provider>
  )
}
