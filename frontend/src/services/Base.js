const API_BASE_URL = 'https://proyecto-final-backend-mv20.vercel.app/'

const buildUrl = (path) => `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  if (!token) return { 'Content-Type': 'application/json' }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

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
    headers: getAuthHeaders(),
  })
  return handleResponse(response)
}

export async function post(path, body) {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse(response)
}

export async function put(path, body) {
  const response = await fetch(buildUrl(path), {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse(response)
}

export async function remove(path) {
  const response = await fetch(buildUrl(path), {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  if (response.status === 204) return null
  return handleResponse(response)
}
