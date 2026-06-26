import { Response } from 'express'
import { ZodError } from 'zod'

// Expõe detalhes apenas se NODE_ENV for explicitamente "development"
const IS_DEV = process.env.NODE_ENV === 'development'

/** Converte um ZodError em mensagem legível */
function formatZodError(e: ZodError): string {
  return e.issues.map((err: { path: (string | number | symbol)[]; message: string }) => `${err.path.map(String).join('.')}: ${err.message}`).join(', ')
}

/** Helper para rotas — substitui o try/catch inline */
export function apiError(res: Response, e: unknown, status = 500) {
  if (e instanceof ZodError) {
    res.status(400).json({ error: formatZodError(e) })
    return
  }

  // Sempre loga no servidor
  console.error('[API Error]', e)

  // Expõe detalhes só em dev explícito — padrão é esconder
  const message = IS_DEV ? String(e) : 'Erro interno do servidor'
  res.status(status).json({ error: message })
}
