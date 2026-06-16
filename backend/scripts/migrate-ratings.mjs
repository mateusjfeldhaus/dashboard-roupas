/**
 * Migração: escala notas de 1-5 para 1-10 (multiplica × 2).
 * Execute UMA VEZ: node scripts/migrate-ratings.mjs
 */
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não definida no .env')
const sql = neon(process.env.DATABASE_URL)

const before = await sql`SELECT look_id, rating FROM ratings ORDER BY rating DESC`
console.log(`\nNotas antes da migração (${before.length} registros):`)
before.forEach(r => console.log(`  ${r.look_id}: ${r.rating}/5`))

await sql`UPDATE ratings SET rating = LEAST(rating * 2, 10) WHERE rating <= 5`

const after = await sql`SELECT look_id, rating FROM ratings ORDER BY rating DESC`
console.log(`\nNotas após a migração:`)
after.forEach(r => console.log(`  ${r.look_id}: ${r.rating}/10`))

console.log('\n✓ Migração concluída!')
