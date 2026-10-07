import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import { useFadeIn } from '../../hooks/useFadeIn'

export default function ProductSection({ title, products, viewAllHref }) {
  const [ref, visible] = useFadeIn()
  const track = useRef(null)
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 280, behavior: 'smooth' })

  return (
    <section ref={ref} className={`max-w-7xl mx-auto px-4 py-10 ${visible ? 'fade-in' : 'opacity-0'}`}>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide">{title}</h2>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll(-1)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors">‹</button>
            <button onClick={() => scroll(1)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors">›</button>
          </div>
          {viewAllHref && (
            <Link to={viewAllHref} className="text-xs font-medium tracking-widest uppercase border-b border-gray-400 hover:border-gray-900 transition-colors pb-0.5">
              Ver tudo
            </Link>
          )}
        </div>
      </div>

      <div ref={track} className="carousel-track flex gap-4 overflow-x-auto pb-2">
        {products.map(p => (
          <div key={p.id} className="flex-shrink-0 w-52 sm:w-60">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
