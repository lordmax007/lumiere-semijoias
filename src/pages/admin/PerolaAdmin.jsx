import { useState, useEffect } from 'react'
import { supabase, isConfigured } from '../../lib/supabase'

const CATS = ['Brincos','Anéis','Colares','Correntes','Pulseiras','Braceletes','Conjuntos','Choker','Aço inoxidável','Masculina','Infantil']
const empty = { nome: '', categoria: 'Brincos', preco: '', descricao: '', disponivel: true }

export default function PerolaAdmin() {
  const [products, setProducts] = useState([])
  const [form, setForm]         = useState(empty)
  const [editing, setEditing]   = useState(null) // id ou null
  const [open, setOpen]         = useState(false)
  const [images, setImages]     = useState([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  const load = () => {
    if (!isConfigured) return
    supabase.from('perolla_products').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setProducts(data || []))
  }

  useEffect(load, [])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const openNew = () => { setForm(empty); setImages([]); setEditing(null); setError(''); setOpen(true) }

  const openEdit = p => {
    setForm({ nome: p.nome, categoria: p.categoria, preco: String(p.preco), descricao: p.descricao || '', disponivel: p.disponivel })
    setImages(p.imagens || [])
    setEditing(p.id)
    setError('')
    setOpen(true)
  }

  const upload = async files => {
    if (!isConfigured) return
    setUploading(true)
    const urls = []
    for (const file of files) {
      if (!['image/jpeg','image/png','image/webp'].includes(file.type)) continue
      if (file.size > 5 * 1024 * 1024) continue
      const path = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '-')}`
      const { error } = await supabase.storage.from('produtos').upload(path, file, { upsert: true })
      if (!error) {
        const { data } = supabase.storage.from('produtos').getPublicUrl(path)
        urls.push(data.publicUrl)
      }
    }
    setImages(prev => [...prev, ...urls])
    setUploading(false)
  }

  const save = async e => {
    e.preventDefault()
    setError('')
    if (!form.nome.trim() || !form.preco) { setError('Nome e preço obrigatórios'); return }
    const preco = parseFloat(form.preco.replace(',', '.'))
    if (isNaN(preco) || preco <= 0) { setError('Preço inválido'); return }
    setSaving(true)
    const payload = { nome: form.nome.trim(), categoria: form.categoria, preco, descricao: form.descricao.trim(), disponivel: form.disponivel, imagens: images }
    const q = editing
      ? supabase.from('perolla_products').update(payload).eq('id', editing)
      : supabase.from('perolla_products').insert(payload)
    const { error: err } = await q
    setSaving(false)
    if (err) { setError(err.message); return }
    setOpen(false)
    load()
  }

  const del = async id => {
    if (!confirm('Excluir produto?')) return
    await supabase.from('perolla_products').delete().eq('id', id)
    load()
  }

  const toggle = async (id, val) => {
    await supabase.from('perolla_products').update({ disponivel: !val }).eq('id', id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl font-light">Produtos Pérolla</h1>
        <button onClick={openNew} className="bg-gray-900 text-white px-5 py-2.5 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors">
          + Novo produto
        </button>
      </div>

      {!isConfigured && (
        <p className="text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded text-xs mb-6">Supabase não configurado — configure o .env para persistir dados.</p>
      )}

      {/* Lista */}
      <div className="bg-white rounded-card shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <p className="p-8 text-center text-gray-400 text-sm">Nenhum produto ainda. Clique em "Novo produto" para começar.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Produto</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Categoria</th>
                <th className="text-left px-4 py-3">Preço</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    {p.imagens?.[0] && <img src={p.imagens[0]} alt="" className="w-9 h-9 object-cover rounded" />}
                    <span className="font-medium line-clamp-1">{p.nome}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-gray-500">{p.categoria}</td>
                  <td className="px-4 py-3 font-medium">R$ {Number(p.preco).toFixed(2).replace('.', ',')}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <button onClick={() => toggle(p.id, p.disponivel)}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${p.disponivel ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.disponivel ? 'Disponível' : 'Esgotado'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button onClick={() => openEdit(p)} className="text-xs text-gray-500 hover:text-gray-900">Editar</button>
                    <button onClick={() => del(p.id)} className="text-xs text-red-400 hover:text-red-600">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="bg-white rounded-card shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <h2 className="font-serif text-xl font-light mb-6">{editing ? 'Editar produto' : 'Novo produto'}</h2>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nome *</label>
                <input value={form.nome} onChange={set('nome')} maxLength={200} required
                  className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Categoria *</label>
                  <select value={form.categoria} onChange={set('categoria')}
                    className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600">
                    {CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Preço (R$) *</label>
                  <input value={form.preco} onChange={set('preco')} placeholder="89,90"
                    className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Descrição</label>
                <input value={form.descricao} onChange={set('descricao')} maxLength={500}
                  className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="disp" checked={form.disponivel}
                  onChange={e => setForm(f => ({ ...f, disponivel: e.target.checked }))} className="w-4 h-4" />
                <label htmlFor="disp" className="text-sm text-gray-600">Disponível para venda</label>
              </div>

              {/* Imagens */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">Imagens</label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-card p-4 cursor-pointer transition-colors ${uploading ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-gray-400'}`}>
                  <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
                    onChange={e => upload(Array.from(e.target.files))} disabled={uploading} />
                  <p className="text-sm text-gray-400">{uploading ? 'Enviando...' : 'Clique para enviar imagens'}</p>
                  <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP • Máx. 5MB</p>
                </label>
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {images.map((url, i) => (
                      <div key={i} className="relative group aspect-square rounded overflow-hidden bg-gray-100">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setImages(p => p.filter(u => u !== url))}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg transition-opacity">✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving || uploading}
                  className="flex-1 bg-gray-900 text-white py-2.5 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
                  {saving ? 'Salvando...' : editing ? 'Salvar' : 'Criar produto'}
                </button>
                <button type="button" onClick={() => setOpen(false)}
                  className="px-4 py-2.5 border border-gray-300 rounded-btn text-sm text-gray-600 hover:border-gray-500 transition-colors">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
