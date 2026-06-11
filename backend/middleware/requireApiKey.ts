import { Request, Response, NextFunction } from 'express'

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.API_KEY
  if (!expected) { next(); return } // sem API_KEY configurada → dev mode aberto

  const key = req.headers['x-api-key']
  if (key !== expected) {
    res.status(401).json({ error: 'PIN incorreto' })
    return
  }
  next()
}
