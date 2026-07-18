import { Edit3, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import ProfileCard from '../components/ProfileCard'
import { useAuth } from '../context/AuthContext.jsx'
import { useApp } from '../context/useApp'
import { formatPrice } from '../utils/format'

export default function Profile() {
  const { user } = useAuth()
  const { marketplaceProducts, deleteMarketplaceProduct, transactions, confirmPresencial } = useApp()

  if (!user) {
    return (
      <div className="mx-auto max-w-xl">
        <EmptyState title="Inicia sesión para ver tu perfil" text="Accede con tu usuario ULIMA para ver tu perfil." />
        <div className="mt-4 flex justify-center">
          <Button to="/login">Ingresar</Button>
        </div>
      </div>
    )
  }

  const publications = marketplaceProducts.filter((product) => product.sellerId === user.id || product.sellerName === (user.name || user.username))
  const history = transactions.filter((transaction) => transaction.buyer === (user.name || user.username) || transaction.seller === (user.name || user.username))

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <ProfileCard user={user} />
      <div className="space-y-6">
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Publicaciones activas</h2>
            <Button to="/marketplace/publish" variant="outline">Nueva publicacion</Button>
          </div>
          {publications.length ? (
            <div className="space-y-3">
              {publications.map((product) => {
                const statusLabel =
                  product.status === 'vendido'
                    ? 'vendido'
                    : product.status === 'interesado'
                    ? `interesado (${product.interestedCount || 0})`
                    : 'disponible'

                return (
                  <article key={product.id} className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-3 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                    <img className="h-20 w-full rounded-md object-cover sm:w-20" src={product.image} alt={product.title} />
                    <div>
                      <h3 className="font-bold">{product.title}</h3>
                      <p className="text-sm text-slate-400">{product.category} · {formatPrice(product.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md border border-[#ff4b00]/30 px-2 py-1 text-xs font-bold text-[#ff9b72]">{statusLabel}</span>
                      <Link className="rounded-md border border-white/10 p-2 hover:bg-white/10" to={`/marketplace/publish?edit=${product.id}`} title="Editar">
                        <Edit3 size={17} />
                      </Link>
                      <button className="rounded-md border border-white/10 p-2 text-red-300 hover:bg-white/10" onClick={() => deleteMarketplaceProduct(product.id)} title="Eliminar">
                        <Trash2 size={17} />
                      </button>
                      {product.status !== 'vendido' && (
                        <button
                          className="ml-2 rounded-md bg-[#ff4b00] px-3 py-1 text-sm font-bold text-white hover:opacity-90"
                          onClick={() => confirmPresencial(product.id)}
                        >
                          Confirmar compra presencial
                        </button>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <EmptyState title="Aun no tienes publicaciones" text="Crea un producto desde Publicar Producto." />
          )}
        </section>

        <section className="glass-panel rounded-lg p-5">
          <h2 className="text-xl font-black">Historial de compras y entregas</h2>
          {history.length ? (
            <div className="mt-4 space-y-3">
              {history.map((transaction) => (
                <article key={transaction.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-bold">{transaction.productTitle}</h3>
                      <p className="text-sm text-slate-400">Vendedor: {transaction.seller} · Comprador: {transaction.buyer}</p>
                    </div>
                    <span className="rounded-md border border-[#ff4b00]/40 px-2 py-1 text-xs font-bold text-[#ff9b72]">{transaction.status}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-400">No hay transacciones simuladas todavia.</p>
          )}
        </section>
      </div>
    </div>
  )
}
