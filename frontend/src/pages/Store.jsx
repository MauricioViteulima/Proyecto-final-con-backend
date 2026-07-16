import { Gift, Laptop, Package, Shirt, ShoppingBag, ThermometerSun } from 'lucide-react'
import { useMemo, useState } from 'react'
import CategoryCircle from '../components/CategoryCircle'
import FilterBar from '../components/FilterBar'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import StoreProductCard from '../components/StoreProductCard'
import { useApp } from '../context/useApp'
import { categories } from '../data/mockProducts'

const icons = [<ThermometerSun />, <Shirt />, <Laptop />, <Package />, <ShoppingBag />, <Gift />]

export default function Store() {
  const { storeProducts } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')

  const filtered = useMemo(
    () =>
      storeProducts.filter((product) => {
        const text = `${product.name} ${product.description}`.toLowerCase()
        return text.includes(query.toLowerCase()) && (!category || product.category === category)
      }),
    [storeProducts, query, category],
  )

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-lg border border-white/10 bg-[#151817] p-6 md:p-10">
        <img className="absolute inset-0 h-full w-full object-cover opacity-25" src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=1600&q=80" alt="Tienda universitaria" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Tienda oficial</p>
          <h1 className="mt-2 text-4xl font-black">ULIMA STORE</h1>
          <p className="mt-3 text-slate-300">Merchandising universitario, articulos de oficina, tecnologia y prendas con compra simulada.</p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {categories.store.map((item, index) => (
          <CategoryCircle key={item} label={item} icon={icons[index]} active={category === item} onClick={() => setCategory(category === item ? '' : item)} />
        ))}
      </div>

      <div className="glass-panel grid gap-3 rounded-lg p-4 lg:grid-cols-[1fr_auto]">
        <SearchBar value={query} onChange={setQuery} placeholder="Buscar productos oficiales" />
        <FilterBar category={category} setCategory={setCategory} categories={categories.store} />
      </div>

      <ProductGrid products={filtered} renderItem={(product) => <StoreProductCard key={product.id} product={product} />} />
    </div>
  )
}
