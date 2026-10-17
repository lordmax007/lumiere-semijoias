import { z } from 'zod'

// Strip HTML tags to prevent stored XSS
const sanitize = (s) => s.replace(/<[^>]*>/g, '').trim()
const safeStr = z.string().transform(sanitize)

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').max(254),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(128),
})

// Stronger password for registration: min 8, at least one number
export const registerSchema = z.object({
  email: z.string().email('E-mail inválido').max(254),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .max(128)
    .regex(/\d/, 'Deve conter ao menos um número'),
})

export const contactSchema = z.object({
  nome: safeStr.pipe(z.string().min(1, 'Nome obrigatório').max(100)),
  email: z.string().email('E-mail inválido').max(254),
  assunto: safeStr.pipe(z.string().max(200)).optional(),
  mensagem: safeStr.pipe(z.string().min(1, 'Mensagem obrigatória').max(1000)),
})

// Open category list — new categories created via admin are allowed
export const productSchema = z.object({
  nome: safeStr.pipe(z.string().min(1).max(200)),
  preco: z.number().positive(),
  categoria: safeStr.pipe(z.string().min(1).max(100)),
  descricao: safeStr.pipe(z.string().max(500)).optional(),
  disponivel: z.boolean(),
  estoque: z.number().int().min(0).optional(),
})

// Upload validation: allowed MIME types and max size (5 MB)
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024

// Magic-byte prefixes for JPEG, PNG, WebP
const MAGIC = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png':  [0x89, 0x50, 0x4E, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46], // RIFF (WebP container)
}

export async function validateImageFile(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return false
  if (file.size > MAX_IMAGE_SIZE) return false
  // Check magic bytes
  const buf = await file.slice(0, 8).arrayBuffer()
  const bytes = new Uint8Array(buf)
  const expected = MAGIC[file.type]
  return expected.every((b, i) => bytes[i] === b)
}
