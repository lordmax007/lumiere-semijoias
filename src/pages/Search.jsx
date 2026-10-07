import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'
import ProductCard from '../components/product/ProductCard'
import { products } from '../data/mockData'

export default function Search() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  const results = useMemo(() => {
    if (!q.trim()) return []
    const term = q.toLowerCase()
    return products.filter(p => p.active && (
      p.name.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
    ))
  }, [q])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl font-light mb-2">Busca</h1>
      {q && <p className="text-sm text-gray-400 mb-8">{results.length} resultado(s) para "<strong>{q}</strong>"</p>}
      {!q && <p className="text-gray-400 py-10 text-center">Digite algo para buscar.</p>}
      {q && results.length === 0 && <p className="text-gray-400 py-10 text-center">Nenhum produto encontrado para "{q}".</p>}
      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
