import { useState, useEffect } from 'react'
import { supabase, isConfigured } from '../lib/supabase'
import { perollaProducts } from '../data/perollaData'

export function usePerollaProducts() {
  const [extra, setExtra] = useState([])
  const [loading, setLoading] = useState(isConfigured)

  useEffect(() => {
    if (!isConfigured) return
    supabase
      .from('perolla_products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setExtra(data.map(p => ({
          id: p.id,
          nome: p.nome,
          preco: Number(p.preco),
          descricao: p.descricao || '',
          categoria: p.categoria,
          imagens: p.imagens || [],
          disponivel: p.disponivel,
          infantil: p.infantil || false,
          aco_inoxidavel: p.aco_inoxidavel || false,
          masculina: p.masculina || false,
        })))
        setLoading(false)
      })
  }, [])

  return { products: [...extra, ...perollaProducts], loading }
}
