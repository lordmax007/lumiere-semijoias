import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Buscar todos produtos
const { data: produtos } = await supabase
  .from('perolla_products')
  .select('id, nome, infantil, created_at')
  .order('created_at', { ascending: true })

console.log(`Total de produtos: ${produtos.length}`)

// Agrupar por nome (case-insensitive)
const byName = {}
produtos.forEach(p => {
  const key = p.nome.toLowerCase().trim()
  if (!byName[key]) byName[key] = []
  byName[key].push(p)
})

// Identificar duplicados (manter o primeiro, deletar o resto)
const toDelete = []
Object.entries(byName).forEach(([name, prods]) => {
  if (prods.length > 1) {
    // Manter o primeiro, deletar os outros
    const toKeep = prods[0]
    const dups = prods.slice(1)
    console.log(`${name}: ${prods.length} duplicados - manter ${toKeep.id}, deletar ${dups.length}`)
    toDelete.push(...dups.map(p => p.id))
  }
})

console.log(`\nTotal de duplicados para deletar: ${toDelete.length}`)

// Deletar
let deleted = 0
for (const id of toDelete) {
  const { error } = await supabase
    .from('perolla_products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`❌ Erro ao deletar ${id}: ${error.message}`)
  } else {
    deleted++
    if (deleted % 20 === 0) {
      console.log(`  → ${deleted}/${toDelete.length} deletados`)
    }
  }
}

console.log(`\n✨ ${deleted} duplicados deletados`)
console.log(`Produtos únicos restantes: ${produtos.length - deleted}`)
