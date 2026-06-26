"use strict";
/**
 * Seed script — popula o banco com os dados estáticos existentes.
 * Execute uma vez: npx tsx db/seed.ts
 * É idempotente: usa onConflictDoNothing, seguro rodar mais de uma vez.
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("./client");
const schema_1 = require("./schema");
const pieces_1 = require("../data/pieces");
const looks_1 = require("../data/looks");
async function seed() {
    console.log('🌱 Seeding database...\n');
    // ── 1. Pieces ──────────────────────────────────────────────────────────────
    console.log(`Inserting ${pieces_1.pieces.length} pieces...`);
    await client_1.db.insert(schema_1.pieces)
        .values(pieces_1.pieces.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        img: p.img,
        color: p.color,
        tips: p.tips,
    })))
        .onConflictDoNothing();
    console.log('✓ Pieces done\n');
    // ── 2. Looks ───────────────────────────────────────────────────────────────
    console.log(`Inserting ${looks_1.looks.length} looks...`);
    await client_1.db.insert(schema_1.looks)
        .values(looks_1.looks.map(l => ({
        id: l.id,
        title: l.title,
        tags: l.tags,
        formality: l.formality,
        tip: l.tip,
    })))
        .onConflictDoNothing();
    console.log('✓ Looks done\n');
    // ── 3. Look pieces (join table) ────────────────────────────────────────────
    const allLookPieces = looks_1.looks.flatMap(l => l.pieces.map(lp => ({
        lookId: l.id,
        pieceId: lp.pieceId,
        cat: lp.cat,
    })));
    console.log(`Inserting ${allLookPieces.length} look_pieces rows...`);
    await client_1.db.insert(schema_1.lookPieces)
        .values(allLookPieces)
        .onConflictDoNothing();
    console.log('✓ Look pieces done\n');
    console.log('🎉 Seed complete!');
    process.exit(0);
}
seed().catch(err => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});
