import Hero from '../components/home/Hero'
import CategoryCarousel from '../components/home/CategoryCarousel'
import ProductSection from '../components/home/ProductSection'
import SocialProof from '../components/home/SocialProof'
import BrandStory from '../components/home/BrandStory'
import { products, collections } from '../data/mockData'

export default function Home() {
  const byCollection = (slug) => {
    const col = collections.find(c => c.slug === slug)
    return col ? products.filter(p => p.collection_id === col.id) : []
  }

  return (
    <>
      <Hero />
      <CategoryCarousel />
      <ProductSection title="Minimalista" products={byCollection('minimalista')} viewAllHref="/colecao/minimalista" />
      <ProductSection title="Clássica" products={byCollection('classica')} viewAllHref="/colecao/classica" />
      <SocialProof />
      <ProductSection title="Boêmia" products={byCollection('bohemia')} viewAllHref="/colecao/bohemia" />
      <ProductSection title="Contemporânea" products={byCollection('contemporanea')} viewAllHref="/colecao/contemporanea" />
      <BrandStory />
    </>
  )
}
