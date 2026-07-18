import { Mail, PackageCheck, Star } from 'lucide-react'
import { stars } from '../utils/format'

export default function ProfileCard({ user }) {
  return (
    <div className="glass-panel rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#ff4b00] text-2xl font-black">
          {(user.name || user.username || '').slice(0, 1)}
        </div>
        <div>
          <h1 className="text-2xl font-black">
            {user.name || user.username}
          </h1>
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <Mail size={15} /> {user.email}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <Star size={16} /> Reputacion
          </p>
          <p className="mt-2 text-2xl font-black text-amber-300">{stars(user.reputation)}</p>
          <p className="text-sm text-slate-400">{user.reputation}/5</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <PackageCheck size={16} /> Entregas exitosas
          </p>
          <p className="mt-2 text-3xl font-black text-[#ff7a3d]">{user.successfulDeliveries}</p>
        </div>
      </div>
    </div>
  )
}
