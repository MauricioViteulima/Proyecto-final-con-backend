import { Save } from 'lucide-react'
import { useState } from 'react'
import { categories } from '../data/mockProducts'
import Button from './Button'

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  condition: '',
  image: '',
  location: '',
  contact: '',
}

export default function PublicationForm({ initialProduct, onSubmit }) {
  const [form, setForm] = useState({ ...initialState, ...initialProduct })
  const [errors, setErrors] = useState({})

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'El titulo es obligatorio'
    if (!form.description.trim()) nextErrors.description = 'La descripcion es obligatoria'
    if (!form.price || Number(form.price) <= 0) nextErrors.price = 'El precio debe ser mayor a 0'
    if (!form.category) nextErrors.category = 'Selecciona una categoria'
    if (!form.condition) nextErrors.condition = 'Selecciona una condicion'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    onSubmit({
      ...form,
      image: form.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
      location: form.location || 'Biblioteca',
      contact: form.contact || 'Chat simulado por correo institucional',
    })
  }

  const inputClass = 'w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 text-sm outline-none focus:border-[#ff4b00]'

  return (
    <form onSubmit={submit} className="glass-panel grid gap-4 rounded-lg p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Titulo</span>
          <input className={inputClass} value={form.title} onChange={(event) => update('title', event.target.value)} />
          {errors.title && <p className="text-xs text-red-300">{errors.title}</p>}
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Precio</span>
          <input className={inputClass} type="number" min="0" value={form.price} onChange={(event) => update('price', event.target.value)} />
          {errors.price && <p className="text-xs text-red-300">{errors.price}</p>}
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-sm text-slate-300">Descripcion</span>
        <textarea className={`${inputClass} min-h-28 resize-y`} value={form.description} onChange={(event) => update('description', event.target.value)} />
        {errors.description && <p className="text-xs text-red-300">{errors.description}</p>}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Categoria</span>
          <select className={inputClass} value={form.category} onChange={(event) => update('category', event.target.value)}>
            <option value="">Seleccionar</option>
            {categories.marketplace.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-300">{errors.category}</p>}
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Condicion</span>
          <select className={inputClass} value={form.condition} onChange={(event) => update('condition', event.target.value)}>
            <option value="">Seleccionar</option>
            {categories.conditions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {errors.condition && <p className="text-xs text-red-300">{errors.condition}</p>}
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Imagen por URL o carga simulada</span>
          <input className={inputClass} value={form.image} onChange={(event) => update('image', event.target.value)} placeholder="https://..." />
        </label>
        <label className="space-y-1">
          <span className="text-sm text-slate-300">Ubicacion de entrega</span>
          <select className={inputClass} value={form.location} onChange={(event) => update('location', event.target.value)}>
            <option value="">Seleccionar</option>
            {categories.locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-1">
        <span className="text-sm text-slate-300">Metodo de contacto simulado</span>
        <input className={inputClass} value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder="Correo, WhatsApp simulado, Instagram..." />
      </label>

      <div className="flex justify-end">
        <Button type="submit">
          <Save size={17} /> Guardar publicacion
        </Button>
      </div>
    </form>
  )
}
