import * as baseApi from './Base.js'

const RESOURCE = 'api/publications'

export async function findAll() {
  return baseApi.get(`${RESOURCE}`)
}

export async function create(payload) {
  return baseApi.post(`${RESOURCE}`, payload)
}

export async function update(payload) {
  return baseApi.put(`${RESOURCE}/${payload.id}`, payload)
}

export async function remove(id) {
  return baseApi.remove(`${RESOURCE}/${id}`)
}
