import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import api from '../../api/client'

export function useLooksDescartados() {
  const navigate = useNavigate()
  const { allLooks, toggleHidden, invalidate } = useLooks()
  const hidden = allLooks.filter(l => l.hidden)

  async function deleteLook(id: string) {
    await api.delete(`/api/looks/${encodeURIComponent(id)}`)
    invalidate()
  }

  return { navigate, hidden, toggleHidden, deleteLook }
}
