import Publication from '../models/publication.model.js'

export async function findAll() {
  return Publication.findAll({ order: [['id', 'ASC']] })
}

export async function findById(id) {
  return Publication.findByPk(id)
}

export async function create(payload) {
  return Publication.create(payload)
}

export async function update(id, payload) {
  const record = await findById(id)
  if (!record) return null
  return record.update(payload)
}

export async function remove(id) {
  const record = await findById(id)
  if (!record) return 0
  await record.destroy()
  return 1
}
