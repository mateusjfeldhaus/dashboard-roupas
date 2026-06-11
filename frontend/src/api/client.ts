import axios from 'axios'

// In development, VITE_API_URL is unset → uses '/' → Vite proxies /api and /img to :3001.
// In production, set VITE_API_URL to the deployed backend URL (e.g. https://api.railway.app).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/',
  headers: { 'Content-Type': 'application/json' },
})

/** Chamado pelo PinGate após validação — injeta o PIN em todos os requests */
export function setApiKey(key: string) {
  api.defaults.headers.common['x-api-key'] = key
}

export default api
