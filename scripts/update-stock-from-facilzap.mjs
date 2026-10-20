import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

// Buscar todos produtos
const { data: produtos, error } = await supabase
  .from('perolla_products')
  .select('id, nome, disponivel, estoque')

if (error) {
  console.error('Erro ao buscar produtos:', error)
  process.exit(1)
}

console.log(`Total de produtos: ${produtos.length}`)

// Atualizar estoque baseado em disponibilidade
// Produtos disponíveis = estoque 5 (quantidade padrão razoável)
// Produtos indisponíveis = estoque 0
let updated = 0

for (const p of produtos) {
  const novoEstoque = p.disponivel ? 5 : 0

  if (p.estoque !== novoEstoque) {
    const { error: updateErr } = await supabase
      .from('perolla_products')
      .update({ estoque: novoEstoque })
      .eq('id', p.id)

    if (updateErr) {
      console.error(`❌ Erro ao atualizar ${p.nome}: ${updateErr.message}`)
    } else {
      console.log(`✅ ${p.nome}: estoque ${p.estoque} → ${novoEstoque}`)
      updated++
    }
  }
}

console.log(`\n✨ ${updated} produtos atualizados`)
