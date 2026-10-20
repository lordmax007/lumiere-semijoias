import raw from './perolla-products.json'

const normalize = (cat) => cat === 'Conjuntos' ? 'Conjunto' : cat

// Corrige caminhos de imagem para funcionar tanto no Netlify quanto no GitHub Pages
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
const fixImg = (path) => path ? BASE + path : path

export const perollaProducts = raw.map(p => ({
  ...p,
  categoria: normalize(p.categoria),
  imagens: (p.imagens || []).map(fixImg),
}))

export const catSlug = (cat) =>
  cat.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-')

// Categorias originais — image é configurável: troque o path para mudar a foto da categoria
const CAT_IMAGES = {
  'Brincos':   '/imgs/categorias/brincos.webp',
  'Anéis':     '/imgs/categorias/aneis.webp',
  'Colares':   '/imgs/categorias/colares.webp',
  'Correntes': '/imgs/categorias/correntes.webp',
  'Pulseiras': '/imgs/categorias/pulseiras.webp',
  'Braceletes':'/imgs/categorias/braceletes.webp',
  'Conjunto':  '/imgs/categorias/conjuntos.webp',
  'Choker':    '/imgs/categorias/choker.webp',
}

const CAT_ORDER = ['Brincos', 'Anéis', 'Colares', 'Correntes', 'Pulseiras', 'Braceletes', 'Conjunto', 'Choker']

export const perollaCollections = CAT_ORDER.map(name => ({
  name, slug: catSlug(name),
  image: CAT_IMAGES[name] || null,
  count: perollaProducts.filter(p => p.categoria === name).length,
  extra: false,
})).filter(c => c.count > 0)

// Categorias extras — image configurável; null = fallback com inicial dourada
export const EXTRA_CATS = [
  { name: 'Aço inoxidável', slug: 'aco-inoxidavel', field: 'aco_inoxidavel', image: 'https://gtksdnxcakkuobtylibj.supabase.co/storage/v1/object/public/produtos/perolla/4446744-1.webp' },
  { name: 'Masculina',      slug: 'masculina',       field: 'masculina',      image: null },
  { name: 'Infantil',       slug: 'infantil',        field: 'infantil',       image: null },
]

export const perollaExtraCollections = EXTRA_CATS.map(c => ({
  ...c,
  count: perollaProducts.filter(p => p[c.field]).length,
  extra: true,
})).filter(c => c.count > 0)

// Resolve slug → lista de produtos (original ou extra)
export function getProductsBySlug(slug, products = perollaProducts) {
  const extra = EXTRA_CATS.find(c => c.slug === slug)
  if (extra) return products.filter(p => p[extra.field])
  const name = CAT_ORDER.find(n => catSlug(n) === slug) || (slug === 'conjuntos' ? 'Conjunto' : null)
  if (name) return products.filter(p => p.categoria === name)
  return []
}

export function getCatName(slug) {
  const extra = EXTRA_CATS.find(c => c.slug === slug)
  if (extra) return extra.name
  return CAT_ORDER.find(n => catSlug(n) === slug) || slug
}
