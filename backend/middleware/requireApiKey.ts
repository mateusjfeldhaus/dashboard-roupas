import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET ?? process.env.API_KEY
  if (!secret) {
    res.status(500).json({ error: 'Servidor mal configurado: API_KEY ausente' })
    return
  }

  const token = req.headers['x-api-key'] as string | undefined
  if (!token) {
    res.status(401).json({ error: 'Token ausente' })
    return
  }

  try {
    jwt.verify(token, secret)
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}
