import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.API_KEY
  if (!secret) { next(); return } // dev mode sem configuração

  const token = req.headers['x-api-key'] as string | undefined
  if (!token) {
    res.status(401).json({ error: 'Token ausente' })
    return
  }

  try {
    jwt.verify(token, secret)
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
