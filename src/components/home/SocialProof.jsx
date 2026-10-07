import { useRef, useState } from 'react'
import { reviews } from '../../data/mockData'
import { useFadeIn } from '../../hooks/useFadeIn'

function Stars({ n = 5 }) {
  return <span className="text-gold text-sm tracking-tighter">{'★'.repeat(n)}</span>
}

export default function SocialProof() {
  const [ref, visible] = useFadeIn()
  const track = useRef(null)
  const [expanded, setExpanded] = useState({})
  const scroll = (dir) => track.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })

  return (
    <section ref={ref} className={`bg-gray-50 py-14 ${visible ? 'fade-in' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-gray-400 tracking-widest uppercase mb-1">Avaliações</p>
            <h2 className="font-serif text-3xl font-light tracking-wide">+4.800 clientes satisfeitas</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll(-1)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors">‹</button>
            <button onClick={() => scroll(1)} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors">›</button>
          </div>
        </div>

        <div ref={track} className="carousel-track flex gap-4 overflow-x-auto pb-2">
          {reviews.map(r => (
            <div key={r.id} className="flex-shrink-0 w-72 bg-white rounded-card p-5 shadow-sm">
              <Stars />
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {expanded[r.id] ? r.text : r.text.slice(0, 80) + (r.text.length > 80 ? '…' : '')}
              </p>
              {r.text.length > 80 && (
                <button onClick={() => setExpanded(e => ({ ...e, [r.id]: !e[r.id] }))} className="text-xs text-gold mt-1 hover:underline">
                  {expanded[r.id] ? 'Mostrar menos' : 'Mostrar mais'}
                </button>
              )}
              <div className="flex items-center gap-2 mt-4">
                <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center font-medium">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-xs font-medium">{r.name}</p>
                  <p className="text-[10px] text-gold">✔ Compra verificada</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
