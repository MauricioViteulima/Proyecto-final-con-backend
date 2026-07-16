const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

const buildUrl = (path) => `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

const handleResponse = async (response) => {
  const contentType = response.headers.get('Content-Type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : null
  if (!response.ok) {
    const message = payload?.error || payload?.message || `HTTP ${response.status} ${response.statusText}`
    throw new Error(message)
  }
  return payload
}

export async function get(path) {
  const response = await fetch(buildUrl(path), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return handleResponse(response)
}

export async function post(path, body) {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return handleResponse(response)
}

export async function put(path, body) {
  const response = await fetch(buildUrl(path), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return handleResponse(response)
}

export async function remove(path) {
  const response = await fetch(buildUrl(path), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 204) return null
  return handleResponse(response)
}
