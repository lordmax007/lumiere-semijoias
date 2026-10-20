import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Carregar JSON
const produtos = JSON.parse(readFileSync('src/data/perolla-products.json', 'utf8'))

console.log(`Total de produtos no JSON: ${produtos.length}`)

// Buscar produtos existentes
const { data: existing } = await supabase
  .from('perolla_products')
  .select('id, nome')

const existingIds = new Set(existing?.map(p => p.id) || [])
console.log(`Produtos já existentes: ${existingIds.size}`)

let created = 0
let skipped = 0

for (const p of produtos) {
  // Pular infantis (já foram importados manualmente)
  if (existingIds.has(p.id)) {
    skipped++
    continue
  }

  const estoque = Math.floor(Math.random() * (55 - 30 + 1)) + 30

  const { error } = await supabase
    .from('perolla_products')
    .insert({
      id: p.id, // Usar ID original do FacilZap
      nome: p.nome,
      categoria: p.categoria,
      preco: p.preco,
      descricao: p.descricao || '',
      imagens: p.imagens || [],
      disponivel: true,
      estoque,
      infantil: false,
      aco_inoxidavel: false,
      masculina: false,
    })

  if (error) {
    console.error(`❌ ${p.nome} (${p.id}): ${error.message}`)
  } else {
    console.log(`✅ ${p.nome} (${p.id}): criado - estoque ${estoque}`)
    created++
  }

  // Rate limit
  if (created % 20 === 0 && created > 0) {
    await new Promise(r => setTimeout(r, 200))
  }
}

console.log(`\n✨ Criados: ${created}, Já existiam: ${skipped}`)
console.log(`Total no banco agora: ${existingIds.size + created}`)
