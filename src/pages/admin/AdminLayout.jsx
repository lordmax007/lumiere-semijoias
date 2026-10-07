import { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase, isConfigured } from '../../lib/supabase'

const links = [
  { href: '/admin', label: '📊 Dashboard', exact: true },
  { href: '/admin/produtos', label: '💍 Produtos' },
  { href: '/admin/colecoes', label: '📁 Coleções' },
  { href: '/admin/pedidos', label: '📦 Pedidos' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [ready, setReady] = useState(!isConfigured)

  useEffect(() => {
    if (!isConfigured) return
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/login'); return }
      const role = session.user.app_metadata?.role
      if (role !== 'admin') { navigate('/'); return }
      setReady(true)
    }
    check()
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
        <div className="px-6 mb-8 font-serif text-white text-lg tracking-widest">LUMIÈRE</div>
        <p className="px-6 text-[10px] uppercase tracking-widest text-gray-500 mb-2">Admin</p>
        <nav className="flex-1">
          {links.map(({ href, label, exact }) => {
            const active = exact ? location.pathname === href : location.pathname.startsWith(href) && href !== '/admin'
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
