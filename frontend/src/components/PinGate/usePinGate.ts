import { useState, useEffect, FormEvent } from 'react'
import api, { setApiKey, STORAGE_KEY } from '../../api/client'

const TOKEN_TTL = 24 * 60 * 60 * 1000

interface StoredAuth { token: string; expiresAt: number }

function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const auth = JSON.parse(raw) as StoredAuth
    if (Date.now() >= auth.expiresAt) { localStorage.removeItem(STORAGE_KEY); return null }
    return auth
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export type Status = 'checking' | 'locked' | 'unlocked'

export function usePinGate() {
  const [status,  setStatus]  = useState<Status>('checking')
  const [pin,     setPin]     = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const auth = loadStoredAuth()
    if (auth) { setApiKey(auth.token); setStatus('unlocked') }
    else setStatus('locked')
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!pin.trim()) return
    setLoading(true); setError('')
    try {
      const res = await api.post<{ token: string }>('/api/auth', { pin })
      const { token } = res.data
      const auth: StoredAuth = { token, expiresAt: Date.now() + TOKEN_TTL }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
      setApiKey(token)
      setStatus('unlocked')
    } catch {
      setError('PIN incorreto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return { status, pin, setPin, error, loading, handleSubmit }
}
