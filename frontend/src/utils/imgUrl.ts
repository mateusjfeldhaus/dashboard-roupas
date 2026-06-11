/** Convert a piece's relative image path (e.g. "Camisas Longas/Docthos - ...")
 *  into a URL served by the Vite dev-server middleware at /img/ */
export function imgUrl(relativePath: string): string {
  return '/img/' + relativePath.split('/').map(encodeURIComponent).join('/')
}
