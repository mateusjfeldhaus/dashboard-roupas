import { ReactNode } from 'react'
import { Screen, Card, Logo, Subtitle, InputWrap, Input, EyeBtn, Btn, ErrorMsg } from './PinGate.styles'
import { usePinGate } from './usePinGate'

export function PinGate({ children }: { children: ReactNode }) {
  const { status, pin, setPin, error, loading, handleSubmit, showPin, setShowPin } = usePinGate()

  if (status === 'checking') return null
  if (status === 'unlocked') return <>{children}</>

  return (
    <Screen>
      <Card onSubmit={handleSubmit}>
        <div>
          <Logo>mateusjf</Logo>
          <Subtitle>Guarda-Roupa · Acesso privado</Subtitle>
        </div>
        <InputWrap>
          <Input
            type={showPin ? 'text' : 'password'}
            placeholder="Digite o PIN"
            value={pin} onChange={e => setPin(e.target.value)}
            autoFocus autoComplete="current-password"
          />
          <EyeBtn
            type="button"
            onClick={() => setShowPin(s => !s)}
            title={showPin ? 'Ocultar senha' : 'Mostrar senha'}
            tabIndex={-1}
          >
            {showPin ? '🙈' : '👁'}
          </EyeBtn>
        </InputWrap>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Btn type="submit" $loading={loading} disabled={loading || !pin.trim()}>
          {loading ? 'Verificando…' : 'Entrar'}
        </Btn>
      </Card>
    </Screen>
  )
}
