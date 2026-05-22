import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { useApp } from '../context/useApp'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  const Icon = toast.type === 'error' ? XCircle : toast.type === 'info' ? Info : CheckCircle2

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-md border border-white/10 bg-[#171a1a] px-4 py-3 shadow-2xl">
      <Icon className={toast.type === 'error' ? 'text-red-400' : 'text-emerald-400'} size={20} />
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  )
}
