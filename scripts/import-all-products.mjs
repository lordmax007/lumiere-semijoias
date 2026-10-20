import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Carregar JSON local
const jsonPath = 'src/data/perolla-products.json'
const produtos = JSON.parse(readFileSync(jsonPath, 'utf8'))

console.log(`Total de produtos no JSON: ${produtos.length}`)

// Buscar produtos existentes por SKU
const { data: existing } = await supabase
  .from('perolla_products')
  .select('id, nome')

const existingNames = new Set(existing?.map(p => p.nome.toLowerCase().trim()) || [])
console.log(`Produtos já existentes: ${existingNames.size}`)

let created = 0
let skipped = 0

for (const p of produtos) {
  const nomeLower = p.nome.toLowerCase().trim()

  if (existingNames.has(nomeLower)) {
    skipped++
    continue
  }

  // Estoque aleatório 30-55
  const estoque = Math.floor(Math.random() * (55 - 30 + 1)) + 30

  const { error } = await supabase
    .from('perolla_products')
    .insert({
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
    console.error(`❌ ${p.nome}: ${error.message}`)
  } else {
    console.log(`✅ ${p.nome}: criado (estoque ${estoque})`)
    created++
    existingNames.add(nomeLower)
  }

  // Rate limit
  if (created % 10 === 0 && created > 0) {
    await new Promise(r => setTimeout(r, 100))
  }
}

console.log(`\n✨ Criados: ${created}, Já existiam: ${skipped}`)
