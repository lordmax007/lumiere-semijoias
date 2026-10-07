import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { products, collections } from '../data/mockData'

export default function Collection() {
  const { slug } = useParams()
  const col = collections.find(c => c.slug === slug)
  const colProducts = col ? products.filter(p => p.collection_id === col.id && p.active) : []

  if (!col) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">Coleção não encontrada.</p>
      <Link to="/produtos" className="text-sm underline">Ver todos os produtos</Link>
    </div>
  )

  return (
    <div>
      {/* Banner da coleção */}
      <div className="relative h-52 md:h-72 overflow-hidden">
        <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-widest">{col.name}</h1>
          <p className="mt-2 text-sm opacity-80">{col.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-sm text-gray-400 mb-6">{colProducts.length} produtos</p>
        {colProducts.length === 0 ? (
          <p className="text-center text-gray-400 py-10">Nenhum produto nesta coleção ainda.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {colProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
