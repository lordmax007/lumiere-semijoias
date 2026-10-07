export default function AdminOrders() {
  const mockOrders = [
    { id: '#001', customer: 'Ana Carolina', total: 15990, status: 'pago', date: '03/10/2026' },
    { id: '#002', customer: 'Mariana S.', total: 24990, status: 'aguardando', date: '03/10/2026' },
    { id: '#003', customer: 'Juliana M.', total: 8990, status: 'enviado', date: '02/10/2026' },
  ]

  const badge = {
    pago: 'bg-green-100 text-green-700',
    aguardando: 'bg-yellow-100 text-yellow-700',
    enviado: 'bg-blue-100 text-blue-700',
    cancelado: 'bg-red-100 text-red-700',
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Pedidos</h1>
      <div className="bg-white rounded-card shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Pedido', 'Cliente', 'Total', 'Status', 'Data'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockOrders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs font-medium">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3 font-medium">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(o.total / 100)}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${badge[o.status] || badge.aguardando}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 p-4">Pedidos reais serão exibidos aqui após integração com Supabase.</p>
      </div>
    </div>
  )
}
