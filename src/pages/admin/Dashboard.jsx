import { products, collections, formatPrice } from '../../data/mockData'

export default function Dashboard() {
  const active = products.filter(p => p.active).length
  const soldOut = products.filter(p => p.stock === 0).length
  const promos = products.filter(p => p.original_price).length

  const stats = [
    { label: 'Produtos ativos', value: active },
    { label: 'Esgotados', value: soldOut },
    { label: 'Em promoção', value: promos },
    { label: 'Coleções', value: collections.length },
  ]

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-card p-5 shadow-sm">
            <p className="text-2xl font-semibold">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-card p-6 shadow-sm">
        <h2 className="font-serif text-xl font-light mb-4">Produtos recentes</h2>
        <div className="space-y-3">
          {products.slice(0, 5).map(p => (
            <div key={p.id} className="flex items-center gap-3 text-sm">
              <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-gray-100" />
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-gray-400">Estoque: {p.stock}</p>
              </div>
              <span className="font-semibold">{formatPrice(p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
