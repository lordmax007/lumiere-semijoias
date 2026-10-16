import { useState } from 'react'
import { contactSchema } from '../lib/validators'
import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:680, margin:'0 auto', padding:'48px 20px' }
const h1 = { fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }

export default function Contato() {
  const [form, setForm] = useState({ nome:'', email:'', assunto:'', mensagem:'', website:'' })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    // honeypot
    if (form.website) return
    const result = contactSchema.safeParse(form)
    if (!result.success) { setErr(result.error.errors[0].message); return }
    setErr('')
    // TODO: integrar Resend
    console.log('Contato recebido:', result.data)
    setSent(true)
  }

  const input = { width:'100%', border:'1px solid #ddd', borderRadius:6, padding:'10px 12px', fontSize:14, outline:'none', boxSizing:'border-box' }

  return (
    <div style={s}>
      <SEOMeta title="Contato" description="Fale com a Pérolla do Tapajós pelo WhatsApp, Instagram ou formulário." />
      <h1 style={h1}>Contato</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <div style={{ display:'flex', flexWrap:'wrap', gap:16, marginBottom:36 }}>
        <a href="https://wa.me/5593992175713" target="_blank" rel="noreferrer"
          style={{ flex:1, minWidth:180, background:'#25D366', color:'#fff', padding:'14px 20px', borderRadius:8, textDecoration:'none', textAlign:'center', fontWeight:600 }}>
          💬 WhatsApp (93) 99217-5713
        </a>
        <a href="https://instagram.com/perolladotapajos" target="_blank" rel="noreferrer"
          style={{ flex:1, minWidth:180, background:'#E1306C', color:'#fff', padding:'14px 20px', borderRadius:8, textDecoration:'none', textAlign:'center', fontWeight:600 }}>
          📸 @perolladotapajos
        </a>
      </div>

      <div style={{ fontSize:14, color:'#555', marginBottom:32, lineHeight:2 }}>
        <p><strong>E-mail:</strong> [PREENCHER]</p>
        <p><strong>Endereço:</strong> [PREENCHER]</p>
        <p><strong>Horário de atendimento:</strong> [PREENCHER]</p>
      </div>

      {sent ? (
        <div style={{ background:'#f0fdf4', border:'1px solid #86efac', borderRadius:8, padding:20, color:'#166534' }}>
          ✅ Mensagem recebida! Entraremos em contato em breve.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <h2 style={{ fontFamily:'serif', fontWeight:400, fontSize:20, color:'#333', marginBottom:4 }}>Enviar mensagem</h2>
          {/* honeypot */}
          <input name="website" value={form.website} onChange={set('website')} style={{ display:'none' }} tabIndex={-1} autoComplete="off" />
          <div>
            <label style={{ fontSize:12, color:'#666', display:'block', marginBottom:4 }}>Nome *</label>
            <input value={form.nome} onChange={set('nome')} maxLength={100} required style={input} />
          </div>
          <div>
            <label style={{ fontSize:12, color:'#666', display:'block', marginBottom:4 }}>E-mail *</label>
            <input type="email" value={form.email} onChange={set('email')} maxLength={254} required style={input} />
          </div>
          <div>
            <label style={{ fontSize:12, color:'#666', display:'block', marginBottom:4 }}>Assunto</label>
            <input value={form.assunto} onChange={set('assunto')} maxLength={200} style={input} />
          </div>
          <div>
            <label style={{ fontSize:12, color:'#666', display:'block', marginBottom:4 }}>Mensagem *</label>
            <textarea value={form.mensagem} onChange={set('mensagem')} maxLength={1000} required rows={5} style={{ ...input, resize:'vertical' }} />
          </div>
          {err && <p style={{ color:'#dc2626', fontSize:13 }}>{err}</p>}
          <button type="submit" style={{ background:'#D4AF37', color:'#010c10', padding:'12px 24px', borderRadius:8, fontWeight:600, border:'none', cursor:'pointer', fontSize:14 }}>
            Enviar mensagem
          </button>
        </form>
      )}
    </div>
  )
}
