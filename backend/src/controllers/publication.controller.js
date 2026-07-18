import * as repository from '../repositories/publication.repository.js'

const validatePayload = ({ title, description, price, category, condition }) => {
  if (typeof title !== 'string' || title.trim() === '') return 'El campo title es obligatorio y debe ser texto.'
  if (typeof description !== 'string' || description.trim() === '') return 'El campo description es obligatorio y debe ser texto.'
  if (price === undefined || price === null || Number.isNaN(Number(price)) || Number(price) <= 0) return 'El campo price es obligatorio y debe ser un numero mayor a 0.'
  if (typeof category !== 'string' || category.trim() === '') return 'El campo category es obligatorio.'
  if (typeof condition !== 'string' || condition.trim() === '') return 'El campo condition es obligatorio.'
  return null
}

export async function list(req, res) {
  try {
    const items = await repository.findAll()
    return res.json(items)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al listar las publicaciones.' })
  }
}

export async function get(req, res) {
  try {
    const item = await repository.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ error: 'Publicacion no encontrada.' })
    }
    return res.json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener la publicacion.' })
  }
}

export async function createItem(req, res) {
  try {
    const validationError = validatePayload(req.body)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }
    const item = await repository.create({
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      price: Number(req.body.price),
      category: req.body.category.trim(),
      condition: req.body.condition.trim(),
      image: req.body.image || null,
      location: req.body.location || null,
      whatsapp: req.body.whatsapp || null,
      sellerId: req.body.sellerId || null,
      sellerName: req.body.sellerName || null,
    })
    return res.status(201).json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al crear la publicacion.' })
  }
}

export async function updateItem(req, res) {
  try {
    const validationError = validatePayload(req.body)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    const payload = {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      price: Number(req.body.price),
      category: req.body.category.trim(),
      condition: req.body.condition.trim(),
      image: req.body.image || null,
      location: req.body.location || null,
      whatsapp: req.body.whatsapp || null,
    }

    if (typeof req.body.status === 'string') {
      payload.status = req.body.status.trim()
    }

    if (req.body.interestedCount !== undefined) {
      payload.interestedCount = Number(req.body.interestedCount)
    }

    const item = await repository.update(req.params.id, payload)
    if (!item) {
      return res.status(404).json({ error: 'Publicacion no encontrada.' })
    }
    return res.json(item)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al actualizar la publicacion.' })
  }
}

export async function removeItem(req, res) {
  try {
    const deleted = await repository.remove(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Publicacion no encontrada.' })
    }
    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al eliminar la publicacion.' })
  }
}
