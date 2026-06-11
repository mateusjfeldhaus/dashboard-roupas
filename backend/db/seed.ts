/**
 * Seed script — popula o banco com os dados estáticos existentes.
 * Execute uma vez: npx tsx db/seed.ts
 * É idempotente: usa onConflictDoNothing, seguro rodar mais de uma vez.
 */

import 'dotenv/config'
import { db } from './client'
import { pieces as piecesTable, looks as looksTable, lookPieces } from './schema'
import { pieces } from '../data/pieces'
import { looks }  from '../data/looks'

async function seed() {
  console.log('🌱 Seeding database...\n')

  // ── 1. Pieces ──────────────────────────────────────────────────────────────
  console.log(`Inserting ${pieces.length} pieces...`)
  await db.insert(piecesTable)
    .values(pieces.map(p => ({
      id:       p.id,
      name:     p.name,
      brand:    p.brand,
      category: p.category as string,
      img:      p.img,
      color:    p.color,
      tips:     p.tips,
    })))
    .onConflictDoNothing()

  console.log('✓ Pieces done\n')

  // ── 2. Looks ───────────────────────────────────────────────────────────────
  console.log(`Inserting ${looks.length} looks...`)
  await db.insert(looksTable)
    .values(looks.map(l => ({
      id:        l.id,
      title:     l.title,
      tags:      l.tags as string[],
      formality: l.formality,
      tip:       l.tip,
    })))
    .onConflictDoNothing()

  console.log('✓ Looks done\n')

  // ── 3. Look pieces (join table) ────────────────────────────────────────────
  const allLookPieces = looks.flatMap(l =>
    l.pieces.map(lp => ({
      lookId:  l.id,
      pieceId: lp.pieceId,
      cat:     lp.cat,
    }))
  )

  console.log(`Inserting ${allLookPieces.length} look_pieces rows...`)
  await db.insert(lookPieces)
    .values(allLookPieces)
    .onConflictDoNothing()

  console.log('✓ Look pieces done\n')

  console.log('🎉 Seed complete!')
  process.exit(0)
}

seed().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
