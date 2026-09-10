/** Convert a piece's relative image path (e.g. "Camisas Longas/Docthos - ...")
 *  into an authenticated URL served at /img/?t=<jwt>.
 *  In dev: Vite proxy → localhost:3001/img/
 *  In prod: Vercel rewrite → backend /img/ */
function getToken(): string {
  try {
    const raw = localStorage.getItem('wardrobeAuth')
    if (!raw) return ''
    return (JSON.parse(raw) as { token: string }).token ?? ''
  } catch { return '' }
}

export function imgUrl(relativePath: string): string {
  if (!relativePath) return ''
  // Supabase public URLs já são completas — retorna direto sem autenticação
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) return relativePath
  const path = '/img/' + relativePath.split('/').map(encodeURIComponent).join('/')
  const token = getToken()
  return token ? `${path}?t=${encodeURIComponent(token)}` : path
}
