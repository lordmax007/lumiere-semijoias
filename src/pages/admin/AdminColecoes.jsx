import { useState, useEffect } from 'react'
import { supabase, isConfigured } from '../../lib/supabase'
import { collections as mockCollections } from '../../data/mockData'

export default function AdminColecoes() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', slug: '', description: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const load = async () => {
    if (isConfigured) {
      const { data } = await supabase.from('collections').select('*').order('created_at')
      setItems(data || [])
    } else {
      setItems(mockCollections)
    }
  }

  useEffect(() => { load() }, [])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('Nome obrigatório'); return }
    setSaving(true)

    let imageUrl = editing?.image || ''

    if (imageFile && isConfigured) {
      const path = `colecoes/${Date.now()}-${imageFile.name.replace(/[^a-z0-9.]/gi, '-')}`
      const { error: upErr } = await supabase.storage.from('produtos').upload(path, imageFile, { upsert: true })
      if (!upErr) {
        const { data } = supabase.storage.from('produtos').getPublicUrl(path)
        imageUrl = data.publicUrl
      }
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || form.name.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),
      description: form.description.trim(),
      image: imageUrl,
    }

    if (isConfigured) {
      const q = editing
        ? supabase.from('collections').update(payload).eq('id', editing.id)
        : supabase.from('collections').insert(payload)
      const { error: err } = await q
      if (err) { setSaving(false); setError(err.message); return }
    }

    setSaving(false)
    setForm({ name: '', slug: '', description: '' })
    setImageFile(null)
    setImagePreview('')
    setEditing(null)
    load()
  }

  const startEdit = (col) => {
    setEditing(col)
    setForm({ name: col.name, slug: col.slug, description: col.description || '' })
    setImagePreview(col.image || '')
  }

  const deleteCol = async (col) => {
    if (!confirm(`Excluir coleção "${col.name}"?`)) return
    if (isConfigured) await supabase.from('collections').delete().eq('id', col.id)
    load()
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Coleções</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">

        {/* Formulário */}
        <div className="bg-white rounded-card shadow-sm p-6">
          <h2 className="font-medium text-sm mb-4">{editing ? `Editando: ${editing.name}` : 'Nova coleção'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            {[
              { k: 'name', label: 'Nome' },
                { k: 'description', label: 'Descrição curta' },
            ].map(({ k, label }) => (
              <div key={k}>
                <label className="block text-xs text-gray-500 mb-1">{label}</label>
                <input type="text" value={form[k]} onChange={set(k)} maxLength={200}
                  className="w-full border border-gray-300 rounded-btn px-3 py-2.5 text-sm outline-none focus:border-gray-600 transition-colors" />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Imagem da coleção</label>
              {imagePreview && <img src={imagePreview} alt="" className="w-full h-32 object-cover rounded-lg mb-2 bg-gray-100" />}
              <label className="flex items-center gap-2 text-xs text-gray-500 border border-gray-300 rounded-btn px-3 py-2 cursor-pointer hover:border-gray-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" /></svg>
                Escolher imagem
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
            </div>
            {error && <p className="text-red-500 text-xs p-2 bg-red-50 rounded">{error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={saving}
                className="bg-gray-900 text-white px-5 py-2 rounded-btn text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-60">
                {saving ? 'Salvando...' : editing ? 'Salvar' : 'Criar'}
              </button>
              {editing && (
                <button type="button" onClick={() => { setEditing(null); setForm({ name:'',slug:'',description:'' }); setImagePreview('') }}
                  className="border border-gray-300 px-5 py-2 rounded-btn text-sm hover:border-gray-600 transition-colors">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {items.map(col => (
            <div key={col.id} className="bg-white rounded-card shadow-sm p-4 flex items-center gap-3">
              {col.image && <img src={col.image} alt="" className="w-12 h-12 object-cover rounded-lg flex-shrink-0 bg-gray-100" />}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{col.name}</p>
                <p className="text-xs text-gray-400 truncate">{col.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(col)} className="text-xs text-gold hover:underline">Editar</button>
                <button onClick={() => deleteCol(col)} className="text-xs text-red-400 hover:text-red-600 transition-colors">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
