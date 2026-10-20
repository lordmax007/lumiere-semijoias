import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Carregar JSON local
const jsonPath = 'src/data/perolla-products.json'
const produtos = JSON.parse(readFileSync(jsonPath, 'utf8'))

console.log(`Total de produtos no JSON: ${produtos.length}`)

// Produtos esgotados conhecidos (sem foto ou marcados como indisponíveis no JSON)
const esgotados = new Set([
  'Brinco Pérola E Borboleta Cravejada',
  'Brinco',
])

let updated = 0

for (const p of produtos) {
  const disponivel = !esgotados.has(p.nome)
  const estoque = disponivel ? 5 : 0

  // Buscar se produto já existe no banco (por nome aproximado)
  const { data: existing } = await supabase
    .from('perolla_products')
    .select('id, nome')
    .ilike('nome', `%${p.nome.substring(0, 20)}%`)
    .limit(1)

  if (existing && existing.length > 0) {
    // Atualizar estoque
    const { error } = await supabase
      .from('perolla_products')
      .update({ estoque, disponivel })
      .eq('id', existing[0].id)

    if (error) {
      console.error(`❌ ${p.nome}: ${error.message}`)
    } else {
      console.log(`✅ ${p.nome}: estoque → ${estoque}`)
      updated++
    }
  } else {
    // Produto não existe no banco ainda, criar
    const { error } = await supabase
      .from('perolla_products')
      .insert({
        nome: p.nome,
        categoria: p.categoria,
        preco: p.preco,
        descricao: p.descricao || '',
        imagens: p.imagens || [],
        disponivel,
        estoque,
        infantil: false,
        aco_inoxidavel: false,
        masculina: false,
      })

    if (error) {
      console.error(`❌ Criar ${p.nome}: ${error.message}`)
    } else {
      console.log(`➕ ${p.nome}: criado com estoque ${estoque}`)
      updated++
    }
  }

  // Rate limit (não sobrecarregar)
  if (updated % 10 === 0) {
    await new Promise(r => setTimeout(r, 100))
  }
}

console.log(`\n✨ ${updated} produtos processados`)
