import * as repository from '../repositories/endpoint1.repository.js'

const validatePayload = ({ datos1, datos2, datos3 }) => {
  if (typeof datos1 !== 'string' || datos1.trim() === '') return 'El campo datos1 es obligatorio y debe ser texto.'
  if (typeof datos2 !== 'string' || datos2.trim() === '') return 'El campo datos2 es obligatorio y debe ser texto.'
  if (typeof datos3 !== 'number' || Number.isNaN(datos3)) return 'El campo datos3 es obligatorio y debe ser un numero.'
  return null
}

export async function list(req, res) {
  try {
    const items = await repository.findAll()
    return res.json(items)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al listar los registros.' })
  }
}

export async function get(req, res) {
  try {
    const item = await repository.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Registro no encontrado.' })
    }
    return res.json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener el registro.' })
  }
}

export async function createItem(req, res) {
  try {
    const validationError = validatePayload(req.body)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }
    const item = await repository.create({
      datos1: req.body.datos1.trim(),
      datos2: req.body.datos2.trim(),
      datos3: Number(req.body.datos3),
    })
    return res.status(201).json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al crear el registro.' })
  }
}

export async function updateItem(req, res) {
  try {
    const validationError = validatePayload(req.body)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }
    const item = await repository.update(req.params.id, {
      datos1: req.body.datos1.trim(),
      datos2: req.body.datos2.trim(),
      datos3: Number(req.body.datos3),
    })
    if (!item) {
      return res.status(404).json({ error: 'Registro no encontrado.' })
    }
    return res.json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al actualizar el registro.' })
  }
}

export async function removeItem(req, res) {
  try {
    const deleted = await repository.remove(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Registro no encontrado.' })
    }
    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al eliminar el registro.' })
  }
}
