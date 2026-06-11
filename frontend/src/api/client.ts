import axios from 'axios'

// In development, Vite proxies /api and /img to the Express backend on :3001.
// In production, backend and frontend are served from the same origin.
const api = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
})

export default api
