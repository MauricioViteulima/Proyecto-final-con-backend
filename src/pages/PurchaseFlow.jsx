import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

export default function PurchaseFlow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { marketplaceProducts, toggleInterested, isUserInterested, user } = useApp()
  const product = marketplaceProducts.find((item) => item.id === id)
  const [clicked, setClicked] = useState(false)

  if (!product) return <EmptyState title="Producto no encontrado" text="La publicacion ya no esta disponible." />

  const userId = user?.id || 'guest'
  const userIsInterested = isUserInterested(product.id, userId)

  const handleToggleInterested = () => {
    toggleInterested(product.id, userId)
    setClicked(true)
    setTimeout(() => setClicked(false), 500)
  }

  const waNumber = (product.whatsapp || '').replace(/\D/g, '')

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="rounded-md border border-white/10 p-2 hover:bg-white/10">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black">Acordar compra</h1>
      </div>

      <div className="glass-panel rounded-lg p-6 space-y-6">
        <div>
          <h3 className="font-bold text-slate-300 mb-2">Producto</h3>
          <article className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <img className="h-24 w-24 rounded-md object-cover" src={product.image} alt={product.title} />
            <div className="flex-1">
              <h4 className="font-bold">{product.title}</h4>
              <p className="text-sm text-slate-400">{product.category}</p>
              <p className="text-lg font-black text-[#ff7a3d] mt-2">{formatPrice(product.price)}</p>
            </div>
          </article>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-300">Paso 1: Contacta y acuerda con el vendedor</h3>
          <a
            className="block"
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
              `Hola, estoy interesado en tu publicación "${product.title}" en el Marketplace de ULIMA.`,
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-[#10b981] bg-gradient-to-r from-[#10b981]/20 to-[#059669]/10 p-6 hover:from-[#10b981]/30 hover:to-[#059669]/20 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#10b981] mb-1">Abre WhatsApp</p>
                  <p className="text-slate-300 font-bold flex items-center gap-2">
                    <span>💬</span> Contactar a {product.sellerName}
                  </p>
                </div>
                <div className="text-4xl">→</div>
              </div>
            </div>
          </a>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-slate-300">Paso 2: Marca tu interés</h3>
          <Button
            onClick={handleToggleInterested}
            className={`w-full transition ${
              userIsInterested ? 'bg-[#ff4b00] hover:bg-[#ff6b1a]' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {userIsInterested ? '✓ Interesado' : 'Interesado en el producto'}
          </Button>
          {userIsInterested && (
            <p className="text-xs text-[#10b981]">✓ Tu interés fue registrado. Ahora {product.sellerName} sabe que te interesa este producto.</p>
          )}
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
          <p className="text-xs text-slate-400">
            <strong>Nota:</strong> Después de contactar al vendedor por WhatsApp y acordar los detalles, vuelve aquí y marca tu interés. El vendedor podrá ver cuántas personas están interesadas y confirmará la compra presencial cuando concrete la venta.
          </p>
        </div>
      </div>
    </div>
  )
}
