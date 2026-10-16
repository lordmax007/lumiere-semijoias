import { useState, useEffect } from 'react'
import { supabase, isConfigured } from '../../lib/supabase'
import { perollaCollections, perollaExtraCollections, perollaProducts, catSlug } from '../../data/perollaData'

export default function AdminColecoes() {
  const [supabaseProds, setSupabaseProds] = useState([])

  useEffect(() => {
    if (!isConfigured) return
    supabase.from('perolla_products').select('categoria').then(({ data }) => {
      if (data) setSupabaseProds(data)
    })
  }, [])

  const allProducts = [...perollaProducts, ...supabaseProds]
  const catCounts = allProducts.reduce((acc, p) => {
    if (p.categoria) acc[p.categoria] = (acc[p.categoria] || 0) + 1
    return acc
  }, {})

  const knownCats = [...perollaCollections, ...perollaExtraCollections]
  const knownNames = new Set(knownCats.map(c => c.name))
  const customCats = Object.keys(catCounts)
    .filter(name => !knownNames.has(name))
    .map(name => ({ name, slug: catSlug(name), image: null }))

  const allCats = [...knownCats, ...customCats]

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-2">Categorias</h1>
      <p className="text-xs text-gray-400 mb-6">Para criar uma nova categoria, adicione um produto e digite o nome dela no campo "Categoria".</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCats.map(cat => {
          const count = catCounts[cat.name] || 0
          return (
            <div key={cat.slug} className="bg-white rounded-card shadow-sm p-4 flex items-center gap-4">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 flex-shrink-0" />
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
