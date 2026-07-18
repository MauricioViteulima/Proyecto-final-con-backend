import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import Button from './Button'

const initialState = {
  datos1: '',
  datos2: '',
  datos3: '',
}

export default function PublicationsForm({ initialItem, onSubmit }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialItem) {
      setForm({
        datos1: initialItem.datos1 || '',
        datos2: initialItem.datos2 || '',
        datos3: initialItem.datos3?.toString() || '',
      })
    } else {
      setForm(initialState)
    }
  }, [initialItem])

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.datos1.trim()) nextErrors.datos1 = 'El campo datos1 es obligatorio'
    if (!form.datos2.trim()) nextErrors.datos2 = 'El campo datos2 es obligatorio'
    if (!form.datos3.trim() || Number.isNaN(Number(form.datos3))) nextErrors.datos3 = 'El campo datos3 debe ser un número válido'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    onSubmit({
      ...form,
      datos3: Number(form.datos3),
      id: initialItem?.id,
    })
  }

  const inputClass = 'w-full rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 text-sm outline-none focus:border-[#ff4b00]'

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="space-y-1">
        <span className="text-sm text-slate-300">Datos 1</span>
        <input className={inputClass} value={form.datos1} onChange={(event) => update('datos1', event.target.value)} />
        {errors.datos1 && <p className="text-xs text-red-300">{errors.datos1}</p>}
      </label>
      <label className="space-y-1">
        <span className="text-sm text-slate-300">Datos 2</span>
        <input className={inputClass} value={form.datos2} onChange={(event) => update('datos2', event.target.value)} />
        {errors.datos2 && <p className="text-xs text-red-300">{errors.datos2}</p>}
      </label>
      <label className="space-y-1">
        <span className="text-sm text-slate-300">Datos 3</span>
        <input className={inputClass} type="number" min="0" value={form.datos3} onChange={(event) => update('datos3', event.target.value)} />
        {errors.datos3 && <p className="text-xs text-red-300">{errors.datos3}</p>}
      </label>
      <div className="flex justify-end">
        <Button type="submit">
          <Save size={17} /> {initialItem ? 'Actualizar' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
