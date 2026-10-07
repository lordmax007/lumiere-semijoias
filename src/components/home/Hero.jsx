import { Link } from 'react-router-dom'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&h=700&fit=crop&q=80',
    title: 'Elegância que\nTranscende',
    sub: 'Semijoias exclusivas para cada momento especial',
    cta: 'Ver coleção',
    href: '/produtos',
  },
  {
    image: 'https://images.unsplash.com/photo-1603974372013-9f0c7acf7a7c?w=1400&h=700&fit=crop&q=80',
    title: 'Nova Coleção\nClássica',
    sub: 'Peças atemporais que completam qualquer look',
    cta: 'Descobrir',
    href: '/colecao/classica',
  },
]

import { useState, useEffect } from 'react'

export default function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[idx]

  return (
    <div className="relative w-full h-[70vh] min-h-[420px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="font-serif text-4xl md:text-6xl font-light tracking-widest leading-tight whitespace-pre-line drop-shadow-sm">
          {slide.title}
        </h1>
        <p className="mt-4 text-sm md:text-base font-light tracking-wider opacity-90 max-w-md">
          {slide.sub}
        </p>
        <Link
          to={slide.href}
          className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-btn text-sm font-medium tracking-wider hover:bg-gray-100 transition-colors"
        >
          {slide.cta}
        </Link>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
