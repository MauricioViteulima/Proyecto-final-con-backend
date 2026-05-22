import { PackageSearch } from 'lucide-react'

export default function EmptyState({ title = 'No hay resultados', text = 'Prueba con otros filtros o publica un producto nuevo.' }) {
  return (
    <div className="glass-panel grid place-items-center rounded-lg px-6 py-16 text-center">
      <PackageSearch className="mb-3 text-[#ff7a3d]" size={42} />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-400">{text}</p>
    </div>
  )
}
