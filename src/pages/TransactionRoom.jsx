import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import QRGenerator from '../components/QRGenerator'
import QRScanner from '../components/QRScanner'
import EmptyState from '../components/EmptyState'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

export default function TransactionRoom() {
  const { id } = useParams()
  const [mode, setMode] = useState('seller')
  const { transactions, completeTransaction } = useApp()
  const transaction = transactions.find((item) => item.id === id)

  if (!transaction) return <EmptyState title="Transaccion no encontrada" text="Crea una desde el detalle de un producto marketplace." />

  const completed = transaction.status === 'entregado'

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Sala de Entrega</p>
        <h1 className="text-3xl font-black">Confirmacion presencial con QR</h1>
      </div>

      <div className="glass-panel rounded-lg p-2">
        <div className="grid grid-cols-2 gap-2">
          <button className={`rounded-md px-4 py-3 text-sm font-bold ${mode === 'seller' ? 'bg-[#ff4b00] text-white' : 'hover:bg-white/10'}`} onClick={() => setMode('seller')}>Soy vendedor</button>
          <button className={`rounded-md px-4 py-3 text-sm font-bold ${mode === 'buyer' ? 'bg-[#ff4b00] text-white' : 'hover:bg-white/10'}`} onClick={() => setMode('buyer')}>Soy comprador</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-lg p-6">
          {mode === 'seller' ? (
            <div className="text-center">
              <h2 className="text-xl font-black">Muestra este QR al comprador para confirmar la entrega</h2>
              <div className="mt-6"><QRGenerator value={transaction.id} /></div>
              <p className="mt-4 text-sm text-slate-400">ID: {transaction.id}</p>
            </div>
          ) : (
            <div>
              <h2 className="mb-4 text-center text-xl font-black">Escanea el QR del vendedor para confirmar la entrega</h2>
              <QRScanner completed={completed} onSuccess={() => completeTransaction(transaction.id)} />
            </div>
          )}
        </section>

        <aside className="glass-panel h-fit rounded-lg p-5">
          <h2 className="text-xl font-black">Datos de transaccion</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p><span className="text-slate-500">Producto:</span> {transaction.productTitle}</p>
            <p><span className="text-slate-500">Precio:</span> {formatPrice(transaction.price)}</p>
            <p><span className="text-slate-500">Comprador:</span> {transaction.buyer}</p>
            <p><span className="text-slate-500">Vendedor:</span> {transaction.seller}</p>
            <p><span className="text-slate-500">Estado:</span> <span className="font-bold text-[#ff9b72]">{transaction.status}</span></p>
          </div>
          {completed && (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 text-emerald-200">
              <CheckCircle2 size={18} /> Entrega completada
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
