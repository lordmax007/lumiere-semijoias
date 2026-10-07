import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/mockData'

export default function CartDrawer() {
  const { open, items, total, count, closeDrawer, removeItem, setQty } = useCart()

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={closeDrawer} />}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-serif text-lg tracking-wide">Meu Carrinho{count > 0 ? ` (${count})` : ''}</h2>
          <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-gray-400 text-sm">O carrinho está vazio</p>
              <button onClick={closeDrawer} className="btn-primary text-sm px-6 py-2">Voltar à loja</button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item._key} className="flex gap-3">
                  <img src={item.images?.[0]} alt={item.name} className="w-16 h-16 object-cover rounded-card bg-gray-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    {item.variant && <p className="text-xs text-gray-400">Tamanho: {item.variant}</p>}
                    <p className="text-sm font-semibold text-gold mt-0.5">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => setQty(item._key, item.qty - 1)} className="w-6 h-6 border rounded flex items-center justify-center text-sm hover:bg-gray-50">−</button>
                      <span className="text-sm w-5 text-center">{item.qty}</span>
                      <button onClick={() => setQty(item._key, item.qty + 1)} className="w-6 h-6 border rounded flex items-center justify-center text-sm hover:bg-gray-50">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item._key)} className="text-gray-300 hover:text-gray-600 text-sm self-start mt-1">✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-gray-400">Frete calculado no checkout</p>
            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="block w-full text-center bg-gray-900 text-white py-3 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Finalizar Compra
            </Link>
            <button onClick={closeDrawer} className="block w-full text-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
