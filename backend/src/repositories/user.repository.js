import User from '../models/user.model.js'

export async function findById(id) {
  return User.findByPk(id)
}

export async function findByEmail(email) {
  return User.findOne({ where: { email } })
}

export async function findByUsername(username) {
  return User.findOne({ where: { username } })
}

export async function create(payload) {
  return User.create(payload)
}

export async function update(id, payload) {
  const user = await findById(id)
  if (!user) return null
  return user.update(payload)
}
