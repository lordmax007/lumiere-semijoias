const TEXT = '🚚 Frete grátis acima de R$ 299 &nbsp;&nbsp;•&nbsp;&nbsp; 💳 Parcelamento em até 6x sem juros &nbsp;&nbsp;•&nbsp;&nbsp; 📦 Envio para todo o Brasil &nbsp;&nbsp;•&nbsp;&nbsp; 📲 @lumiere.semijoias &nbsp;&nbsp;•&nbsp;&nbsp; ⭐ +4.800 clientes satisfeitas &nbsp;&nbsp;•&nbsp;&nbsp; '

export default function AnnouncementBar() {
  const repeated = TEXT + TEXT
  return (
    <div className="bg-gray-900 text-white text-xs py-2 overflow-hidden select-none">
      <div className="marquee-inner" dangerouslySetInnerHTML={{ __html: repeated }} />
    </div>
  )
}
