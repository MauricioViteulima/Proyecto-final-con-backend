import { PackageCheck, ShoppingCart } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import FavoriteButton from '../components/FavoriteButton'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

const Product3DViewer = lazy(() => import('../components/Product3DViewer'))

export default function StoreDetail() {
  const { id } = useParams()
  const { storeProducts, addToCart } = useApp()
  const product = storeProducts.find((item) => item.id === id)

  if (!product) return <EmptyState title="Producto oficial no encontrado" />

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#171a1a]">
          <img className="h-[420px] w-full object-cover" src={product.image} alt={product.name} />
        </div>
        <Suspense fallback={<div className="grid h-[320px] place-items-center rounded-lg border border-white/10 bg-[#111313] text-sm text-slate-400">Cargando visor 3D...</div>}>
          <Product3DViewer modelType={product.modelType} />
        </Suspense>
      </div>
      <section className="glass-panel rounded-lg p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">ULIMA STORE · {product.category}</p>
        <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
        <p className="mt-3 text-3xl font-black text-[#ff7a3d]">{formatPrice(product.price)}</p>
        <p className="mt-5 leading-7 text-slate-300">{product.description}</p>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <PackageCheck size={17} className="text-[#ff7a3d]" /> Stock simulado disponible: {product.stock}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => addToCart(product)} className="flex-1">
            <ShoppingCart size={18} /> Agregar al carrito
          </Button>
          <FavoriteButton id={product.id} label />
        </div>
      </section>
    </div>
  )
}
