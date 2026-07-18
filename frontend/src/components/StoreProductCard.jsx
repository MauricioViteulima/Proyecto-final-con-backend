import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'
import BorderTrail from './BorderTrail'
import FavoriteButton from './FavoriteButton'
import GlowEffect from './GlowEffect'
import ProgressiveBlur from './ProgressiveBlur'

export default function StoreProductCard({ product }) {
  const { addToCart } = useApp()
  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#171a1a] transition hover:-translate-y-1 hover:border-[#ff4b00]/25">
      <BorderTrail />
      <div className="relative z-0 min-h-[300px] overflow-hidden bg-black">
        <Link to={`/store/product/${product.id}`} className="absolute inset-0 block">
          <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={product.name} />
        </Link>
        <div className="absolute right-3 top-3">
          <FavoriteButton id={product.id} />
        </div>
        <ProgressiveBlur className="absolute bottom-0 left-0 h-[56%] w-full" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#ff9b72]">ULIMA STORE</p>
          <h3 className="mt-1 line-clamp-2 min-h-12 text-base font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">{product.name}</h3>
        </div>
      </div>
      <div className="relative z-0 space-y-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-[#ff7a3d]">{formatPrice(product.price)}</span>
          <span className="text-xs text-slate-400">Stock {product.stock}</span>
        </div>
        <div className="glow-button">
          <GlowEffect />
          <button onClick={() => addToCart(product)} className="relative inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#ff4b00] bg-[#171a1a] px-3 py-2 text-sm font-semibold text-[#ff9b72] outline outline-1 outline-white/5 transition hover:border-[#ff7a3d] hover:text-white">
            <ShoppingCart size={16} /> Comprar
          </button>
        </div>
      </div>
    </article>
  )
}
