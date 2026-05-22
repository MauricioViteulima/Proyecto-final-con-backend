import ProductGrid from '../components/ProductGrid'
import { useApp } from '../context/useApp'

export default function Favorites() {
  const { favorites, allProducts } = useApp()
  const products = allProducts.filter((product) => favorites.includes(product.id))

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Favoritos</p>
        <h1 className="text-3xl font-black">Guardados para revisar despues</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
