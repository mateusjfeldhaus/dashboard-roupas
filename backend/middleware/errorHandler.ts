import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

const IS_PROD = process.env.NODE_ENV === 'production'

/** Converte um ZodError em mensagem legível */
function formatZodError(e: ZodError): string {
  return e.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
}

/** Helper para rotas — substitui o try/catch inline */
export function apiError(res: Response, e: unknown, status = 500) {
  if (e instanceof ZodError) {
    res.status(400).json({ error: formatZodError(e) })
    return
  }

  // Em produção: loga internamente, retorna mensagem genérica
  if (IS_PROD) {
    console.error('[API Error]', e)
    res.status(status).json({ error: 'Erro interno do servidor' })
  } else {
    res.status(status).json({ error: String(e) })
  }
}
