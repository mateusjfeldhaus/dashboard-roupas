/** Convert a piece's relative image path (e.g. "Camisas Longas/Docthos - ...")
 *  into a URL served at /img/.
 *  In dev: Vite proxy → localhost:3001/img/
 *  In prod: Vercel static → frontend/public/img/ */
export function imgUrl(relativePath: string): string {
  return '/img/' + relativePath.split('/').map(encodeURIComponent).join('/')
}
