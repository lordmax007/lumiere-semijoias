import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { perollaCollections, perollaExtraCollections } from '../../data/perollaData'

const ALL_CATS = [...perollaCollections, ...perollaExtraCollections]

function CatCircle({ col, active, index }) {
  const [broken, setBroken] = useState(false)

  return (
    <Link
      to={`/perolla/${col.slug}`}
      className="flex-shrink-0 flex flex-col items-center gap-2 group"
      style={{ width: 'clamp(85px, 22vw, 100px)' }}
    >
      <div className={`rounded-full overflow-hidden border-2 transition-all duration-200 ${
        active
          ? 'border-gold scale-105 shadow-md'
          : 'border-gold/40 group-hover:border-gold group-hover:scale-105'
      }`}
        style={{ width: 'clamp(72px, 18vw, 88px)', height: 'clamp(72px, 18vw, 88px)' }}
      >
        {col.image && !broken ? (
          <img
            src={col.image}
            alt={col.name}
            className="w-full h-full object-cover"
            loading={index < 5 ? 'eager' : 'lazy'}
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gold/10">
            <span className="font-serif text-gold font-bold text-xl">
              {col.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <span className={`text-[11px] font-semibold text-center leading-tight transition-colors ${
        active ? 'text-gold' : 'group-hover:text-gold'
      }`}>
        {col.name}
      </span>
    </Link>
  )
}

export default function PerolaCarousel({ activeSlug }) {
  const track = useRef(null)

  const scroll = (dir) => track.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })

  return (
    <div className="relative bg-white border-b border-gray-100 px-4 py-4">
      <button
        onClick={() => scroll(-1)}
        className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition-colors"
        aria-label="Categorias anteriores"
      >‹</button>

      <div
        ref={track}
        className="flex gap-4 overflow-x-auto pb-1 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {ALL_CATS.map((col, i) => (
          <CatCircle key={col.slug} col={col} active={col.slug === activeSlug} index={i} />
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-500 hover:border-gold hover:text-gold transition-colors"
        aria-label="Próximas categorias"
      >›</button>
    </div>
  )
}
