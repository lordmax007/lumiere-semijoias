import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').max(254),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(128),
})

export const registerSchema = loginSchema

export const contactSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório').max(100),
  email: z.string().email('E-mail inválido').max(254),
  assunto: z.string().max(200).optional(),
  mensagem: z.string().min(1, 'Mensagem obrigatória').max(1000),
})

const CATEGORIAS = ['Brincos','Anéis','Colares','Correntes','Pulseiras','Braceletes','Conjuntos','Choker','Aço inoxidável','Masculina','Infantil']

export const productSchema = z.object({
  nome: z.string().min(1).max(200),
  preco: z.number().positive(),
  categoria: z.enum(CATEGORIAS),
  descricao: z.string().max(500).optional(),
  disponivel: z.boolean(),
})
