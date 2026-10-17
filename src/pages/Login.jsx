import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase'
import { loginSchema } from '../lib/validators'

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 30_000

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [locked, setLocked] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const attempts = useRef(0)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const startLockout = () => {
    setLocked(true)
    setCountdown(LOCKOUT_MS / 1000)
    const interval = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(interval); setLocked(false); attempts.current = 0; return 0 }
        return c - 1
      })
    }, 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (locked) return
    setError('')
    const v = loginSchema.safeParse({ email: form.email.trim(), password: form.password })
    if (!v.success) { setError(v.error.errors[0].message); return }
    if (!isConfigured) { setError('Serviço indisponível.'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password })
    setLoading(false)
    if (err) {
      attempts.current += 1
      if (attempts.current >= MAX_ATTEMPTS) {
        startLockout()
        setError('Muitas tentativas. Aguarde 30 segundos.')
      } else {
        setError('E-mail ou senha incorretos')
      }
      return
    }
    window.location.href = '/'
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-light text-center tracking-wide mb-8">Entrar</h1>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">E-mail</label>
            <input type="email" value={form.email} onChange={set('email')} maxLength={254} autoComplete="email"
              className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Senha</label>
            <input type="password" value={form.password} onChange={set('password')} maxLength={128} autoComplete="current-password"
              className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
          </div>
          {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
          <button type="submit" disabled={loading || locked}
            className="w-full bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
            {locked ? `Aguarde ${countdown}s` : loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/esqueci-senha" className="underline hover:text-gray-800">Esqueci minha senha</Link>
        </p>
        <p className="text-center text-sm text-gray-500 mt-2">
          Não tem conta? <Link to="/cadastro" className="underline hover:text-gray-800">Cadastrar</Link>
        </p>
      </div>
    </div>
  )
}
