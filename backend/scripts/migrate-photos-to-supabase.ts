import 'dotenv/config'
import { sql } from 'drizzle-orm'
import { db } from '../db/client'
import { supabase, BUCKET } from '../lib/supabase'

async function main() {
  // Garante que a coluna url existe antes de tentar escrever nela
  await db.execute(sql`ALTER TABLE look_photos ADD COLUMN IF NOT EXISTS url TEXT NOT NULL DEFAULT ''`)
  console.log('Coluna url garantida.')

  const result = await db.execute(
    sql`SELECT id, look_id, mime_type, data FROM look_photos WHERE data IS NOT NULL AND data != ''`
  )

  const rows = result.rows as {
    id: string
    look_id: string
    mime_type: string
    data: string
  }[]

  if (rows.length === 0) {
    console.log('Nenhuma foto para migrar.')
    process.exit(0)
  }

  console.log(rows.length + ' foto(s) encontrada(s). Iniciando upload...')

  let ok = 0
  let fail = 0

  for (const row of rows) {
    const { look_id, mime_type, data } = row
    const buffer = Buffer.from(data, 'base64')

    process.stdout.write('  -> ' + look_id + ' ... ')

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(look_id, buffer, { contentType: mime_type, upsert: true })

    if (uploadError) {
      console.log('ERRO: ' + uploadError.message)
      fail++
      continue
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(look_id)

    await db.execute(
      sql`UPDATE look_photos SET url = ${publicUrl}, data = '' WHERE look_id = ${look_id}`
    )

    console.log('OK -> ' + publicUrl)
    ok++
  }

  console.log('\nMigracao concluida: ' + ok + ' ok, ' + fail + ' erros.')
  console.log('Proximo passo: rode  npx drizzle-kit push  para limpar o schema.')
  process.exit(fail > 0 ? 1 : 0)
}

main().catch(err => { console.error(err); process.exit(1) })
