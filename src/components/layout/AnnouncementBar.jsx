const TEXT = '📦 Envio para todo o Brasil &nbsp;&nbsp;•&nbsp;&nbsp; 📲 @perolladotapajos &nbsp;&nbsp;•&nbsp;&nbsp; 💍 Semijoias, folheados e aço inoxidável &nbsp;&nbsp;•&nbsp;&nbsp; 🌊 A beleza que brilha como o Rio &nbsp;&nbsp;•&nbsp;&nbsp; 📲 Compre pelo WhatsApp &nbsp;&nbsp;•&nbsp;&nbsp; '

export default function AnnouncementBar() {
  const repeated = TEXT + TEXT
  return (
    <div className="bg-gray-900 text-white text-xs py-2 overflow-hidden select-none">
      <div className="marquee-inner" dangerouslySetInnerHTML={{ __html: repeated }} />
    </div>
  )
}
