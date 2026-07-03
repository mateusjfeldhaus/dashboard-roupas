/**
 * Seed script — re-popula peças e looks SEM apagar dados do usuário.
 * Preserva: usage_records, ratings, look_photos, notas, look.hidden
 * Execute: npx tsx db/seed.ts
 */

import 'dotenv/config'
import { db } from './client'
import { pieces as piecesTable, looks as looksTable, lookPieces } from './schema'
import { pieces } from '../data/pieces'
import { looks } from '../data/looks'
import { SEASON_TAGS, OCCASION_TAGS, TIME_TAGS } from '../lib/schemas'
import { sql } from 'drizzle-orm'

function validateLookTags() {
  const errors: string[] = []
  for (const look of looks) {
    const seasons   = look.tags.filter(t => (SEASON_TAGS   as readonly string[]).includes(t))
    const occasions = look.tags.filter(t => (OCCASION_TAGS as readonly string[]).includes(t))
    const times     = look.tags.filter(t => (TIME_TAGS     as readonly string[]).includes(t))
    const dupes     = look.tags.length !== new Set(look.tags).size
    if (seasons.length   > 1) errors.push(look.id + ': múltiplas estações — ' + seasons.join(', '))
    if (occasions.length > 1) errors.push(look.id + ': múltiplas ocasiões — ' + occasions.join(', '))
    if (times.length     > 1) errors.push(look.id + ': múltiplos horários — ' + times.join(', '))
    if (dupes)                errors.push(look.id + ': tags duplicadas — ' + look.tags.join(', '))
  }
  return errors
}

async function seed() {
  console.log('Validating look tags...')
  const tagErrors = validateLookTags()
  if (tagErrors.length > 0) {
    console.error('ERRO: regras de tags violadas:')
    tagErrors.forEach(e => console.error('  ' + e))
    process.exit(1)
  }
  console.log('Tags OK (' + looks.length + ' looks validados)')

  console.log('Seeding database (preservando histórico do usuário)...')

  // ── Peças: upsert (preserva hidden, notes) ────────────────────────────────
  console.log('Upserting ' + pieces.length + ' pieces...')
  const CHUNK = 100
  for (let i = 0; i < pieces.length; i += CHUNK) {
    const chunk = pieces.slice(i, i + CHUNK)
    await db.insert(piecesTable)
      .values(chunk.map(p => ({
        id:       p.id,
        name:     p.name,
        brand:    p.brand,
        category: p.category as string,
        img:      p.img,
        color:    p.color,
        tips:     p.tips,
      })))
      .onConflictDoUpdate({
        target: piecesTable.id,
        set: {
          name:     sql`excluded.name`,
          brand:    sql`excluded.brand`,
          category: sql`excluded.category`,
          img:      sql`excluded.img`,
          color:    sql`excluded.color`,
          tips:     sql`excluded.tips`,
          // NÃO sobrescreve: hidden, notes
        },
      })
  }
  console.log('Pieces done')

  // ── Looks: upsert (preserva hidden, notes) ────────────────────────────────
  console.log('Upserting ' + looks.length + ' looks...')
  for (let i = 0; i < looks.length; i += CHUNK) {
    const chunk = looks.slice(i, i + CHUNK)
    await db.insert(looksTable)
      .values(chunk.map(l => ({
        id:        l.id,
        title:     l.title,
        tags:      l.tags as string[],
        formality: l.formality,
        tip:       l.tip,
      })))
      .onConflictDoUpdate({
        target: looksTable.id,
        set: {
          title:     sql`excluded.title`,
          tags:      sql`excluded.tags`,
          formality: sql`excluded.formality`,
          tip:       sql`excluded.tip`,
          // NÃO sobrescreve: hidden, notes
        },
      })
  }
  console.log('Looks done')

  // ── Look pieces: apaga e recria apenas as peças dos looks ─────────────────
  // (não há dados de usuário em look_pieces)
  console.log('Rebuilding look_pieces...')
  const lookIds = looks.map(l => `'${l.id}'`).join(',')
  await db.execute(sql`DELETE FROM look_pieces WHERE look_id IN (${sql.raw(lookIds)})`)

  const allLookPieces = looks.flatMap(l =>
    l.pieces.map(lp => ({ lookId: l.id, pieceId: lp.pieceId, cat: lp.cat }))
  )
  console.log('Inserting ' + allLookPieces.length + ' look_pieces rows (in chunks)...')
  for (let i = 0; i < allLookPieces.length; i += CHUNK) {
    const chunk = allLookPieces.slice(i, i + CHUNK)
    await db.insert(lookPieces).values(chunk)
    console.log('  chunk ' + (Math.floor(i / CHUNK) + 1) + '/' + Math.ceil(allLookPieces.length / CHUNK) + ' done')
  }
  console.log('Look pieces done')

  console.log('Seed complete! Histórico de usos, avaliações e fotos preservados.')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
