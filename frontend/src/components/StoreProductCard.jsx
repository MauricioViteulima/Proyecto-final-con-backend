import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'
import FavoriteButton from './FavoriteButton'

export default function StoreProductCard({ product }) {
  const { addToCart } = useApp()
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-[#171a1a] transition hover:-translate-y-1 hover:border-[#ff4b00]/70">
      <Link to={`/store/product/${product.id}`} className="block aspect-[4/3] overflow-hidden bg-black">
        <img className="h-full w-full object-cover transition duration-500 hover:scale-105" src={product.image} alt={product.name} />
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#ff9b72]">ULIMA STORE</p>
            <h3 className="mt-1 min-h-12 text-base font-bold">{product.name}</h3>
          </div>
          <FavoriteButton id={product.id} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-[#ff7a3d]">{formatPrice(product.price)}</span>
          <span className="text-xs text-slate-400">Stock {product.stock}</span>
        </div>
       <button onClick={() => addToCart(product)} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#ff4b00] px-3 py-2 text-sm font-semibold text-[#ff7a3d] transition hover:bg-[#ff4b00] hover:text-white">
          <ShoppingCart size={16} /> Comprar
        </button>
      </div>
    </article>
  )
}
