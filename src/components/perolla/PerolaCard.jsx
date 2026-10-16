import { useState, useEffect } from 'react'
import { formatPrice } from '../../data/mockData'

const DESC_CAT = {
  'Brincos':          'Brinco em semijoia folheada a ouro, peça delicada e versátil para o dia a dia ou ocasiões especiais.',
  'Anéis':            'Anel em semijoia folheada, design elegante que combina com qualquer look.',
  'Colares':          'Colar em semijoia folheada, perfeito para valorizar qualquer decote.',
  'Correntes':        'Corrente em semijoia folheada, clássica e sofisticada para usar sozinha ou em layering.',
  'Pulseiras':        'Pulseira em semijoia folheada, delicada e resistente para usar no dia a dia.',
  'Braceletes':       'Bracelete em semijoia folheada, peça marcante que complementa qualquer visual.',
  'Conjunto':         'Conjunto em semijoia folheada, coordenado e elegante para um look completo.',
  'Choker':           'Choker em semijoia folheada, tendência atemporal que valoriza o pescoço.',
  'Aço inoxidável':   'Peça em aço inoxidável hipoalergênico, durável e resistente à água e ao suor.',
  'default':          'Semijoia folheada de alta qualidade, perfeita para presente ou uso próprio.',
}

function getDesc(p) {
  if (p.descricao?.trim()) return p.descricao.trim()
  return DESC_CAT[p.categoria] || DESC_CAT.default
}

const WA_ICON = <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.547a.5.5 0 00.608.61l5.788-1.437A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.502-5.183-1.381l-.371-.216-3.842.955.988-3.746-.237-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>

function ProductModal({ p, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const imgs = p.imagens?.length ? p.imagens : []
  const estoque = p.estoque ?? 0
  const desc = getDesc(p)

  useEffect(() => {
    const fn = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  const waUrl = `https://wa.me/5593992175713?text=${encodeURIComponent(
    `Olá! Tenho interesse no produto: ${p.nome} (R$ ${p.preco.toFixed(2).replace('.', ',')})${qty > 1 ? ` — ${qty} unidades` : ''}`
  )}`

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog" aria-modal="true" aria-label={p.nome}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl max-h-[94vh] overflow-y-auto">

        <button onClick={onClose} aria-label="Fechar"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow text-gray-500 hover:text-gray-800 transition-colors text-lg">
          ✕
        </button>

        <div className="sm:flex">
          {/* Galeria */}
          <div className="sm:w-1/2 bg-gray-50 flex-shrink-0">
            <div className="aspect-square overflow-hidden">
              {imgs[imgIdx]
                ? <img src={imgs[imgIdx]} alt={p.nome} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-gray-200 text-6xl">💍</div>
              }
            </div>
            {imgs.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {imgs.map((src, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-yellow-400' : 'border-transparent'}`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="sm:w-1/2 p-5 flex flex-col gap-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{p.categoria}</p>
            <h2 className="font-medium text-lg leading-snug">{p.nome}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>

            <p className="text-2xl font-semibold text-gray-900">
              {formatPrice(Math.round(p.preco * 100))}
            </p>

            {/* Estoque */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${estoque > 0 ? 'bg-green-500' : 'bg-red-400'}`} />
              <span className="text-xs text-gray-500">
                {estoque > 0 ? `${estoque} em estoque` : 'Esgotado'}
              </span>
            </div>

            {/* Quantidade */}
            {p.disponivel && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">Quantidade:</span>
                <div className="flex items-center border border-gray-200 rounded-btn overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light">−</button>
                  <span className="w-8 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(estoque || 99, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light">+</button>
                </div>
              </div>
            )}

            <div className="mt-auto pt-2">
              {p.disponivel ? (
                <a href={waUrl} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-btn bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                  {WA_ICON} Comprar via WhatsApp
                </a>
              ) : (
                <p className="text-center text-sm text-gray-400 py-3 bg-gray-50 rounded-btn">Produto esgotado</p>
              )}
              <p className="text-[10px] text-gray-300 text-center mt-2">Atendimento · (93) 99217-5713</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PerolaCard({ p }) {
  const [open, setOpen] = useState(false)
  const img = p.imagens?.[0]

  return (
    <>
      <div onClick={() => setOpen(true)}
        className="group relative flex flex-col rounded-card overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
        {!p.disponivel && (
          <span className="absolute top-3 left-3 z-10 bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded font-medium">ESGOTADO</span>
        )}
        <div className="aspect-square overflow-hidden bg-gray-100">
          {img
            ? <img src={img} alt={p.nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            : <div className="w-full h-full flex items-center justify-center text-gray-200 text-4xl">💍</div>
          }
        </div>
        <div className="p-3 flex flex-col gap-0.5 flex-1">
          <p className="text-sm font-medium line-clamp-2 leading-snug">{p.nome}</p>
          <p className="text-base font-semibold text-gray-900 mt-1">{formatPrice(Math.round(p.preco * 100))}</p>
          {p.estoque > 0 && <p className="text-[10px] text-green-600">{p.estoque} em estoque</p>}
        </div>
      </div>
      {open && <ProductModal p={p} onClose={() => setOpen(false)} />}
    </>
  )
}
