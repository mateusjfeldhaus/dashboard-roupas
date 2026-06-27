import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    res.status(500).json({ error: 'Servidor mal configurado: JWT_SECRET ausente' })
    return
  }

  const token = req.headers['x-api-key'] as string | undefined
  if (!token) {
    res.status(401).json({ error: 'Token ausente' })
    return
  }

  try {
    jwt.verify(token, secret, { algorithms: ['HS256'] })
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}
