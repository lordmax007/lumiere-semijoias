import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { products, collections } from '../data/mockData'

const SORT_OPTIONS = [
  { value: 'novo', label: 'Mais recentes' },
  { value: 'menor', label: 'Menor preço' },
  { value: 'maior', label: 'Maior preço' },
  { value: 'promo', label: 'Em promoção' },
]

export default function Products() {
  const [params, setParams] = useSearchParams()
  const [colFilter, setColFilter] = useState(params.get('colecao') || '')
  const sort = params.get('ordem') || 'novo'
  const promoOnly = params.get('filtro') === 'promo'

  const sorted = useMemo(() => {
    let list = [...products].filter(p => p.active)
    if (colFilter) list = list.filter(p => {
      const col = collections.find(c => c.id === p.collection_id)
      return col?.slug === colFilter
    })
    if (promoOnly) list = list.filter(p => p.original_price && p.original_price > p.price)
    if (sort === 'menor') list.sort((a, b) => a.price - b.price)
    else if (sort === 'maior') list.sort((a, b) => b.price - a.price)
    else if (sort === 'promo') list = list.filter(p => p.original_price)
    return list
  }, [colFilter, sort, promoOnly])

  const setSort = (v) => { const p = new URLSearchParams(params); p.set('ordem', v); setParams(p) }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-serif text-4xl font-light tracking-wide mb-8">Todos os Produtos</h1>

      <div className="flex flex-wrap gap-3 mb-8 items-center">
        {/* Filtro coleção */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setColFilter('')}
            className={`px-4 py-1.5 rounded-btn text-xs font-medium border transition-colors ${!colFilter ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:border-gray-600'}`}
          >
            Todas
          </button>
          {collections.map(c => (
            <button
              key={c.id}
              onClick={() => setColFilter(c.slug)}
              className={`px-4 py-1.5 rounded-btn text-xs font-medium border transition-colors ${colFilter === c.slug ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:border-gray-600'}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Ordenação */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="ml-auto border border-gray-300 rounded-btn text-xs px-3 py-1.5 outline-none hover:border-gray-600 transition-colors"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-gray-400 py-20">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sorted.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
