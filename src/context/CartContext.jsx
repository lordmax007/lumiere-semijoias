import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.item.id}__${action.item.variant || ''}`
      const existing = state.items.find(i => i._key === key)
      if (existing) {
        return { ...state, items: state.items.map(i => i._key === key ? { ...i, qty: i.qty + 1 } : i) }
      }
      return { ...state, items: [...state.items, { ...action.item, _key: key, qty: 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i._key !== action.key) }
    case 'SET_QTY':
      return { ...state, items: state.items.map(i => i._key === action.key ? { ...i, qty: Math.max(1, action.qty) } : i) }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN':  return { ...state, open: true }
    case 'CLOSE': return { ...state, open: false }
    case 'TOGGLE': return { ...state, open: !state.open }
    default: return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false })
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = state.items.reduce((s, i) => s + i.qty, 0)

  const addItem = (item) => { dispatch({ type: 'ADD', item }); dispatch({ type: 'OPEN' }) }
  const removeItem = (key) => dispatch({ type: 'REMOVE', key })
  const setQty = (key, qty) => dispatch({ type: 'SET_QTY', key, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })
  const toggleDrawer = () => dispatch({ type: 'TOGGLE' })
  const closeDrawer = () => dispatch({ type: 'CLOSE' })

  return (
    <CartContext.Provider value={{ ...state, total, count, addItem, removeItem, setQty, clearCart, toggleDrawer, closeDrawer }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
