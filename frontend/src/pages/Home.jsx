import { BookOpen, GraduationCap, Laptop, Shirt, ShoppingBag, Star, UsersRound } from 'lucide-react'
import CategoryCircle from '../components/CategoryCircle'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import StoreProductCard from '../components/StoreProductCard'
import { useApp } from '../context/useApp'

export default function Home() {
  const { marketplaceProducts, storeProducts } = useApp()
  const featured = [...storeProducts.slice(0, 4), ...marketplaceProducts.slice(0, 4)]

  return (
    <div className="space-y-10">
      <Hero />

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Destacados</p>
            <h2 className="text-2xl font-black">Productos oficiales y publicaciones recientes</h2>
          </div>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="glass-panel rounded-lg p-5">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Categorias</p>
          <h2 className="text-2xl font-black">Encuentra lo que necesitas para el ciclo</h2>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <CategoryCircle label="Libros" icon={<BookOpen />} />
          <CategoryCircle label="Tecnologia" icon={<Laptop />} />
          <CategoryCircle label="Servicios" icon={<GraduationCap />} />
          <CategoryCircle label="Store" icon={<ShoppingBag />} />
          <CategoryCircle label="Prendas" icon={<Shirt />} />
          <CategoryCircle label="Favoritos" icon={<Star />} />
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-center gap-3">
          <UsersRound className="text-[#ff7a3d]" />
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">ULIMA Store</p>
            <h2 className="text-2xl font-black">Merchandising oficial listo para comprar</h2>
          </div>
        </div>
        <ProductGrid products={storeProducts.slice(0, 4)} renderItem={(product) => <StoreProductCard key={product.id} product={product} />} />
      </section>
    </div>
  )
}
