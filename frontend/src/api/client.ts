import axios from 'axios'

export const STORAGE_KEY = 'wardrobeAuth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/',
  headers: { 'Content-Type': 'application/json' },
})

export function setApiKey(key: string) {
  api.defaults.headers.common['x-api-key'] = key
}

export function getRole(): 'admin' | 'guest' {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'admin'
    const stored = JSON.parse(raw) as { token: string; role?: string }
    // Role salvo explicitamente no novo formato
    if (stored.role === 'guest') return 'guest'
    if (stored.role === 'admin') return 'admin'
    // Fallback: decodifica do JWT (tokens antigos sem role no localStorage)
    const payload = JSON.parse(atob(stored.token.split('.')[1]))
    return payload.role === 'guest' ? 'guest' : 'admin'
  } catch {
    return 'admin'
  }
}

export function isGuest(): boolean {
  return getRole() === 'guest'
}

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {      
      const url: string = err.config?.url ?? ''
      if (!url.includes('/api/auth')) {
        localStorage.removeItem(STORAGE_KEY)
        delete api.defaults.headers.common['x-api-key']
        window.location.reload()
      }
    }
    return Promise.reject(err)
  }
)

export default api
