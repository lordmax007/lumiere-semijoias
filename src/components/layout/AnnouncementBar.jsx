// Static marquee — no user input, but avoid dangerouslySetInnerHTML for CSP compliance
const ITEMS = [
  '📦 Envio para todo o Brasil',
  '📲 @perolladotapajos',
  '💍 Semijoias, folheados e aço inoxidável',
  '🌊 A beleza que brilha como o Rio',
  '📲 Compre pelo WhatsApp',
]

export default function AnnouncementBar() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="bg-gray-900 text-white text-xs py-2 overflow-hidden select-none">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i} className="mx-4">{item}</span>
        ))}
      </div>
    </div>
  )
}
