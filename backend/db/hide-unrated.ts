/**
 * Oculta todos os looks que ainda não receberam avaliação.
 * Looks com rating (qualquer valor) permanecem visíveis.
 * Execute: npx tsx db/hide-unrated.ts
 */

import 'dotenv/config'
import { db } from './client'
import { looks, ratings } from './schema'
import { eq, notInArray, sql } from 'drizzle-orm'

async function run() {
  // IDs de looks que têm pelo menos uma avaliação
  const rated = await db.select({ lookId: ratings.lookId }).from(ratings)
  const ratedIds = rated.map(r => r.lookId)

  console.log(`Looks avaliados: ${ratedIds.length}`)

  // Oculta todos os looks que NÃO estão na lista de avaliados
  const result = ratedIds.length > 0
    ? await db.update(looks)
        .set({ hidden: true })
        .where(notInArray(looks.id, ratedIds))
    : await db.update(looks)
        .set({ hidden: true })

  console.log(`Looks ocultados com sucesso.`)
  console.log(`Looks avaliados (permaneceram visíveis): ${ratedIds.join(', ') || 'nenhum'}`)
  process.exit(0)
}

run().catch(err => {
  console.error('Erro:', err)
  process.exit(1)
})
