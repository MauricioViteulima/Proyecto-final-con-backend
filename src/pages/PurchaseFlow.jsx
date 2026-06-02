import { ArrowLeft, MessageCircle, Dot} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

export default function PurchaseFlow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { marketplaceProducts, toggleInterested, isUserInterested, user } = useApp()
  const product = marketplaceProducts.find((item) => item.id === id)

  if (!product) return <EmptyState title="Producto no encontrado" text="La publicacion ya no esta disponible." />

  const userId = user?.id || 'guest'
  const userIsInterested = isUserInterested(product.id, userId)
  const buyerName = user?.name || 'Comprador'
  const statusLabel = userIsInterested ? 'Interesado' : 'En negociación'
  const statusColor = userIsInterested ? 'text-[#10b981]' : 'text-[#ff9b72]'

  const handleContactSeller = () => {
    if (!userIsInterested) {
      toggleInterested(product.id, userId)
    }
    const waNumber = (product.whatsapp || '').replace(/\D/g, '')
    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(
        `Hola, estoy interesado en tu publicación "${product.title}" en el Marketplace de ULIMA.`,
      )}`,
      '_blank'
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Sala de Entrega</p>
        <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="rounded-md border border-white/10 p-2 hover:bg-white/10">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-black">Acordar compra presencial</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-400">
            Contacta al vendedor por WhatsApp para acordar los detalles de la entrega. Tu interés se registrará automáticamente.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-lg p-6 space-y-6">
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
            <button
              onClick={handleContactSeller}
              className="block w-full text-left"
            >
              <div className="relative overflow-hidden rounded-lg border-2 border-[#10b981] bg-gradient-to-r from-[#10b981]/20 to-[#059669]/10 p-6 hover:from-[#10b981]/30 hover:to-[#059669]/20 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#10b981] mb-1">Abre WhatsApp</p>
                    <p className="text-slate-300 font-bold flex items-center gap-2">
                      <MessageCircle size={20} />Contactar a {product.sellerName}
                    </p>
                  </div>
                  <div className="text-4xl">→</div>
                </div>
              </div>
            </button>
          </div>
        </section>

        <aside className="glass-panel h-fit rounded-lg p-5">
          <h2 className="text-xl font-black">Datos de transacción</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Comprador:</span> {buyerName}
            </p>
            <p>
              <span className="text-slate-500">Vendedor:</span> {product.sellerName}
            </p>
            <p>
              <span className="text-slate-500">Estado:</span>{' '}
              <span className={`font-bold ${statusColor}`}>{statusLabel}</span>
            </p>
          </div>

          <div className="mt-5 rounded-lg border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-300">
            <p className="font-semibold text-slate-200">Cómo usar esta sala</p>
            <ol className="mt-3 space-y-2 list-decimal pl-5 text-slate-400">
              <p><Dot size={16} className="inline-block mr-2" />Al contactar al vendedor por WhatsApp, tu interés se registra automáticamente.</p>
              <p><Dot size={16} className="inline-block mr-2" />Negocia los detalles de la entrega presencial con el vendedor.</p>
              <p><Dot size={16} className="inline-block mr-2" />Completa la entrega en persona y confirma la transacción.</p>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}
