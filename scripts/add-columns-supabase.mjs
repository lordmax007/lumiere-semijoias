import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  db: { schema: 'public' }
})

const sql = `
ALTER TABLE perolla_products
  ADD COLUMN IF NOT EXISTS infantil boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS aco_inoxidavel boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS masculina boolean DEFAULT false;
`

const { data, error } = await supabase.rpc('exec_sql', { query: sql })

if (error) {
  console.error('❌ Erro:', error.message)
  console.log('\nVocê precisa executar esse SQL manualmente no Supabase Dashboard:')
  console.log(sql)
} else {
  console.log('✅ Colunas adicionadas com sucesso!')
}
