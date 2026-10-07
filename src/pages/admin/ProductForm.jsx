import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase, isConfigured } from '../../lib/supabase'
import { products as mockProducts, collections } from '../../data/mockData'

const empty = { name: '', slug: '', price: '', original_price: '', stock: '', collection_id: '', description: '', active: true, variants: '' }

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id || id === 'novo'

  const [form, setForm] = useState(empty)
  const [images, setImages] = useState([]) // URLs já salvas
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isNew || !isConfigured) {
      if (!isNew) {
        const p = mockProducts.find(p => p.id === id)
        if (p) {
          setForm({ ...p, price: (p.price/100).toFixed(2), original_price: p.original_price ? (p.original_price/100).toFixed(2) : '', variants: p.variants?.join(', ') || '' })
          setImages(p.images || [])
        }
      }
      return
    }
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => {
      if (!data) return
      setForm({ ...data, price: (data.price/100).toFixed(2), original_price: data.original_price ? (data.original_price/100).toFixed(2) : '', variants: data.variants?.join(', ') || '' })
      setImages(data.images || [])
    })
  }, [id, isNew])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const setCheck = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }))

  const uploadImages = async (files) => {
    if (!isConfigured) return
    setUploading(true)
    const urls = []
    for (const file of files) {
      if (!['image/jpeg','image/png','image/webp'].includes(file.type)) continue
      if (file.size > 5 * 1024 * 1024) continue // max 5MB
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

  const removeImage = (url) => setImages(prev => prev.filter(u => u !== url))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.price) { setError('Nome e preço são obrigatórios'); return }
    setSaving(true)

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || form.name.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),
      price: Math.round(parseFloat(form.price.replace(',','.')) * 100),
      original_price: form.original_price ? Math.round(parseFloat(form.original_price.replace(',','.')) * 100) : null,
      stock: parseInt(form.stock) || 0,
      collection_id: form.collection_id || null,
      description: form.description.trim(),
      active: true,
      images,
      variants: form.variants ? form.variants.split(',').map(v => v.trim()).filter(Boolean) : null,
    }

    if (isConfigured) {
      const q = isNew
        ? supabase.from('products').insert(payload)
        : supabase.from('products').update(payload).eq('id', id)
      const { error: err } = await q
      if (err) { setSaving(false); setError(err.message); return }
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => navigate('/admin/produtos'), 1000)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/produtos" className="text-gray-400 hover:text-gray-700 text-sm">← Produtos</Link>
        <h1 className="font-serif text-3xl font-light">{isNew ? 'Novo produto' : 'Editar produto'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 max-w-4xl">
        {/* Coluna esquerda */}
        <div className="space-y-5 bg-white rounded-card shadow-sm p-6">
          <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Informações</h2>
          {[
            { k: 'name', label: 'Nome do produto' },
            { k: 'description', label: 'Descrição' },
          ].map(({ k, label }) => (
            <div key={k}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input type="text" value={form[k]} onChange={set(k)} maxLength={500}
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Preço (R$)</label>
              <input type="text" value={form.price} onChange={set('price')} placeholder="89.90"
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Preço riscado (R$)</label>
              <input type="text" value={form.original_price} onChange={set('original_price')} placeholder="Opcional"
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Estoque</label>
              <input type="number" value={form.stock} onChange={set('stock')} min={0}
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Coleção</label>
              <select value={form.collection_id} onChange={set('collection_id')}
                className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600">
                <option value="">Sem coleção</option>
                {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Tamanhos (ex: PP, P, M, G, GG)</label>
            <input type="text" value={form.variants} onChange={set('variants')} placeholder="Deixe vazio se não houver"
              className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
          </div>
        </div>

        {/* Coluna direita — imagens */}
        <div className="space-y-5 bg-white rounded-card shadow-sm p-6">
          <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Imagens</h2>

          {/* Upload area */}
          <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-card p-6 cursor-pointer transition-colors ${uploading ? 'border-gold bg-yellow-50' : 'border-gray-200 hover:border-gray-400'}`}>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden"
              onChange={e => uploadImages(Array.from(e.target.files))} disabled={uploading} />
            {uploading ? (
              <p className="text-sm text-gold">Enviando...</p>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-sm text-gray-400">Clique para enviar imagens</p>
                <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP • Máx. 5MB cada</p>
              </>
            )}
          </label>

          {/* Preview imagens */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((url, i) => (
                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(url)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl">
                    ✕
                  </button>
                  {i === 0 && <span className="absolute bottom-1 left-1 bg-gold text-white text-[9px] px-1 py-0.5 rounded font-medium">Principal</span>}
                </div>
              ))}
            </div>
          )}

          {!isConfigured && (
            <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">Upload de imagens requer Supabase configurado.</p>
          )}
        </div>

        {/* Botão salvar */}
        <div className="md:col-span-2">
          {error && <p className="text-red-500 text-sm p-3 bg-red-50 rounded-btn mb-4">{error}</p>}
          <button type="submit" disabled={saving || uploading}
            className={`px-8 py-3 rounded-btn text-sm font-medium transition-all ${saved ? 'bg-green-700 text-white' : 'bg-gray-900 text-white hover:bg-gray-700'} disabled:opacity-60`}>
            {saved ? '✓ Salvo!' : saving ? 'Salvando...' : isNew ? 'Criar produto' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </div>
  )
}
