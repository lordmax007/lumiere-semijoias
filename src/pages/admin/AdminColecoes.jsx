import { perollaCollections, perollaExtraCollections, perollaProducts, catSlug } from '../../data/perollaData'

export default function AdminColecoes() {
  const allCats = [...perollaCollections, ...perollaExtraCollections]

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-6">Categorias</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCats.map(cat => {
          const count = perollaProducts.filter(p => {
            const slug = catSlug(p.categoria)
            return slug === cat.slug || p.categoria === cat.name
          }).length

          return (
            <div key={cat.slug} className="bg-white rounded-card shadow-sm p-4 flex items-center gap-4">
              {cat.image ? (
                <img src={cat.image} alt={cat.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-yellow-100 border-2 border-yellow-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 font-bold text-lg">{cat.name[0]}</span>
                </div>
              )}
              <div>
                <p className="font-medium text-sm">{cat.name}</p>
                <p className="text-xs text-gray-400">{count} produto{count !== 1 ? 's' : ''}</p>
                <p className="text-xs text-gray-300">/{cat.slug}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
