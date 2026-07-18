import * as baseApi from './Base.js'

const RESOURCE = 'user'

export async function login(credentials) {
  return baseApi.post(`${RESOURCE}/login`, credentials)
}

export async function register(userData) {
  return baseApi.post(`${RESOURCE}/register`, userData)
}

export async function getProfile() {
  return baseApi.get(`${RESOURCE}/profile`)
}
