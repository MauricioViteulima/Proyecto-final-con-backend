import { MapPin, ShieldCheck, Star } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import FavoriteButton from '../components/FavoriteButton'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

export default function MarketplaceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { marketplaceProducts, toggleInterested, isUserInterested, user } = useApp()
  const product = marketplaceProducts.find((item) => item.id === id)

  if (!product) return <EmptyState title="Producto no encontrado" text="La publicacion ya no esta disponible." />

  const userId = user?.id || 'guest'
  const userIsInterested = isUserInterested(product.id, userId)
  const isOwnProduct = user && product.sellerId === user.id

  const handleAcordarCompra = () => navigate(`/purchase-flow/${product.id}`)

  const handleToggleInterested = (e) => {
    e.stopPropagation()
    toggleInterested(product.id, userId)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#171a1a]">
        <img className="h-full min-h-[360px] w-full object-cover" src={product.image} alt={product.title} />
      </div>
      <section className="glass-panel rounded-lg p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">{product.category} · {product.condition}</p>
        <h1 className="mt-2 text-4xl font-black">{product.title}</h1>
        <p className="mt-3 text-3xl font-black text-[#ff7a3d]">{formatPrice(product.price)}</p>
        <p className="mt-5 leading-7 text-slate-300">{product.description}</p>

        <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck size={17} className="text-[#ff7a3d]" /> Vendedor: {product.sellerName}
          </p>
          <p className="flex items-center gap-2 text-sm text-amber-300">
            <Star size={17} fill="currentColor" /> Reputacion {product.sellerReputation}/5
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <MapPin size={17} className="text-[#ff7a3d]" /> Entrega sugerida: {product.location}
          </p>
        </div>

        <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-slate-300">Interesados: <span className="font-bold text-[#10b981]">{product.interestedCount || 0}</span></p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {isOwnProduct ? (
            <div className="flex-1 rounded-md border border-slate-600 px-3 py-2 text-center text-sm text-slate-400">
              Tu publicación
            </div>
          ) : userIsInterested ? (
            <Button onClick={handleToggleInterested} className="flex-1 bg-[#ff4b00] hover:bg-[#ff6b1a]">
              ✓ Interesado
            </Button>
          ) : (
            <Button onClick={handleAcordarCompra} className="flex-1">
              Acordar compra
            </Button>
          )}
          <FavoriteButton id={product.id} label />
        </div>
      </section>
    </div>
  )
}
