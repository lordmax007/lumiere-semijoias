import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isConfigured } from '../../lib/supabase'
import { products as mockProducts, formatPrice } from '../../data/mockData'

export default function AdminProducts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    if (isConfigured) {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      setItems(data || [])
    } else {
      setItems(mockProducts)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const toggleActive = async (item) => {
    const updated = { ...item, active: !item.active }
    setItems(prev => prev.map(p => p.id === item.id ? updated : p))
    if (isConfigured) await supabase.from('products').update({ active: updated.active }).eq('id', item.id)
  }

  const deleteProduct = async (item) => {
    if (!confirm(`Excluir "${item.name}"?`)) return
    setItems(prev => prev.filter(p => p.id !== item.id))
    if (isConfigured) await supabase.from('products').delete().eq('id', item.id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light">Produtos</h1>
        <Link to="/admin/produtos/novo" className="bg-gray-900 text-white px-5 py-2 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors">
          + Novo produto
        </Link>
      </div>

      {loading ? (
        <div className="text-sm text-gray-400">Carregando...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-card shadow-sm p-12 text-center text-gray-400">
          <p className="mb-4">Nenhum produto cadastrado.</p>
          <Link to="/admin/produtos/novo" className="text-sm underline">Criar primeiro produto</Link>
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Produto', 'Preço', 'Estoque', 'Status', 'Ações'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] && (
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                      )}
                      <span className="font-medium max-w-[200px] truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${p.stock === 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {p.stock === 0 ? 'Esgotado' : p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(p)}
                      className={`text-xs px-2 py-1 rounded font-medium transition-colors ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link to={`/admin/produtos/${p.id}`} className="text-xs text-gold hover:underline">Editar</Link>
                      <button onClick={() => deleteProduct(p)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
