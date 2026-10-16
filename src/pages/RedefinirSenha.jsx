import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase'

export default function RedefinirSenha() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Supabase troca o hash da URL por uma sessão válida automaticamente
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6) { setError('A senha precisa ter pelo menos 6 caracteres'); return }
    if (password !== confirm) { setError('As senhas não coincidem'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (err) { setError('Não foi possível redefinir. O link pode ter expirado.'); return }
    setDone(true)
    setTimeout(() => navigate('/login'), 3000)
  }

  if (!isConfigured) return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <p className="text-sm text-gray-500">Supabase não configurado.</p>
    </div>
  )

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-light text-center tracking-wide mb-6">Nova senha</h1>

        {done ? (
          <div className="text-center">
            <p className="text-sm text-green-700 bg-green-50 p-3 rounded mb-4">Senha redefinida com sucesso! Redirecionando...</p>
            <Link to="/login" className="text-sm underline hover:text-gray-800">Ir para o login</Link>
          </div>
        ) : !ready ? (
          <p className="text-sm text-gray-500 text-center">Validando link... Se demorar, volte ao e-mail e clique novamente.</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Nova senha</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                minLength={6} maxLength={128} autoComplete="new-password"
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Confirmar nova senha</label>
              <input
                type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                minLength={6} maxLength={128} autoComplete="new-password"
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors"
              />
            </div>
            {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
              {loading ? 'Salvando...' : 'Salvar nova senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
