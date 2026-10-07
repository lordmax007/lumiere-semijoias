import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products, collections, formatPrice } from '../data/mockData'

export default function ProductPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const product = products.find(p => p.slug === slug)
  const [imgIdx, setImgIdx] = useState(0)
  const [variant, setVariant] = useState(null)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">Produto não encontrado.</p>
      <Link to="/produtos" className="text-sm underline">Ver todos os produtos</Link>
    </div>
  )

  const col = collections.find(c => c.id === product.collection_id)
  const soldOut = product.stock === 0
  const hasPromo = product.original_price && product.original_price > product.price
  const needsVariant = product.variants?.length > 0

  const handleAdd = () => {
    if (needsVariant && !variant) { alert('Selecione um tamanho'); return }
    for (let i = 0; i < qty; i++) addItem({ ...product, variant })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex gap-2">
        <Link to="/" className="hover:text-gray-700">Início</Link> /
        <Link to="/produtos" className="hover:text-gray-700">Produtos</Link> /
        {col && <><Link to={`/colecao/${col.slug}`} className="hover:text-gray-700">{col.name}</Link> /</>}
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
        {/* Galeria */}
        <div>
          <div className="aspect-square rounded-card overflow-hidden bg-gray-50 mb-3">
            <img
              src={product.images[imgIdx]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${i === imgIdx ? 'border-gray-900' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          {col && <Link to={`/colecao/${col.slug}`} className="text-xs tracking-widest uppercase text-gold hover:underline">{col.name}</Link>}
          <h1 className="font-serif text-3xl font-light leading-snug">{product.name}</h1>

          <div className="flex items-baseline gap-3">
            {hasPromo && <span className="text-gray-400 line-through text-sm">{formatPrice(product.original_price)}</span>}
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
          </div>
          <p className="text-xs text-gray-400">6x de {formatPrice(Math.ceil(product.price / 6))} sem juros no cartão</p>

          {/* Variantes */}
          {needsVariant && (
            <div>
              <p className="text-sm font-medium mb-2">Tamanho:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`w-10 h-10 border rounded-btn text-sm transition-all ${variant === v ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:border-gray-600'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantidade */}
          {!soldOut && (
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Quantidade:</p>
              <div className="flex items-center border border-gray-300 rounded-btn overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">−</button>
                <span className="px-4 py-2 text-sm border-x border-gray-300">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">+</button>
              </div>
              <span className="text-xs text-gray-400">{product.stock} disponíveis</span>
            </div>
          )}

          {/* Botão */}
          {soldOut ? (
            <button disabled className="w-full py-3.5 rounded-btn bg-gray-100 text-gray-400 font-medium cursor-not-allowed">Esgotado</button>
          ) : (
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-btn font-medium transition-all text-sm tracking-wide ${added ? 'bg-green-700 text-white' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
            >
              {added ? '✓ Adicionado ao carrinho' : 'Adicionar ao carrinho'}
            </button>
          )}

          {/* Descrição */}
          {product.description && (
            <div className="border-t pt-4 mt-2">
              <p className="text-sm font-medium mb-1">Descrição</p>
              <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
            </div>
          )}

          <div className="border-t pt-4 text-xs text-gray-400 space-y-1">
            <p>🚚 Frete grátis acima de R$ 299</p>
            <p>🔄 Troca gratuita em até 30 dias</p>
            <p>🔒 Compra 100% segura</p>
          </div>
        </div>
      </div>
    </div>
  )
}
