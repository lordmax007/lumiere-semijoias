import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { perollaProducts, perollaCollections, perollaExtraCollections, catSlug } from '../../data/perollaData'
import { supabase, isConfigured } from '../../lib/supabase'

export default function Dashboard() {
  const [newProducts, setNewProducts] = useState([])
  const allCats = [...perollaCollections, ...perollaExtraCollections]
  const active  = perollaProducts.filter(p => p.disponivel).length
  const soldOut = perollaProducts.filter(p => !p.disponivel).length

  useEffect(() => {
    if (!isConfigured) return
    supabase.from('perolla_products').select('*').order('created_at', { ascending: false }).limit(5)
      .then(({ data }) => { if (data) setNewProducts(data) })
  }, [])

  const stats = [
    { label: 'Produtos disponíveis', value: active,                  color: 'text-green-600' },
    { label: 'Esgotados',            value: soldOut,                 color: 'text-red-500'   },
    { label: 'Total de produtos',    value: perollaProducts.length,  color: 'text-gray-800'  },
    { label: 'Categorias',           value: allCats.length,          color: 'text-gray-800'  },
  ]

  const actions = [
    { label: '+ Adicionar produto',   to: '/gp-8f3a2k7m/perolla',  bg: 'bg-gray-900 text-white hover:bg-gray-700' },
    { label: '🛍️ Ver a loja',         to: '/',                     bg: 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400' },
    { label: '📱 WhatsApp da loja',   href: 'https://wa.me/5593992175713', bg: 'bg-green-600 text-white hover:bg-green-700' },
    { label: '📸 Instagram',          href: 'https://instagram.com/perolladotapajos', bg: 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400' },
  ]

  // Top 5 categorias por quantidade de produto
  const topCats = allCats.map(cat => ({
    ...cat,
    count: perollaProducts.filter(p => catSlug(p.categoria) === cat.slug || p.categoria === cat.name).length
  })).sort((a, b) => b.count - a.count).slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-light mb-1">Olá! 👋</h1>
        <p className="text-sm text-gray-400">Bem-vinda ao painel da Pérola do Tapajós.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-card p-5 shadow-sm">
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Ações rápidas */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Ações rápidas</h2>
        <div className="flex flex-wrap gap-3">
          {actions.map(a => a.href ? (
            <a key={a.label} href={a.href} target="_blank" rel="noreferrer"
              className={`px-5 py-2.5 rounded-btn text-sm font-medium transition-colors ${a.bg}`}>
              {a.label}
            </a>
          ) : (
            <Link key={a.label} to={a.to}
              className={`px-5 py-2.5 rounded-btn text-sm font-medium transition-colors ${a.bg}`}>
              {a.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Últimos produtos adicionados */}
        <div className="bg-white rounded-card shadow-sm p-5">
          <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-4">Últimos produtos adicionados</h2>
          {newProducts.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-sm">
              <p>Nenhum produto novo ainda.</p>
              <Link to="/gp-8f3a2k7m/perolla" className="text-gray-600 underline text-xs mt-1 inline-block">Adicionar primeiro produto</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {newProducts.map(p => (
                <div key={p.id} className="flex items-center gap-3">
                  {p.imagens?.[0] ? (
                    <img src={p.imagens[0]} alt={p.nome} className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-300 text-xs">💍</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.nome}</p>
                    <p className="text-xs text-gray-400">{p.categoria}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                    R$ {Number(p.preco).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top categorias */}
        <div className="bg-white rounded-card shadow-sm p-5">
          <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wider mb-4">Categorias com mais produtos</h2>
          <div className="space-y-3">
            {topCats.map(cat => (
              <div key={cat.slug} className="flex items-center gap-3">
                {cat.image ? (
                  <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-full object-cover border border-yellow-300 flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-yellow-100 border border-yellow-300 flex items-center justify-center text-yellow-600 font-bold flex-shrink-0">
                    {cat.name[0]}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{cat.name}</span>
                    <span className="text-gray-400 text-xs">{cat.count} produtos</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${Math.min((cat.count / perollaProducts.length) * 100 * 3, 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
