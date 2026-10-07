import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase'

export default function Configuracoes() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [tab, setTab] = useState('perfil')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConfigured) return
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { navigate('/login'); return }
      setUser(data.user)
      setForm({ name: data.user.user_metadata?.name || '', email: data.user.email || '' })
    })
  }, [navigate])

  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type: '', text: '' }), 3000) }

  const savePerfil = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { flash('error', 'Nome não pode ser vazio'); return }
    setSaving(true)
    const { error } = await supabase.auth.updateUser({ data: { name: form.name.trim() } })
    if (!error) await supabase.from('profiles').update({ name: form.name.trim() }).eq('id', user.id)
    setSaving(false)
    error ? flash('error', 'Erro ao salvar') : flash('success', 'Nome atualizado!')
  }

  const savePassword = async (e) => {
    e.preventDefault()
    if (!passwords.current) { flash('error', 'Digite sua senha atual'); return }
    if (passwords.next.length < 8) { flash('error', 'Nova senha deve ter pelo menos 8 caracteres'); return }
    if (passwords.next !== passwords.confirm) { flash('error', 'Senhas não coincidem'); return }
    setSaving(true)
    // Verifica senha atual re-autenticando
    const { error: authErr } = await supabase.auth.signInWithPassword({ email: user.email, password: passwords.current })
    if (authErr) { setSaving(false); flash('error', 'Senha atual incorreta'); return }
    const { error } = await supabase.auth.updateUser({ password: passwords.next })
    setSaving(false)
    if (error) { flash('error', 'Erro ao atualizar senha'); return }
    flash('success', 'Senha atualizada!')
    setPasswords({ current: '', next: '', confirm: '' })
  }

  const sendOtp = async () => {
    setSaving(true)
    const { error } = await supabase.auth.signInWithOtp({ email: user.email, options: { shouldCreateUser: false } })
    setSaving(false)
    error ? flash('error', error.message) : flash('success', `Código enviado para ${user.email}`)
  }

  const tabs = [
    { key: 'perfil', label: 'Perfil' },
    { key: 'senha', label: 'Senha' },
    { key: 'seguranca', label: 'Segurança' },
  ]

  if (!user) return null

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl font-light mb-8">Configurações</h1>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 mb-8">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t.key ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Flash */}
      {msg.text && (
        <div className={`mb-6 p-3 rounded-btn text-sm ${msg.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>
          {msg.text}
        </div>
      )}

      {/* Perfil */}
      {tab === 'perfil' && (
        <form onSubmit={savePerfil} className="space-y-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gray-900 text-white text-xl flex items-center justify-center font-medium">
              {form.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{form.name || '—'}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Nome completo</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              maxLength={200}
              className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">E-mail</label>
            <input type="email" value={form.email} disabled
              className="w-full border border-gray-200 rounded-btn px-3 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
            <p className="text-[10px] text-gray-400 mt-1">Para alterar o e-mail entre em contato com o suporte.</p>
          </div>
          <button type="submit" disabled={saving}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
            {saving ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      )}

      {/* Senha */}
      {tab === 'senha' && (
        <form onSubmit={savePassword} className="space-y-5 max-w-sm">
          {[
            { k: 'current', label: 'Senha atual', auto: 'current-password' },
            { k: 'next', label: 'Nova senha', auto: 'new-password' },
            { k: 'confirm', label: 'Confirmar nova senha', auto: 'new-password' },
          ].map(({ k, label, auto }) => (
            <div key={k}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input type="password" value={passwords[k]}
                onChange={e => setPasswords(p => ({ ...p, [k]: e.target.value }))}
                maxLength={128} autoComplete={auto}
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
            </div>
          ))}
          <p className="text-xs text-gray-400">Mínimo 8 caracteres.</p>
          <button type="submit" disabled={saving}
            className="bg-gray-900 text-white px-6 py-2.5 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
            {saving ? 'Atualizando...' : 'Atualizar senha'}
          </button>
        </form>
      )}

      {/* Segurança */}
      {tab === 'seguranca' && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-card p-5">
            <h3 className="font-medium text-sm mb-1">Código OTP</h3>
            <p className="text-xs text-gray-400 mb-4">Receba um código de verificação no seu e-mail para confirmar sua identidade.</p>
            <button onClick={sendOtp} disabled={saving}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
              {saving ? 'Enviando...' : 'Enviar código OTP'}
            </button>
          </div>

          <div className="bg-gray-50 rounded-card p-5">
            <h3 className="font-medium text-sm mb-1">Sessões ativas</h3>
            <p className="text-xs text-gray-400 mb-4">Encerre todas as sessões abertas em outros dispositivos.</p>
            <button onClick={async () => { await supabase.auth.signOut({ scope: 'others' }); flash('success', 'Outras sessões encerradas') }}
              className="border border-gray-300 px-6 py-2.5 rounded-btn text-sm font-medium hover:border-gray-600 transition-colors">
              Sair de outros dispositivos
            </button>
          </div>

          <div className="bg-red-50 rounded-card p-5 border border-red-100">
            <h3 className="font-medium text-sm text-red-700 mb-1">Excluir conta</h3>
            <p className="text-xs text-red-400 mb-4">Esta ação é irreversível. Todos os seus dados serão removidos.</p>
            <a href="mailto:contato@lumiere.com.br?subject=Excluir minha conta"
              className="text-sm text-red-500 hover:underline">
              Solicitar exclusão por e-mail →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
