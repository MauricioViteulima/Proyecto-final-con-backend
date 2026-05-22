import { Heart } from 'lucide-react'
import { useApp } from '../context/useApp'

export default function FavoriteButton({ id, label = false }) {
  const { favorites, toggleFavorite } = useApp()
  const active = favorites.includes(id)

  return (
    <button
      onClick={() => toggleFavorite(id)}
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
        active ? 'border-[#ff4b00] bg-[#ff4b00] text-white' : 'border-white/10 bg-white/5 text-slate-200 hover:border-[#ff4b00]'
      }`}
      title={active ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart size={17} fill={active ? 'currentColor' : 'none'} />
      {label && (active ? 'Quitar favorito' : 'Agregar a favoritos')}
    </button>
  )
}
