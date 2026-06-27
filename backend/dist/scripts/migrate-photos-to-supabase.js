"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const drizzle_orm_1 = require("drizzle-orm");
const client_1 = require("../db/client");
const supabase_1 = require("../lib/supabase");
async function main() {
    // Garante que a coluna url existe antes de tentar escrever nela
    await client_1.db.execute((0, drizzle_orm_1.sql) `ALTER TABLE look_photos ADD COLUMN IF NOT EXISTS url TEXT NOT NULL DEFAULT ''`);
    console.log('Coluna url garantida.');
    const result = await client_1.db.execute((0, drizzle_orm_1.sql) `SELECT id, look_id, mime_type, data FROM look_photos WHERE data IS NOT NULL AND data != ''`);
    const rows = result.rows;
    if (rows.length === 0) {
        console.log('Nenhuma foto para migrar.');
        process.exit(0);
    }
    console.log(rows.length + ' foto(s) encontrada(s). Iniciando upload...');
    let ok = 0;
    let fail = 0;
    for (const row of rows) {
        const { look_id, mime_type, data } = row;
        const buffer = Buffer.from(data, 'base64');
        process.stdout.write('  -> ' + look_id + ' ... ');
        const { error: uploadError } = await supabase_1.supabase.storage
            .from(supabase_1.BUCKET)
            .upload(look_id, buffer, { contentType: mime_type, upsert: true });
        if (uploadError) {
            console.log('ERRO: ' + uploadError.message);
            fail++;
            continue;
        }
        const { data: { publicUrl } } = supabase_1.supabase.storage.from(supabase_1.BUCKET).getPublicUrl(look_id);
        await client_1.db.execute((0, drizzle_orm_1.sql) `UPDATE look_photos SET url = ${publicUrl}, data = '' WHERE look_id = ${look_id}`);
        console.log('OK -> ' + publicUrl);
        ok++;
    }
    console.log('\nMigracao concluida: ' + ok + ' ok, ' + fail + ' erros.');
    console.log('Proximo passo: rode  npx drizzle-kit push  para limpar o schema.');
    process.exit(fail > 0 ? 1 : 0);
}
main().catch(err => { console.error(err); process.exit(1); });
