import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="font-serif text-white text-xl tracking-widest mb-3">LUMIÈRE</div>
          <p className="text-sm text-gray-400 leading-relaxed">Semijoias exclusivas com design elegante e preço acessível.</p>
          <div className="flex gap-3 mt-4">
            {['Instagram', 'Facebook', 'Pinterest'].map(s => (
              <a key={s} href="#" className="text-xs text-gray-400 hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-white text-sm font-semibold mb-3">Institucional</div>
          <ul className="space-y-2 text-sm">
            {[['Sobre nós', '#'], ['Blog', '#'], ['Trabalhe conosco', '#']].map(([l, h]) => (
              <li key={l}><a href={h} className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white text-sm font-semibold mb-3">Ajuda</div>
          <ul className="space-y-2 text-sm">
            {[['Política de trocas', '#'], ['Rastrear pedido', '#'], ['Fale conosco', '#'], ['FAQ', '#']].map(([l, h]) => (
              <li key={l}><a href={h} className="hover:text-white transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-white text-sm font-semibold mb-3">Contato</div>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>contato@lumiere.com.br</li>
            <li>(11) 9 9999-9999</li>
            <li className="pt-2 text-xs">Seg–Sex 9h–18h</li>
          </ul>
          <div className="mt-4">
            <div className="text-white text-sm font-semibold mb-2">Pagamentos</div>
            <div className="flex flex-wrap gap-1 text-xs text-gray-400">
              {['Pix', 'Visa', 'Master', 'Amex', 'Elo', 'Boleto'].map(p => (
                <span key={p} className="border border-gray-600 px-2 py-0.5 rounded">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Lumière Semijoias &nbsp;|&nbsp; CNPJ 00.000.000/0001-00 &nbsp;|&nbsp; Todos os direitos reservados
      </div>
    </footer>
  )
}
