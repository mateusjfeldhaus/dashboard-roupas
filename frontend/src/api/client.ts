import axios from 'axios'

const STORAGE_KEY = 'wardrobeAuth'

// In development, VITE_API_URL is unset → uses '/' → Vite proxies /api and /img to :3001.
// In production, set VITE_API_URL to the deployed backend URL (e.g. https://api.railway.app).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/',
  headers: { 'Content-Type': 'application/json' },
})

/** Chamado pelo PinGate após validação — injeta o token em todos os requests */
export function setApiKey(key: string) {
  api.defaults.headers.common['x-api-key'] = key
}

/**
 * Interceptor global: se o servidor retornar 401 (token expirado ou inválido),
 * limpa o auth armazenado e recarrega a página → PinGate exige novo login.
 */
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      // Não intercepta o endpoint de auth em si (evita loop)
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
