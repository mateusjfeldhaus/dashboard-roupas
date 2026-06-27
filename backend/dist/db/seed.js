"use strict";
/**
 * Seed script — limpa e re-popula o banco com os dados estaticos.
 * Execute: npx tsx db/seed.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("./client");
const schema_1 = require("./schema");
const pieces_1 = require("../data/pieces");
const looks_1 = require("../data/looks");
const schemas_1 = require("../lib/schemas");
function validateLookTags() {
    const errors = [];
    for (const look of looks_1.looks) {
        const seasons = look.tags.filter(t => schemas_1.SEASON_TAGS.includes(t));
        const occasions = look.tags.filter(t => schemas_1.OCCASION_TAGS.includes(t));
        const times = look.tags.filter(t => schemas_1.TIME_TAGS.includes(t));
        const dupes = look.tags.length !== new Set(look.tags).size;
        if (seasons.length > 1)
            errors.push(look.id + ': múltiplas estações — ' + seasons.join(', '));
        if (occasions.length > 1)
            errors.push(look.id + ': múltiplas ocasiões — ' + occasions.join(', '));
        if (times.length > 1)
            errors.push(look.id + ': múltiplos horários — ' + times.join(', '));
        if (dupes)
            errors.push(look.id + ': tags duplicadas — ' + look.tags.join(', '));
    }
    return errors;
}
async function seed() {
    console.log('Validating look tags...');
    const tagErrors = validateLookTags();
    if (tagErrors.length > 0) {
        console.error('ERRO: regras de tags violadas:');
        tagErrors.forEach(e => console.error('  ' + e));
        process.exit(1);
    }
    console.log('Tags OK (' + looks_1.looks.length + ' looks validados)');
    console.log('Seeding database...');
    console.log('Wiping existing data...');
    await client_1.db.delete(schema_1.lookPhotos);
    await client_1.db.delete(schema_1.usageRecords);
    await client_1.db.delete(schema_1.ratings);
    await client_1.db.delete(schema_1.lookPieces);
    await client_1.db.delete(schema_1.looks);
    await client_1.db.delete(schema_1.pieces);
    console.log('Wipe done');
    console.log('Inserting ' + pieces_1.pieces.length + ' pieces...');
    await client_1.db.insert(schema_1.pieces).values(pieces_1.pieces.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
        img: p.img,
        color: p.color,
        tips: p.tips,
    })));
    console.log('Pieces done');
    console.log('Inserting ' + looks_1.looks.length + ' looks...');
    await client_1.db.insert(schema_1.looks).values(looks_1.looks.map(l => ({
        id: l.id,
        title: l.title,
        tags: l.tags,
        formality: l.formality,
        tip: l.tip,
    })));
    console.log('Looks done');
    const allLookPieces = looks_1.looks.flatMap(l => l.pieces.map(lp => ({
        lookId: l.id,
        pieceId: lp.pieceId,
        cat: lp.cat,
    })));
    console.log('Inserting ' + allLookPieces.length + ' look_pieces rows (in chunks)...');
    const CHUNK = 200;
    for (let i = 0; i < allLookPieces.length; i += CHUNK) {
        const chunk = allLookPieces.slice(i, i + CHUNK);
        await client_1.db.insert(schema_1.lookPieces).values(chunk);
        console.log('  chunk ' + (i / CHUNK + 1) + '/' + Math.ceil(allLookPieces.length / CHUNK) + ' done (' + Math.min(i + CHUNK, allLookPieces.length) + '/' + allLookPieces.length + ')');
    }
    console.log('Look pieces done');
    console.log('Seed complete!');
    process.exit(0);
}
seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
