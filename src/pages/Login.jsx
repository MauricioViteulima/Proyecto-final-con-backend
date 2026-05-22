import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useApp } from '../context/useApp'
import { isInstitutionalEmail } from '../utils/format'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    if (!isInstitutionalEmail(email)) return setError('Usa tu correo @aloe.ulima.edu.pe o @ulima.edu.pe')
    if (password.length < 4) return setError('Ingresa una contraseña simulada de al menos 4 caracteres')
    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    login(email, name)
    navigate('/profile')
  }

  return (
    <section className="mx-auto max-w-md">
      <form onSubmit={submit} className="glass-panel rounded-lg p-6">
        <h1 className="text-3xl font-black">Ingresar</h1>
        <p className="mt-2 text-sm text-slate-400">Autenticacion simulada con correo institucional.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 outline-none focus:border-[#ff4b00]" placeholder="correo@aloe.ulima.edu.pe" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className="w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 outline-none focus:border-[#ff4b00]" placeholder="Contraseña" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
          <Button type="submit" className="w-full">
            <LogIn size={17} /> Iniciar sesion
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-slate-400">
          ¿No tienes cuenta? <Link className="font-semibold text-[#ff7a3d]" to="/register">Registrate</Link>
        </p>
      </form>
    </section>
  )
}
