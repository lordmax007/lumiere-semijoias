import { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase, isConfigured } from '../../lib/supabase'

const links = [
  { href: '/gp-8f3a2k7m', label: '📊 Dashboard', exact: true },
  { href: '/gp-8f3a2k7m/perolla', label: '💍 Produtos' },
  { href: '/gp-8f3a2k7m/colecoes', label: '📁 Categorias' },
  { href: '/gp-8f3a2k7m/pedidos', label: '📦 Pedidos' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [ready, setReady] = useState(!isConfigured)

  useEffect(() => {
    if (!isConfigured) return
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || (!session && event !== 'INITIAL_SESSION')) {
        navigate('/login'); return
      }
      if (session) {
        if (session.user.app_metadata?.role !== 'admin') { navigate('/'); return }
        setReady(true)
      }
    })
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/login'); return }
      if (session.user.app_metadata?.role !== 'admin') { navigate('/'); return }
      setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (!ready) return (
    <div className="flex items-center justify-center h-screen text-sm text-gray-400">Verificando acesso…</div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-gray-900 text-gray-300 flex flex-col py-6 flex-shrink-0">
        <div className="px-6 mb-8 font-serif text-white text-lg tracking-widest">PÉROLA DO TAPAJÓS</div>
        <p className="px-6 text-[10px] uppercase tracking-widest text-gray-500 mb-2">Admin</p>
        <nav className="flex-1">
          {links.map(({ href, label, exact }) => {
            const active = exact ? location.pathname === href : location.pathname.startsWith(href) && href !== '/gp-8f3a2k7m'
            return (
              <Link key={href} to={href} className={`block px-6 py-2.5 text-sm transition-colors ${active ? 'bg-gray-800 text-white' : 'hover:text-white'}`}>
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="px-6 space-y-2">
          <Link to="/" className="text-xs text-gray-500 hover:text-white block transition-colors">← Ver loja</Link>
          <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-white transition-colors">Sair</button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {!isConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs p-3 rounded-btn mb-6">
            Modo demonstração — configure o Supabase no .env para persistir dados.
          </div>
        )}
        <Outlet />
      </main>
    </div>
  )
}
