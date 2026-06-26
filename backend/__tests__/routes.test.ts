import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import jwt from 'jsonwebtoken'

// ── DB mock ───────────────────────────────────────────────────────────────────
// Vitest hoists vi.mock to top — factory must be self-contained (no external refs).

const mockLook = {
  id: 'test-look-1', title: 'Look Teste', tags: [], formality: 2,
  tip: '', notes: '', hidden: false,
}

vi.mock('../db/client', () => {
  // Non-recursive: each terminal method resolves to a concrete value.
  const emptyQ = () => ({
    where:   vi.fn().mockResolvedValue([]),
    orderBy: vi.fn().mockResolvedValue([]),
    limit:   vi.fn().mockResolvedValue([]),
  })

  const look = {
    id: 'test-look-1', title: 'Look Teste', tags: [], formality: 2,
    tip: '', notes: '', hidden: false,
  }

  return {
    db: {
      select: vi.fn().mockReturnValue({ from: vi.fn().mockReturnValue(emptyQ()) }),

      insert: vi.fn().mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([look]),
        }),
      }),

      update: vi.fn().mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([]),
          }),
        }),
      }),

      delete: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([]),
      }),

      transaction: vi.fn().mockImplementation(async (fn: (tx: unknown) => Promise<unknown>) => {
        const tx = {
          insert: vi.fn().mockReturnValue({
            values: vi.fn().mockReturnValue({
              returning: vi.fn().mockResolvedValue([look]),
            }),
          }),
          delete: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue([]),
          }),
        }
        return fn(tx)
      }),
    },
  }
})

const { app } = await import('../app')

const PIN        = 'test-pin-123'
const JWT_SECRET = 'test-secret'

beforeAll(() => {
  process.env.API_KEY    = PIN
  process.env.JWT_SECRET = JWT_SECRET
  process.env.NODE_ENV   = 'test'
})

afterAll(() => {
  delete process.env.API_KEY
  delete process.env.JWT_SECRET
})

// ── POST /api/auth ────────────────────────────────────────────────────────────

describe('POST /api/auth', () => {
  it('retorna 401 com PIN errado', async () => {
    const res = await request(app).post('/api/auth').send({ pin: 'errado' })
    expect(res.status).toBe(401)
    expect(res.body).toHaveProperty('error')
  })

  it('retorna 401 sem PIN', async () => {
    const res = await request(app).post('/api/auth').send({})
    expect(res.status).toBe(401)
  })

  it('retorna 200 com token JWT válido para PIN correto', async () => {
    const res = await request(app).post('/api/auth').send({ pin: PIN })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    const decoded = jwt.verify(res.body.token, JWT_SECRET) as { exp: number }
    expect(decoded).toHaveProperty('exp')
    expect(decoded.exp).toBeGreaterThan(Date.now() / 1000 + 82800) // > 23h no futuro
  })
})

// ── POST /api/looks ───────────────────────────────────────────────────────────

describe('POST /api/looks', () => {
  let token: string

  beforeAll(async () => {
    const res = await request(app).post('/api/auth').send({ pin: PIN })
    token = res.body.token
  })

  it('retorna 401 sem token', async () => {
    const res = await request(app).post('/api/looks').send({
      id: 'look-1', title: 'Look X', formality: 3,
    })
    expect(res.status).toBe(401)
  })

  it('retorna 400 para body inválido (title ausente)', async () => {
    const res = await request(app)
      .post('/api/looks')
      .set('x-api-key', token)
      .send({ id: 'look-1', formality: 3 })
    expect(res.status).toBe(400)
  })

  it('retorna 400 para formality fora do range (1-5)', async () => {
    const res = await request(app)
      .post('/api/looks')
      .set('x-api-key', token)
      .send({ id: 'look-1', title: 'Look X', formality: 99 })
    expect(res.status).toBe(400)
  })

  it('retorna 201 com look criado para body válido', async () => {
    const res = await request(app)
      .post('/api/looks')
      .set('x-api-key', token)
      .send({ id: 'test-look-1', title: 'Look Teste', formality: 2, tags: ['casual'] })
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ id: 'test-look-1', title: 'Look Teste' })
    expect(Array.isArray(res.body.pieces)).toBe(true)
  })
})
