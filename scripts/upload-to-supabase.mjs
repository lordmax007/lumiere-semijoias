import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'

const SUPABASE_URL = 'https://gtksdnxcakkuobtylibj.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0a3NkbnhjYWtrdW9idHlsaWJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk5MTU1OCwiZXhwIjoyMTA2NTY3NTU4fQ.1eo5XI7F_FgHHpi_0fAtgfYZ7e4_gXnEITBbbJENmmA'
const BUCKET = 'produtos'
const IMGS_DIR = new URL('../public/imgs/perolla', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
const JSON_PATH = new URL('../src/data/perolla-products.json', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const MIME = { '.webp': 'image/webp', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png' }

const files = readdirSync(IMGS_DIR)
console.log(`Total de imagens: ${files.length}`)

const urlMap = {} // local path → supabase url
let ok = 0, fail = 0

for (const file of files) {
  const ext = extname(file).toLowerCase()
  const mime = MIME[ext] || 'image/webp'
  const localPath = join(IMGS_DIR, file)
  const storagePath = `perolla/${file}`
  const localKey = `/imgs/perolla/${file}`

  const bytes = readFileSync(localPath)
  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, bytes, {
    contentType: mime,
    upsert: true,
  })

  if (error) {
    console.error(`❌ ${file}: ${error.message}`)
    fail++
    continue
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)
  urlMap[localKey] = data.publicUrl
  ok++
  if (ok % 20 === 0) console.log(`  → ${ok}/${files.length} enviadas`)
}

console.log(`\nConcluído: ${ok} ok, ${fail} falhas`)

// Atualiza JSON
const products = JSON.parse(readFileSync(JSON_PATH, 'utf8'))
let updated = 0
for (const p of products) {
  p.imagens = p.imagens.map(img => {
    const newUrl = urlMap[img]
    if (newUrl) { updated++; return newUrl }
    return img
  })
}
writeFileSync(JSON_PATH, JSON.stringify(products, null, 2))
console.log(`JSON atualizado: ${updated} referências trocadas`)
