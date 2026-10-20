import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'
const BUCKET = 'produtos'
const FOLDER = 'C:\\Users\\eliez\\Downloads\\pasta de fotos do site'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const products = [
  { file: '10,00.jpeg', nome: 'Brinco Ursinho Dourado', preco: 10, categoria: 'Brincos', infantil: true, estoque: 10 },
  { file: '10,00 mais brincos.jpeg', nome: 'Mix Brincos Infantil (Elefante, Estrela, Passarinho)', preco: 10, categoria: 'Brincos', infantil: true, estoque: 6 },
  { file: 'Brincos 10,00.jpeg', nome: 'Coleção Floresta Encantada', preco: 10, categoria: 'Brincos', infantil: true, estoque: 6 },
  { file: '23,00 biju fina.jpeg', nome: 'Conjunto Vaquinha Rosê (Colar + Brincos)', preco: 23, categoria: 'Conjunto', infantil: true, estoque: 1 },
  { file: '34,00 aço.jpeg', nome: 'Conjunto Panda Aço Inox 316L (Colar + Brincos)', preco: 34, categoria: 'Conjunto', infantil: true, aco_inoxidavel: true, estoque: 1 },
]

for (const p of products) {
  console.log(`\nProcessando: ${p.nome}`)

  // Upload da imagem
  const localPath = join(FOLDER, p.file)
  const ext = p.file.split('.').pop()
  const storagePath = `perolla/infantil-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const bytes = readFileSync(localPath)
  const { error: uploadErr } = await supabase.storage.from(BUCKET).upload(storagePath, bytes, {
    contentType: ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : 'image/webp',
    upsert: true,
  })

  if (uploadErr) {
    console.error(`❌ Erro no upload: ${uploadErr.message}`)
    continue
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  console.log(`✅ Upload: ${data.publicUrl}`)

  // Inserir produto no banco
  const payload = {
    nome: p.nome,
    categoria: p.categoria,
    preco: p.preco,
    estoque: p.estoque,
    infantil: p.infantil,
    aco_inoxidavel: p.aco_inoxidavel || false,
    disponivel: true,
    imagens: [data.publicUrl],
  }

  const { error: dbErr } = await supabase.from('perolla_products').insert(payload)

  if (dbErr) {
    console.error(`❌ Erro no banco: ${dbErr.message}`)
  } else {
    console.log(`✅ Produto criado`)
  }
}

console.log('\n✨ Concluído!')
