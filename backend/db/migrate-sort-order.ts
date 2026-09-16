import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error('DATABASE_URL não definida no .env')

const sql = neon(DATABASE_URL)

async function main() {
  console.log('Adicionando coluna sort_order à tabela pieces...')
  await sql`ALTER TABLE pieces ADD COLUMN IF NOT EXISTS sort_order INTEGER`
  console.log('✓ Migração concluída!')
}

main().catch(e => { console.error(e); process.exit(1) })
