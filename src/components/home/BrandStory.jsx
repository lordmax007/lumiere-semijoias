import { useFadeIn } from '../../hooks/useFadeIn'

export default function BrandStory() {
  const [ref, visible] = useFadeIn()
  return (
    <section ref={ref} className={`py-20 px-4 text-center max-w-2xl mx-auto ${visible ? 'fade-in' : 'opacity-0'}`}>
      <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Nossa História</p>
      <h2 className="font-serif text-3xl md:text-4xl font-light leading-relaxed tracking-wide mb-6">
        Nascemos da crença de que toda mulher merece brilhar
      </h2>
      <p className="text-gray-500 text-sm leading-relaxed">
        Cada peça Lumière é criada com atenção ao detalhe, usando materiais de alta qualidade e banhos de ouro que duram.
        Acreditamos que elegância não precisa de um preço inacessível — e é isso que nos move todos os dias.
      </p>
      <div className="mt-8 w-16 h-px bg-gold mx-auto" />
    </section>
  )
}
