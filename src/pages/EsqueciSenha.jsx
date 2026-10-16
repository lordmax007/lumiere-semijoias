import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase'

export default function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) { setError('Informe seu e-mail'); return }
    if (!isConfigured) { setError('Supabase não configurado.'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/redefinir-senha`,
    })
    setLoading(false)
    if (err) { setError('Não foi possível enviar o e-mail. Tente novamente.'); return }
    setSent(true)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-light text-center tracking-wide mb-2">Esqueci minha senha</h1>
        {sent ? (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-4">
              Enviamos um link para <strong>{email}</strong>.<br />
              Verifique sua caixa de entrada (e o spam).
            </p>
            <Link to="/login" className="text-sm underline hover:text-gray-800">Voltar para o login</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 text-center mb-6">
              Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">E-mail</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  maxLength={254} autoComplete="email"
                  className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors"
                />
              </div>
              {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
                {loading ? 'Enviando...' : 'Enviar link'}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-4">
              <Link to="/login" className="underline hover:text-gray-800">Voltar para o login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
