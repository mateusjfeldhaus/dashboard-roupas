"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const serverless_1 = require("@neondatabase/serverless");
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL)
    throw new Error('DATABASE_URL não definida no .env');
const sql = (0, serverless_1.neon)(DATABASE_URL);
async function main() {
    console.log('Adicionando coluna notes à tabela looks...');
    await sql `ALTER TABLE looks ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT ''`;
    console.log('Adicionando coluna notes à tabela pieces...');
    await sql `ALTER TABLE pieces ADD COLUMN IF NOT EXISTS notes TEXT NOT NULL DEFAULT ''`;
    console.log('✓ Migração concluída!');
}
main().catch(e => { console.error(e); process.exit(1); });
