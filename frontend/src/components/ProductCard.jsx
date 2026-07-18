import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/format'
import BorderTrail from './BorderTrail'
import FavoriteButton from './FavoriteButton'
import GlowEffect from './GlowEffect'
import ProgressiveBlur from './ProgressiveBlur'

export default function ProductCard({ product }) {
  const isStore = product.type === 'store'
  const title = isStore ? product.name : product.title
  const href = isStore ? `/store/product/${product.id}` : `/marketplace/product/${product.id}`

  return (
    <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#171a1a] transition hover:-translate-y-1 hover:border-[#ff4b00]/25">
      <BorderTrail />
      <div className="relative z-0 min-h-[300px] overflow-hidden bg-black">
        <img className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={product.image} alt={title} />
        <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-[#ff9b72]">
          {isStore ? 'ULIMA STORE' : 'ALUMNOS'}
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton id={product.id} />
        </div>
        <ProgressiveBlur className="absolute bottom-0 left-0 h-[56%] w-full" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#8eb4e6]">{product.category}</p>
          <h3 className="mt-1 line-clamp-2 min-h-12 text-base font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">{title}</h3>
        </div>
      </div>
      <div className="relative z-0 space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-black text-[#ff7a3d]">{formatPrice(product.price)}</span>
          {!isStore && <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{product.condition}</span>}
        </div>
        {!isStore && (
          <div className="space-y-2 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{product.sellerName}</span>
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Star size={14} fill="currentColor" /> {product.sellerReputation}
              </span>
            </div>
            {(product.interestedCount || 0) > 0 && (
              <div className="text-xs font-semibold text-[#10b981]">👥 {product.interestedCount} interesado{product.interestedCount !== 1 ? 's' : ''}</div>
            )}
          </div>
        )}
        {product.status === 'vendido' ? (
          <button disabled className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-500 bg-slate-900/50 cursor-not-allowed">
            Vendido
          </button>
        ) : (
          <div className="glow-button">
            <GlowEffect />
            <Link to={href} className="relative inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#ff4b00] bg-[#171a1a] px-3 py-2 text-sm font-semibold text-[#ff9b72] outline outline-1 outline-white/5 transition hover:border-[#ff7a3d] hover:text-white">
              Ver detalle <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
