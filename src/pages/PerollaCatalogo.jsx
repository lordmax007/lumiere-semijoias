import { Link } from 'react-router-dom'
import { perollaCollections, perollaExtraCollections, catSlug } from '../data/perollaData'
import { usePerollaProducts } from '../hooks/usePerollaProducts'
import { useFadeIn } from '../hooks/useFadeIn'
import PerolaCarousel from '../components/perolla/PerolaCarousel'
import RiverHero from '../components/perolla/RiverHero'
import PerolaCard from '../components/perolla/PerolaCard'

export default function PerollaCatalogo() {
  const [ref, visible] = useFadeIn()
  const { products: perollaProducts } = usePerollaProducts()
  const featured = [...perollaProducts].sort((a, b) => b.disponivel - a.disponivel).slice(0, 8)

  return (
    <div>
      {/* Hero animado */}
      <RiverHero>
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">Catálogo</p>
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
          <a href="https://wa.me/5593992175713" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.547a.5.5 0 00.608.61l5.788-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.183-1.381l-.371-.216-3.842.955.988-3.746-.237-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            (93) 99217-5713
          </a>
          <a href="https://instagram.com/perolladotapajos" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">@perolladotapajos</a>
        </div>
      </RiverHero>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Faixa de categorias com círculos */}
        <h2 className="font-serif text-2xl font-light mb-4">Comprar por categoria</h2>
        <div className="mb-10 -mx-4">
          <PerolaCarousel />
        </div>

        {/* Destaques */}
        <div ref={ref} className={visible ? 'fade-in' : 'opacity-0'}>
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-serif text-2xl font-light">Destaques</h2>
            <span className="text-xs text-gray-400">{perollaProducts.length} produtos no total</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map(p => <PerolaCard key={p.id} p={p} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/perolla/brincos" className="inline-block border border-gray-900 px-8 py-3 rounded-btn text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
              Ver todos os produtos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
