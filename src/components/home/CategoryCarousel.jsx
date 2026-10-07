import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { collections } from '../../data/mockData'
import { useFadeIn } from '../../hooks/useFadeIn'

export default function CategoryCarousel() {
  const [ref, visible] = useFadeIn()
  const track = useRef(null)

  const scroll = (dir) => {
    track.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  return (
    <section ref={ref} className={`max-w-7xl mx-auto px-4 py-14 ${visible ? 'fade-in' : 'opacity-0'}`}>
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-serif text-3xl font-light tracking-wide">Compre por Coleção</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors" aria-label="Anterior">
            ‹
          </button>
          <button onClick={() => scroll(1)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors" aria-label="Próximo">
            ›
          </button>
        </div>
      </div>

      <div ref={track} className="carousel-track flex gap-4 overflow-x-auto pb-2">
        {collections.map((col) => (
          <Link
            key={col.id}
            to={`/colecao/${col.slug}`}
            className="flex-shrink-0 flex flex-col items-center gap-3 group"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold transition-all duration-300">
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-medium tracking-wide group-hover:text-gold transition-colors">{col.name}</span>
            <span className="text-xs text-gray-400">{col.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
