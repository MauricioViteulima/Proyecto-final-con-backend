import { Minus, Plus, Trash2 } from 'lucide-react'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

export default function CartPage() {
  const { cartDetails, cartTotal, changeCartQuantity, removeFromCart, checkout } = useApp()

  if (!cartDetails.length) return <EmptyState title="Tu carrito esta vacio" text="Agrega productos oficiales de ULIMA STORE para simular la compra." />

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <h1 className="text-3xl font-black">Carrito ULIMA STORE</h1>
        {cartDetails.map((item) => (
          <article key={item.id} className="glass-panel grid gap-4 rounded-lg p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
            <img className="h-28 w-full rounded-md object-cover sm:w-28" src={item.image} alt={item.name} />
            <div>
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p className="text-sm text-slate-400">{item.category}</p>
              <p className="mt-2 font-black text-[#ff7a3d]">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-white/10 p-2" onClick={() => changeCartQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button className="rounded-md border border-white/10 p-2" onClick={() => changeCartQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
              <button className="rounded-md border border-white/10 p-2 text-red-300" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
            </div>
          </article>
        ))}
      </section>
      <aside className="glass-panel h-fit rounded-lg p-5">
        <h2 className="text-xl font-black">Resumen</h2>
        <div className="mt-4 space-y-3 border-b border-white/10 pb-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
          <div className="flex justify-between"><span>Entrega campus</span><span>{formatPrice(0)}</span></div>
        </div>
        <div className="mt-4 flex justify-between text-xl font-black">
          <span>Total</span><span className="text-[#ff7a3d]">{formatPrice(cartTotal)}</span>
        </div>
        <Button onClick={checkout} className="mt-5 w-full">Finalizar compra</Button>
      </aside>
    </div>
  )
}
