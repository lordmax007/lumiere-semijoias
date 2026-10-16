import { useState } from 'react'
import { Link } from 'react-router-dom'
import { perollaProducts } from '../../data/perollaData'

export default function AdminProducts() {
  const [search, setSearch] = useState('')

  const filtered = perollaProducts.filter(p =>
    p.nome.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-light">Produtos</h1>
        <Link to="/gp-8f3a2k7m/perolla" className="bg-gray-900 text-white px-5 py-2 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors">
          + Novo produto
        </Link>
      </div>


      <div className="mb-4">
        <input
          type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome ou categoria..."
          className="w-full max-w-sm border border-gray-300 rounded-btn px-3 py-2 text-sm outline-none focus:border-gray-600"
        />
      </div>

      <div className="bg-white rounded-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Produto', 'Categoria', 'Preço', 'Status'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.imagens?.[0] && (
                      <img src={p.imagens[0]} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-100 flex-shrink-0" />
                    )}
                    <span className="font-medium max-w-[200px] truncate">{p.nome}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{p.categoria}</td>
                <td className="px-4 py-3 font-medium">R$ {p.preco.toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${p.disponivel ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                    {p.disponivel ? 'Disponível' : 'Esgotado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  )
}
