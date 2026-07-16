import Endpoint1 from '../models/endpoint1.model.js'

export async function findAll() {
  return Endpoint1.findAll({ order: [['id', 'ASC']] })
}

export async function findById(id) {
  return Endpoint1.findByPk(id)
}

export async function create(payload) {
  return Endpoint1.create(payload)
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
