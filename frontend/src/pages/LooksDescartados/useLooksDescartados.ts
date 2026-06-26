import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'

export function useLooksDescartados() {
  const navigate = useNavigate()
  const { allLooks, toggleHidden } = useLooks()
  const hidden = allLooks.filter(l => l.hidden)

  return { navigate, hidden, toggleHidden }
}
