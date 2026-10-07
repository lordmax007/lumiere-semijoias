import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { supabase, isConfigured } from '../../lib/supabase'

const nav = [
  { label: 'Pérolla do Tapajós', href: '/perolla', highlight: true },
  { label: 'Todos os Produtos', href: '/perolla' },
  {
    label: 'Categorias', children: [
      { label: 'Brincos', href: '/perolla/brincos' },
      { label: 'Anéis', href: '/perolla/aneis' },
      { label: 'Colares', href: '/perolla/colares' },
      { label: 'Correntes', href: '/perolla/correntes' },
      { label: 'Pulseiras', href: '/perolla/pulseiras' },
      { label: 'Braceletes', href: '/perolla/braceletes' },
      { label: 'Conjuntos', href: '/perolla/conjuntos' },
      { label: 'Choker', href: '/perolla/choker' },
      { label: '─', href: null, divider: true },
      { label: 'Aço Inoxidável', href: '/perolla/aco-inoxidavel' },
      { label: 'Masculina', href: '/perolla/masculina' },
      { label: 'Infantil', href: '/perolla/infantil' },
    ],
  },
]

function IconSearch() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
}
function IconUser() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
}
function IconBag() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
}
function IconMenu() {
  return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
}

export default function Header() {
  const { count, toggleDrawer } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)
  const userRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConfigured) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handler = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserOpen(false)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/busca?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

        {/* Hamburger (mobile) */}
        <button className="lg:hidden p-2 -ml-2" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <IconMenu />
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium flex-1">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1 hover:text-gold transition-colors py-5">
                  {item.label}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute top-full left-0 bg-white border border-gray-100 shadow-lg rounded-card py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {item.children.map((c, i) =>
                    c.divider
                      ? <div key={i} className="border-t border-gray-100 my-1" />
                      : <Link key={c.href} to={c.href} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">{c.label}</Link>
                  )}
                </div>
              </div>
            ) : (
              <Link key={item.href} to={item.href} className={item.highlight ? 'text-gold font-semibold hover:text-gold-dark transition-colors' : 'hover:text-gold transition-colors'}>{item.label}</Link>
            )
          )}
        </nav>

        {/* Logo centrada */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.25em] font-light whitespace-nowrap">
          LUMIÈRE
        </Link>

        {/* Ícones direita */}
        <div className="flex items-center gap-2 ml-auto">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                autoFocus
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="border-b border-gray-400 outline-none text-sm px-2 py-1 w-36"
                maxLength={100}
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-gray-400 text-lg leading-none">✕</button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} aria-label="Buscar" className="p-2 hover:text-gold transition-colors">
              <IconSearch />
            </button>
          )}
          {/* Ícone de usuário */}
          <div ref={userRef} className="relative hidden sm:block">
            {user ? (
              <>
                <button onClick={() => setUserOpen(o => !o)} aria-label="Minha conta"
                  className="p-2 hover:text-gold transition-colors flex items-center gap-1">
                  <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">
                    {(user.user_metadata?.name || user.email)?.[0]?.toUpperCase()}
                  </div>
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-lg rounded-card py-2 w-48 z-50">
                    <div className="px-4 py-2 border-b border-gray-50">
                      <p className="text-xs font-medium truncate">{user.user_metadata?.name || 'Minha conta'}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/meus-pedidos" onClick={() => setUserOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                      Meus pedidos
                    </Link>
                    <Link to="/configuracoes" onClick={() => setUserOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx={12} cy={12} r={3} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>
                      Configurações
                    </Link>
                    <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" onClick={() => setUserOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      Suporte
                    </a>
                    <div className="border-t border-gray-50 mt-1">
                      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sair
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" aria-label="Minha conta" className="p-2 hover:text-gold transition-colors">
                <IconUser />
              </Link>
            )}
          </div>
          <button onClick={toggleDrawer} aria-label={`Carrinho${count ? ` (${count})` : ''}`} className="p-2 hover:text-gold transition-colors relative">
            <IconBag />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-serif text-xl tracking-widest">LUMIÈRE</span>
              <button onClick={() => setMenuOpen(false)} className="text-xl text-gray-400">✕</button>
            </div>
            <nav className="p-4 flex flex-col gap-1 flex-1">
              {nav.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mt-4 mb-1">{item.label}</div>
                    {item.children.map(c => (
                      <Link key={c.href} to={c.href} onClick={() => setMenuOpen(false)} className="block py-2 pl-2 text-sm hover:text-gold transition-colors">{c.label}</Link>
                    ))}
                  </div>
                ) : (
                  <Link key={item.href} to={item.href} onClick={() => setMenuOpen(false)} className="block py-2 text-sm hover:text-gold transition-colors">{item.label}</Link>
                )
              )}
            </nav>
            <div className="p-4 border-t space-y-1">
              <Link to="/login" className="block text-sm py-2 hover:text-gold" onClick={() => setMenuOpen(false)}>Minha Conta</Link>
              <Link to="/cadastro" className="block text-sm py-2 hover:text-gold" onClick={() => setMenuOpen(false)}>Cadastrar</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
