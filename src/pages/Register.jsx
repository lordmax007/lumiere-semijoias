import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, isConfigured } from '../lib/supabase'

export default function Register() {
  const [step, setStep] = useState('form') // 'form' | 'otp'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.email.trim() || !form.password) { setError('Preencha todos os campos'); return }
    if (form.password.length < 8) { setError('Senha deve ter pelo menos 8 caracteres'); return }
    if (!isConfigured) { setError('Supabase não configurado.'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: { data: { name: form.name.trim() } },
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    setStep('otp')
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) { setError('Digite o código de 6 dígitos'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.verifyOtp({
      email: form.email.trim(),
      token: otp,
      type: 'signup',
    })
    setLoading(false)
    if (err) { setError('Código inválido ou expirado'); return }
    navigate('/')
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl font-light text-center tracking-wide mb-8">
          {step === 'form' ? 'Criar conta' : 'Verificar e-mail'}
        </h1>

        {step === 'form' ? (
          <form onSubmit={handleRegister} noValidate className="space-y-4">
            {[
              { k: 'name', label: 'Nome completo', type: 'text', auto: 'name' },
              { k: 'email', label: 'E-mail', type: 'email', auto: 'email' },
              { k: 'password', label: 'Senha (mín. 8 caracteres)', type: 'password', auto: 'new-password' },
            ].map(({ k, label, type, auto }) => (
              <div key={k}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input type={type} value={form[k]} onChange={set(k)} maxLength={k === 'password' ? 128 : 254}
                  autoComplete={auto}
                  className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
              </div>
            ))}
            {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} noValidate className="space-y-4">
            <p className="text-sm text-gray-400 text-center -mt-4 mb-2">
              Código enviado para <strong>{form.email}</strong>
            </p>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Código de 6 dígitos</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6} autoFocus inputMode="numeric" autoComplete="one-time-code"
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors text-center tracking-[0.5em] text-lg font-medium"
                placeholder="000000" />
            </div>
            {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
              {loading ? 'Verificando...' : 'Confirmar'}
            </button>
            <button type="button" onClick={() => { setStep('form'); setOtp(''); setError('') }}
              className="w-full text-sm text-gray-400 hover:text-gray-700 transition-colors">
              ← Voltar
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta? <Link to="/login" className="underline hover:text-gray-800">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
