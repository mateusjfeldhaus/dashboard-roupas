/**
 * Seed script — limpa e re-popula o banco com os dados estaticos.
 * Execute: npx tsx db/seed.ts
 */

import 'dotenv/config'
import { db } from './client'
import { pieces as piecesTable, looks as looksTable, lookPieces, usageRecords, ratings, lookPhotos } from './schema'
import { pieces } from '../data/pieces'
import { looks } from '../data/looks'

async function seed() {
  console.log('Seeding database...')

  console.log('Wiping existing data...')
  await db.delete(lookPhotos)
  await db.delete(usageRecords)
  await db.delete(ratings)
  await db.delete(lookPieces)
  await db.delete(looksTable)
  await db.delete(piecesTable)
  console.log('Wipe done')

  console.log('Inserting ' + pieces.length + ' pieces...')
  await db.insert(piecesTable).values(
    pieces.map(p => ({
      id:       p.id,
      name:     p.name,
      brand:    p.brand,
      category: p.category as string,
      img:      p.img,
      color:    p.color,
      tips:     p.tips,
    }))
  )
  console.log('Pieces done')

  console.log('Inserting ' + looks.length + ' looks...')
  await db.insert(looksTable).values(
    looks.map(l => ({
      id:        l.id,
      title:     l.title,
      tags:      l.tags as string[],
      formality: l.formality,
      tip:       l.tip,
    }))
  )
  console.log('Looks done')

  const allLookPieces = looks.flatMap(l =>
    l.pieces.map(lp => ({
      lookId:  l.id,
      pieceId: lp.pieceId,
      cat:     lp.cat,
    }))
  )
  console.log('Inserting ' + allLookPieces.length + ' look_pieces rows (in chunks)...')
  const CHUNK = 200
  for (let i = 0; i < allLookPieces.length; i += CHUNK) {
    const chunk = allLookPieces.slice(i, i + CHUNK)
    await db.insert(lookPieces).values(chunk)
    console.log('  chunk ' + (i / CHUNK + 1) + '/' + Math.ceil(allLookPieces.length / CHUNK) + ' done (' + Math.min(i + CHUNK, allLookPieces.length) + '/' + allLookPieces.length + ')')
  }
  console.log('Look pieces done')

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})
