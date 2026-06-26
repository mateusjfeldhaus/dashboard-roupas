/**
 * Redimensiona e converte uma imagem para WebP usando Canvas.
 * Roda no browser, sem servidor envolvido.
 *
 * @param file     Arquivo original (qualquer formato suportado pelo browser)
 * @param maxPx    Lado máximo em pixels (default 1200)
 * @param quality  Qualidade WebP 0–1 (default 0.82)
 */
export function compressImage(
  file: File,
  maxPx   = 1200,
  quality = 0.82,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img    = new Image()
    const objUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objUrl)

      const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
      const w     = Math.round(img.width  * scale)
      const h     = Math.round(img.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width  = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas não disponível')); return }
      ctx.drawImage(img, 0, 0, w, h)

      canvas.toBlob(
        blob => {
          if (!blob) { reject(new Error('Falha ao comprimir imagem')); return }
          const name = file.name.replace(/\.[^.]+$/, '.webp')
          resolve(new File([blob], name, { type: 'image/webp' }))
        },
        'image/webp',
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(objUrl)
      reject(new Error('Não foi possível carregar a imagem'))
    }

    img.src = objUrl
  })
}
