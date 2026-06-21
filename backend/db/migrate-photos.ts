import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error('DATABASE_URL não definida no .env')

const sql = neon(DATABASE_URL)

async function main() {
  console.log('Criando tabela look_photos...')
  await sql`
    CREATE TABLE IF NOT EXISTS look_photos (
      id          TEXT        PRIMARY KEY,
      look_id     TEXT        NOT NULL UNIQUE REFERENCES looks(id) ON DELETE CASCADE,
      mime_type   TEXT        NOT NULL DEFAULT 'image/jpeg',
      data        TEXT        NOT NULL,
      uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log('✓ Tabela look_photos criada!')
}

main().catch(e => { console.error(e); process.exit(1) })
