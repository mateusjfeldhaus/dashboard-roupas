import { useToasts } from '../../hooks/useToast'
import { Container, Item } from './Toast.styles'

const ICON: Record<string, string> = {
  success: '✓',
  error: '✕',
}

export function ToastContainer() {
  const toasts = useToasts()
  if (toasts.length === 0) return null

  return (
    <Container>
      {toasts.map(t => (
        <Item key={t.id} $type={t.type}>
          <span>{ICON[t.type]}</span>
          {t.msg}
        </Item>
      ))}
    </Container>
  )
}
