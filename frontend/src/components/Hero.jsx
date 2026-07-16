import { ArrowRight, Store, UsersRound } from 'lucide-react'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-white/10 bg-[#151817]">
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover opacity-35" src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1800&q=80" alt="Campus universitario" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1111] via-[#0f1111]/82 to-transparent" />
      </div>
      <div className="relative grid min-h-[460px] content-center gap-8 px-6 py-12 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <span className="rounded-md border border-[#ff4b00]/50 bg-[#ff4b00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ff9b72]">
            Universidad de Lima
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            ULIMA MARKET
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
            Compra productos oficiales, publica articulos entre alumnos y demuestra una entrega presencial con QR sin usar backend real.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button to="/marketplace">
              <UsersRound size={18} /> Marketplace Alumnos
            </Button>
            <Button to="/store" variant="outline">
              <Store size={18} /> Ulima Store
            </Button>
          </div>
        </div>
        <div className="hidden items-end justify-end lg:flex">
          <div className="glass-panel max-w-sm rounded-lg p-5">
            <p className="text-sm font-semibold text-[#ff9b72]">Demo lista para exposicion</p>
            <p className="mt-2 text-3xl font-black">Frontend completo</p>
            <p className="mt-2 text-sm text-slate-400">React Router, Context API, localStorage, QR y visor 3D para productos oficiales.</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
              Explorar ahora <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
