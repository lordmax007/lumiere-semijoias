import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../data/mockData'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [hovered, setHovered] = useState(false)
  const soldOut = product.stock === 0
  const hasPromo = product.original_price && product.original_price > product.price
  const img = hovered && product.images?.[1] ? product.images[1] : product.images?.[0]

  return (
    <div
      className={`group relative flex flex-col rounded-card overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ${soldOut ? 'opacity-60' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Selo */}
      {soldOut && (
        <span className="absolute top-3 left-3 z-10 bg-gray-700 text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide">ESGOTADO</span>
      )}
      {!soldOut && hasPromo && (
        <span className="absolute top-3 left-3 z-10 bg-gold text-white text-[10px] px-2 py-0.5 rounded font-medium tracking-wide">PROMOÇÃO</span>
      )}

      {/* Imagem */}
      <Link to={`/produto/${product.slug}`} className="block aspect-square overflow-hidden bg-gray-50">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <Link to={`/produto/${product.slug}`} className="text-sm font-medium hover:text-gold transition-colors line-clamp-2 leading-snug">
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2 mt-1">
          {hasPromo && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.original_price)}</span>
          )}
          <span className="text-base font-semibold text-gray-900">{formatPrice(product.price)}</span>
        </div>
        <p className="text-[10px] text-gray-400 mt-0.5">6x de {formatPrice(Math.ceil(product.price / 6))} sem juros</p>

        {/* Botão */}
        <div className="mt-3">
          {soldOut ? (
            <button disabled className="w-full py-2 rounded-btn bg-gray-100 text-gray-400 text-xs font-medium cursor-not-allowed">
              Esgotado
            </button>
          ) : product.variants?.length ? (
            <Link
              to={`/produto/${product.slug}`}
              className="block w-full text-center py-2 rounded-btn border border-gray-900 text-xs font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Escolher tamanho
            </Link>
          ) : (
            <button
              onClick={() => addItem(product)}
              className="w-full py-2 rounded-btn bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 transition-colors"
            >
              Adicionar ao carrinho
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
