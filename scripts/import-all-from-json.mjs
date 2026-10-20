import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Carregar JSON
const produtos = JSON.parse(readFileSync('src/data/perolla-products.json', 'utf8'))

console.log(`Total de produtos no JSON: ${produtos.length}`)

// Buscar produtos existentes (só os infantis que foram adicionados manualmente)
const { data: existing } = await supabase
  .from('perolla_products')
  .select('id, nome, infantil')

// IDs dos infantis para não mexer
const infantilIds = new Set(existing?.filter(p => p.infantil).map(p => p.id) || [])
console.log(`Produtos infantis para manter: ${infantilIds.size}`)

// Deletar produtos NÃO-infantis para reimportar tudo limpo
const { data: toDelete } = await supabase
  .from('perolla_products')
  .select('id')
  .eq('infantil', false)

if (toDelete && toDelete.length > 0) {
  console.log(`Deletando ${toDelete.length} produtos antigos (mantendo infantis)...`)
  for (const p of toDelete) {
    await supabase.from('perolla_products').delete().eq('id', p.id)
  }
}

let created = 0

console.log('\nImportando todos os 186 produtos...')

for (const p of produtos) {
  const estoque = Math.floor(Math.random() * (55 - 30 + 1)) + 30

  const { error } = await supabase
    .from('perolla_products')
    .insert({
      // ID será gerado automaticamente (UUID)
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
    created++
    if (created % 20 === 0) {
      console.log(`  → ${created}/${produtos.length} produtos importados`)
    }
  }

  // Rate limit
  if (created % 20 === 0) {
    await new Promise(r => setTimeout(r, 200))
  }
}

console.log(`\n✨ ${created} produtos importados`)
console.log(`Total no banco: ${infantilIds.size} infantis + ${created} do JSON = ${infantilIds.size + created}`)
