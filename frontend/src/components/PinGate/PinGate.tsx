import { useState, useEffect, ReactNode, FormEvent } from 'react'
import styled, { keyframes } from 'styled-components'
import api, { setApiKey } from '../../api/client'

const STORAGE_KEY = 'wardrobeAuth'
const TOKEN_TTL   = 24 * 60 * 60 * 1000 // 24h em ms

// ── Styles ────────────────────────────────────────────────────────────────────

const fadeIn = keyframes`from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none }`

const Screen = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg, #0f0f0f);
  padding: 24px;
`

const Card = styled.form`
  width: 100%;
  max-width: 360px;
  background: var(--surface, #1a1a1a);
  border: 1px solid var(--border, #2a2520);
  border-radius: 16px;
  padding: 40px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
`

const Logo = styled.div`
  text-align: center;
  font-size: 32px;
  letter-spacing: 2px;
  color: var(--accent, #c8a96e);
  font-weight: 700;
  margin-bottom: 4px;
`

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-muted, #8a8070);
  font-size: 14px;
  margin: 0;
`

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: var(--bg, #0f0f0f);
  border: 1px solid var(--border, #2a2520);
  border-radius: 10px;
  color: var(--text, #f5f0e8);
  font-size: 20px;
  letter-spacing: 6px;
  text-align: center;
  outline: none;
  box-sizing: border-box;

  &:focus { border-color: var(--accent, #c8a96e); }
  &::placeholder { letter-spacing: 2px; font-size: 14px; }
`

const Btn = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 14px;
  background: var(--accent, #c8a96e);
  color: #0f0f0f;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: ${p => p.$loading ? 'wait' : 'pointer'};
  opacity: ${p => p.$loading ? 0.7 : 1};
  transition: opacity 0.15s;

  &:hover:not(:disabled) { opacity: 0.88; }
`

const ErrorMsg = styled.p`
  text-align: center;
  color: #ef4444;
  font-size: 13px;
  margin: 0;
`

// ── Helpers ───────────────────────────────────────────────────────────────────

interface StoredAuth { token: string; expiresAt: number }

function loadStoredAuth(): StoredAuth | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const auth = JSON.parse(raw) as StoredAuth
    if (Date.now() >= auth.expiresAt) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return auth
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

type Status = 'checking' | 'locked' | 'unlocked'

export function PinGate({ children }: { children: ReactNode }) {
  const [status,  setStatus]  = useState<Status>('checking')
  const [pin,     setPin]     = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const auth = loadStoredAuth()
    if (auth) {
      setApiKey(auth.token)
      setStatus('unlocked')
    } else {
      setStatus('locked')
    }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!pin.trim()) return
    setLoading(true)
    setError('')
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

  if (status === 'checking') return null

  if (status === 'unlocked') return <>{children}</>

  return (
    <Screen>
      <Card onSubmit={handleSubmit}>
        <div>
          <Logo>GR</Logo>
          <Subtitle>Guarda-Roupa · Acesso privado</Subtitle>
        </div>

        <Input
          type="password"
          placeholder="Digite o PIN"
          value={pin}
          onChange={e => setPin(e.target.value)}
          autoFocus
          autoComplete="current-password"
        />

        {error && <ErrorMsg>{error}</ErrorMsg>}

        <Btn type="submit" $loading={loading} disabled={loading || !pin.trim()}>
          {loading ? 'Verificando…' : 'Entrar'}
        </Btn>
      </Card>
    </Screen>
  )
}
