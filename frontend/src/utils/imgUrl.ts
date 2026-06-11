/** Convert a piece's relative image path (e.g. "Camisas Longas/Docthos - ...")
 *  into a URL served by the backend at /img/.
 *  In dev: uses Vite proxy → localhost:3001
 *  In prod: uses VITE_API_URL → Railway */
const BASE = import.meta.env.VITE_API_URL ?? ''

export function imgUrl(relativePath: string): string {
  return BASE + '/img/' + relativePath.split('/').map(encodeURIComponent).join('/')
}
