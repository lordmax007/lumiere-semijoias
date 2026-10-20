import { useParams, Link } from 'react-router-dom'
import { getCatName, perollaCollections, perollaExtraCollections, getProductsBySlug } from '../data/perollaData'
import { usePerollaProducts } from '../hooks/usePerollaProducts'
import PerolaCarousel from '../components/perolla/PerolaCarousel'
import PerolaCard from '../components/perolla/PerolaCard'

export default function PerolaCategoria() {
  const { categoria } = useParams()
  const { products: allProducts } = usePerollaProducts()
  const allCols = [...perollaCollections, ...perollaExtraCollections]
  const col = allCols.find(c => c.slug === categoria)
  const catName = col ? col.name : getCatName(categoria)
  // getProductsBySlug suporta categorias extras (aco-inoxidavel, masculina, infantil) via campo booleano
  const products = getProductsBySlug(categoria, allProducts)
    .sort((a, b) => b.disponivel - a.disponivel)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link to="/perolla" className="hover:text-gray-700">Pérolla do Tapajós</Link> /
        <span className="text-gray-600">{catName}</span>
      </nav>

      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-light">{catName}</h1>
          <p className="text-sm text-gray-400 mt-1">
            {products.length === 0 ? 'Em breve novidades' : `${products.length} produtos`}
          </p>
        </div>
        <a href="https://wa.me/5593992175713" target="_blank" rel="noreferrer"
          className="hidden sm:flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-btn text-xs font-medium hover:bg-green-700 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.547a.5.5 0 00.608.61l5.788-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.183-1.381l-.371-.216-3.842.955.988-3.746-.237-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          Falar com a loja
        </a>
      </div>

      {/* Nav categorias — círculos com foto */}
      <div className="-mx-4 mb-8">
        <PerolaCarousel activeSlug={categoria} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(p => <PerolaCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}
