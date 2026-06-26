import { ReactNode } from 'react'
import { Screen, Card, Logo, Subtitle, Input, Btn, ErrorMsg } from './PinGate.styles'
import { usePinGate } from './usePinGate'

export function PinGate({ children }: { children: ReactNode }) {
  const { status, pin, setPin, error, loading, handleSubmit } = usePinGate()

  if (status === 'checking') return null
  if (status === 'unlocked') return <>{children}</>

  return (
    <Screen>
      <Card onSubmit={handleSubmit}>
        <div>
          <Logo>mateusjf</Logo>
          <Subtitle>Guarda-Roupa · Acesso privado</Subtitle>
        </div>
        <Input
          type="password" placeholder="Digite o PIN"
          value={pin} onChange={e => setPin(e.target.value)}
          autoFocus autoComplete="current-password"
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Btn type="submit" $loading={loading} disabled={loading || !pin.trim()}>
          {loading ? 'Verificando…' : 'Entrar'}
        </Btn>
      </Card>
    </Screen>
  )
}
