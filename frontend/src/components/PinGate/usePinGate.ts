import { useState, useEffect, FormEvent } from 'react'
import api, { setApiKey, STORAGE_KEY } from '../../api/client'

interface StoredAuth { token: string; expiresAt: number; role: 'admin' | 'guest' }

function jwtExp(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return typeof payload.exp === 'number' ? payload.exp * 1000 : null
  } catch {
    return null
  }
}

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
  const [status,   setStatus]  = useState<Status>('checking')
  const [pin,      setPin]     = useState('')
  const [error,    setError]   = useState('')
  const [loading,  setLoading] = useState(false)
  const [showPin,  setShowPin] = useState(false)

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
      const res = await api.post<{ token: string; role?: 'admin' | 'guest' }>('/api/auth', { pin })
      const { token, role } = res.data
      const expiresAt = jwtExp(token) ?? (Date.now() + 24 * 60 * 60 * 1000)
      const auth: StoredAuth = { token, expiresAt, role: role ?? 'admin' }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
      setApiKey(token)
      setStatus('unlocked')
    } catch {
      setError('PIN incorreto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return { status, pin, setPin, error, loading, handleSubmit, showPin, setShowPin }
}
