import { useEffect, useState } from 'react'
import { PlusCircle, Trash2, Edit3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import EmptyState from '../components/EmptyState'
import PublicationsForm from '../components/PublicationsForm'
import * as publicationsApi from '../services/publications.api.js'

const normalizeItem = (item) => ({
  id: item.id,
  datos1: item.datos1 || '',
  datos2: item.datos2 || '',
  datos3: Number(item.datos3) || 0,
})

export default function Publications() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const loadItems = async () => {
    setLoading(true)
    try {
      const response = await publicationsApi.findAll()
      setItems(response.map(normalizeItem))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  const handleSave = async (payload) => {
    try {
      const body = {
        datos1: payload.datos1,
        datos2: payload.datos2,
        datos3: Number(payload.datos3),
      }
      if (selected) {
        const updated = await publicationsApi.update({ id: selected.id, ...body })
        setItems((current) => current.map((item) => (item.id === updated.id ? normalizeItem(updated) : item)))
      } else {
        const created = await publicationsApi.create(body)
        setItems((current) => [...current, normalizeItem(created)])
      }
      setSelected(null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await publicationsApi.remove(id)
      setItems((current) => current.filter((item) => item.id !== id))
      if (selected?.id === id) setSelected(null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Administracion Publicaciones</p>
          <h1 className="text-3xl font-black">Datos sincronizados con API</h1>
          <p className="mt-2 text-slate-400">Gestiona los registros de publicaciones que se guardan en PostgreSQL.</p>
        </div>
        <Button onClick={() => navigate('/publications')} variant="outline">
          Refrescar lista
        </Button>
      </div>

      {error && <div className="rounded-lg border border-red-400 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-lg p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Registros</h2>
            <Button onClick={() => setSelected(null)} variant="outline">Nuevo</Button>
          </div>
          {loading ? (
            <p>Cargando...</p>
          ) : items.length ? (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item.id} className="grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-semibold text-white">{item.datos1}</p>
                    <p className="text-sm text-slate-400">{item.datos2}</p>
                    <p className="mt-2 text-xs text-slate-500">Valor numérico: {item.datos3}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-md border border-white/10 p-2 hover:bg-white/10" onClick={() => setSelected(item)} title="Editar">
                      <Edit3 size={16} />
                    </button>
                    <button className="rounded-md border border-white/10 p-2 text-red-300 hover:bg-white/10" onClick={() => handleDelete(item.id)} title="Eliminar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title={loading ? 'Cargando registros...' : 'No hay registros'} text="Crea un nuevo item para sincronizar con la base de datos." />
          )}
        </section>

        <section className="glass-panel rounded-lg p-5">
          <h2 className="text-xl font-black">Formulario</h2>
          <PublicationsForm initialItem={selected} onSubmit={handleSave} />
        </section>
      </div>
    </div>
  )
}
