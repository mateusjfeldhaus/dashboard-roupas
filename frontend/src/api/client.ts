import axios from 'axios'

// In development, VITE_API_URL is unset → uses '/' → Vite proxies /api and /img to :3001.
// In production, set VITE_API_URL to the deployed backend URL (e.g. https://api.railway.app).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/',
  headers: { 'Content-Type': 'application/json' },
})

export default api
