import { Link } from 'react-router-dom'
import { perollaCollections, perollaExtraCollections, perollaProducts, catSlug } from '../data/perollaData'
import { formatPrice } from '../data/mockData'
import { useFadeIn } from '../hooks/useFadeIn'

function PerolaCard({ p }) {
  const img = p.imagens?.[0]
  const waText = encodeURIComponent(`Olá! Tenho interesse no produto: ${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')})`)
  const waUrl = `https://wa.me/5593992175713?text=${waText}`

  return (
    <div className="group flex flex-col rounded-card overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {!p.disponivel && (
        <span className="absolute top-3 left-3 z-10 bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide">ESGOTADO</span>
      )}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {img ? (
          <img src={img} alt={p.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" /></svg>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-sm font-medium line-clamp-2 leading-snug">{p.nome}</p>
        <p className="text-base font-semibold text-gray-900 mt-1">{formatPrice(Math.round(p.preco * 100))}</p>
        <div className="mt-3">
          {p.disponivel ? (
            <a href={waUrl} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-btn bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.547a.5.5 0 00.608.61l5.788-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.183-1.381l-.371-.216-3.842.955.988-3.746-.237-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Comprar via WhatsApp
            </a>
          ) : (
            <button disabled className="w-full py-2 rounded-btn bg-gray-100 text-gray-400 text-xs font-medium cursor-not-allowed">Esgotado</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PerollaCatalogo() {
  const [ref, visible] = useFadeIn()
  const featured = perollaProducts.filter(p => p.disponivel).slice(0, 8)

  return (
    <div>
      {/* Hero */}
      <div className="bg-gray-900 text-white py-16 px-4 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">Catálogo</p>
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-widest mb-4">Pérolla do Tapajós</h1>
        <p className="text-gray-300 text-sm max-w-md mx-auto">Beleza, elegância e sofisticação em cada detalhe. Semijoias exclusivas pensadas para quem valoriza estilo e modernidade.</p>
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
          <a href="https://wa.me/5593992175713" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.547a.5.5 0 00.608.61l5.788-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.183-1.381l-.371-.216-3.842.955.988-3.746-.237-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            (93) 99217-5713
          </a>
          <a href="https://instagram.com/perolladotapajos" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">@perolladotapajos</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categorias */}
        <h2 className="font-serif text-2xl font-light mb-6">Comprar por categoria</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          {perollaCollections.map(col => (
            <Link key={col.slug} to={`/perolla/${col.slug}`}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-card shadow-sm hover:shadow-md transition-shadow text-center group">
              <span className="text-sm font-medium group-hover:text-gold transition-colors">{col.name}</span>
              <span className="text-[10px] text-gray-400">{col.count} peças</span>
            </Link>
          ))}
        </div>
        {/* Categorias extras */}
        <h3 className="font-serif text-lg font-light mb-3 text-gray-500">Coleções especiais</h3>
        <div className="grid grid-cols-3 gap-3 mb-12">
          {perollaExtraCollections.map(col => (
            <Link key={col.slug} to={`/perolla/${col.slug}`}
              className="flex items-center justify-between gap-2 p-3 bg-white rounded-card shadow-sm hover:shadow-md transition-shadow group border border-gray-100">
              <span className="text-sm font-medium group-hover:text-gold transition-colors">{col.name}</span>
              <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                {col.count > 0 ? `${col.count} peças` : 'Em breve'}
              </span>
            </Link>
          ))}
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
