import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'
import FavoriteButton from './FavoriteButton'

export default function ProductCard({ product }) {
  const isStore = product.type === 'store'
  const title = isStore ? product.name : product.title
  const href = isStore ? `/store/product/${product.id}` : `/marketplace/product/${product.id}`

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-[#171a1a] transition hover:-translate-y-1 hover:border-[#ff4b00]/70">
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={title} />
        <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-[#ff9b72]">
          {isStore ? 'ULIMA STORE' : 'ALUMNOS'}
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton id={product.id} />
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{product.category}</p>
          <h3 className="mt-1 line-clamp-2 min-h-12 text-base font-bold text-white">{title}</h3>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-black text-[#ff7a3d]">{formatPrice(product.price)}</span>
          {!isStore && <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{product.condition}</span>}
        </div>
        {!isStore && (
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400">
            <span>{product.sellerName}</span>
            <span className="inline-flex items-center gap-1 text-amber-300">
              <Star size={14} fill="currentColor" /> {product.sellerReputation}
            </span>
          </div>
        )}
        <Link to={href} className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#ff4b00] px-3 py-2 text-sm font-semibold text-[#ff7a3d] transition hover:bg-[#ff4b00] hover:text-white">
          Ver detalle <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}
