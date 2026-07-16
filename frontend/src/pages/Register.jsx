import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useApp } from '../context/useApp'
import { isInstitutionalEmail } from '../utils/format'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useApp()
  const navigate = useNavigate()

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return setError('Ingresa tu nombre')
    if (!isInstitutionalEmail(form.email)) return setError('El correo debe ser institucional ULIMA')
    if (form.password.length < 4) return setError('La contraseña simulada debe tener al menos 4 caracteres')
    login(form.email, form.name)
    navigate('/profile')
  }

  return (
    <section className="mx-auto max-w-md">
      <form onSubmit={submit} className="glass-panel rounded-lg p-6">
        <h1 className="text-3xl font-black">Registro</h1>
        <p className="mt-2 text-sm text-slate-400">Crea un usuario simulado guardado en localStorage.</p>
        <div className="mt-6 space-y-4">
          <input className="w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 outline-none focus:border-[#ff4b00]" placeholder="Nombre completo" value={form.name} onChange={(event) => update('name', event.target.value)} />
          <input className="w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 outline-none focus:border-[#ff4b00]" placeholder="correo@ulima.edu.pe" value={form.email} onChange={(event) => update('email', event.target.value)} />
          <input className="w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 outline-none focus:border-[#ff4b00]" placeholder="Contraseña" type="password" value={form.password} onChange={(event) => update('password', event.target.value)} />
          {error && <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
          <Button type="submit" className="w-full">
            <UserPlus size={17} /> Crear cuenta
          </Button>
        </div>
      </form>
    </section>
  )
}
