import raw from './perolla-products.json'

const normalize = (cat) => cat === 'Conjuntos' ? 'Conjunto' : cat

export const perollaProducts = raw.map(p => ({ ...p, categoria: normalize(p.categoria) }))

export const catSlug = (cat) =>
  cat.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')

// Categorias originais
const CAT_ORDER = ['Brincos', 'Anéis', 'Colares', 'Correntes', 'Pulseiras', 'Braceletes', 'Conjunto', 'Choker']

export const perollaCollections = CAT_ORDER.map(name => ({
  name, slug: catSlug(name),
  count: perollaProducts.filter(p => p.categoria === name).length,
  extra: false,
})).filter(c => c.count > 0)

// Categorias extras — produto aparece na original E na extra (sem duplicar)
export const EXTRA_CATS = [
  { name: 'Aço inoxidável', slug: 'aco-inoxidavel', field: 'aco_inoxidavel' },
  { name: 'Masculina',      slug: 'masculina',       field: 'masculina' },
  { name: 'Infantil',       slug: 'infantil',        field: 'infantil' },
]

export const perollaExtraCollections = EXTRA_CATS.map(c => ({
  ...c,
  count: perollaProducts.filter(p => p[c.field]).length,
  extra: true,
}))

// Resolve slug → lista de produtos (original ou extra)
export function getProductsBySlug(slug) {
  const extra = EXTRA_CATS.find(c => c.slug === slug)
  if (extra) return perollaProducts.filter(p => p[extra.field])
  const name = CAT_ORDER.find(n => catSlug(n) === slug) || (slug === 'conjuntos' ? 'Conjunto' : null)
  if (name) return perollaProducts.filter(p => p.categoria === name)
  return []
}

export function getCatName(slug) {
  const extra = EXTRA_CATS.find(c => c.slug === slug)
  if (extra) return extra.name
  return CAT_ORDER.find(n => catSlug(n) === slug) || slug
}
