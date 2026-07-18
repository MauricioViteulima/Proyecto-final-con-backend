import { Heart, Menu, ShoppingCart, Store, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../context/useApp'
import { useAuth } from '../context/AuthContext.jsx'

const navItems = [
  ['/', 'Home'],
  ['/marketplace', 'Marketplace'],
  ['/store', 'ULIMA Store'],
  ['/favorites', 'Favoritos'],
  ['/profile', 'Mi Perfil'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cart, favorites } = useApp()
  const { user, logout } = useAuth()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-[#ff4b00] text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1111]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-[#ff4b00] font-black text-white">U</span>
          <span>
            <span className="block text-base font-black tracking-wide">ULIMA MARKET</span>
            <span className="block text-xs text-slate-400">Marketplace universitario</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link className="relative rounded-md border border-white/10 p-2.5 hover:bg-white/8" to="/cart" title="Carrito">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[#ff4b00] px-1.5 text-xs">{cartCount}</span>}
          </Link>
          <Link className="relative rounded-md border border-white/10 p-2.5 hover:bg-white/8" to="/favorites" title="Favoritos">
            <Heart size={18} />
            {favorites.length > 0 && <span className="absolute -right-2 -top-2 rounded-full bg-[#ff4b00] px-1.5 text-xs">{favorites.length}</span>}
          </Link>
          {user ? (
            <button onClick={logout} className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/8">
              Salir
            </button>
          ) : (
            <Link className="rounded-md border border-[#ff4b00] px-3 py-2 text-sm font-semibold text-[#ff7a3d] hover:bg-[#ff4b00] hover:text-white" to="/login">
              Ingresar
            </Link>
          )}
        </div>

        <button className="rounded-md border border-white/10 p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-4 pb-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map(([to, label]) => (
              <NavLink key={to} to={to} className={navClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-2">
              <Link className="flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2" to="/cart">
                <ShoppingCart size={17} /> Carrito ({cartCount})
              </Link>
              <Link className="flex flex-1 items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2" to="/profile">
                <UserRound size={17} /> Perfil
              </Link>
            </div>
            <Link className="flex items-center justify-center gap-2 rounded-md border border-[#ff4b00] px-3 py-2 text-[#ff7a3d]" to="/store">
              <Store size={17} /> Tienda oficial
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
