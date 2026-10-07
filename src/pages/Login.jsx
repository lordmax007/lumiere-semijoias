import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email.trim() || !form.password) { setError('Preencha todos os campos'); return }
    if (!isConfigured) { setError('Supabase não configurado.'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password })
    setLoading(false)
    if (err) { setError('E-mail ou senha incorretos'); return }
    navigate('/')
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
          <button type="submit" disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta? <Link to="/cadastro" className="underline hover:text-gray-800">Cadastrar</Link>
        </p>
      </div>
    </div>
  )
}
