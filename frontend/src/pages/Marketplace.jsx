import { PlusCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import Button from '../components/Button'
import FilterBar from '../components/FilterBar'
import MarketplaceProductCard from '../components/MarketplaceProductCard'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import { useApp } from '../context/useApp'
import { categories } from '../data/mockProducts'

export default function Marketplace() {
  const { marketplaceProducts } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')

  const filtered = useMemo(
    () =>
      marketplaceProducts.filter((product) => {
        const text = `${product.title} ${product.description} ${product.sellerName}`.toLowerCase()
        return text.includes(query.toLowerCase()) && (!category || product.category === category) && (!condition || product.condition === condition)
      }),
    [marketplaceProducts, query, category, condition],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">ULIMA Marketplace</p>
          <h1 className="text-3xl font-black">Publicaciones de alumnos</h1>
          <p className="mt-2 text-slate-400">Libros, tecnologia, servicios y articulos usados dentro del campus.</p>
        </div>
        <Button to="/marketplace/publish">
          <PlusCircle size={18} /> Publicar producto
        </Button>
      </div>
      <div className="glass-panel grid gap-3 rounded-lg p-4 lg:grid-cols-[1fr_auto]">
        <SearchBar value={query} onChange={setQuery} placeholder="Buscar por producto, descripcion o vendedor" />
        <FilterBar category={category} setCategory={setCategory} condition={condition} setCondition={setCondition} categories={categories.marketplace} conditions={categories.conditions} />
      </div>
      <ProductGrid products={filtered} renderItem={(product) => <MarketplaceProductCard key={product.id} product={product} />} />
    </div>
  )
}
