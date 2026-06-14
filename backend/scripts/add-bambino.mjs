/**
 * Script: adiciona Orient Bambino ao banco e atualiza looks.
 * Execute: node scripts/add-bambino.mjs
 */
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não definida no .env')
const sql = neon(process.env.DATABASE_URL)

// ── 1. Inserir peça Orient Bambino ───────────────────────────────────────────
console.log('Inserindo Orient Bambino...')
await sql`
  INSERT INTO pieces (id, name, brand, category, img, color, tips)
  VALUES (
    're-or-bam',
    'Bambino RA-AP0002S30B',
    'Orient',
    'Relógio',
    'Relogios/Orient - Bambino RA-AP0002S30B.png',
    '#92400e',
    ARRAY[
      'Dress watch clássico com mostrador creme e ponteiros dauphine — elegância atemporal',
      'Pulseira em couro marrom combina perfeitamente com sapatos burgundy, café e caramelo',
      'Mecânico automático — não precisa de bateria, carregado pelo movimento do pulso',
      'Caixa em aço de 40mm: tamanho ideal para punhos médios e looks formais',
      'Versátil entre formal e smart casual — funciona com terno, costume e blazer'
    ]
  )
  ON CONFLICT (id) DO NOTHING
`
console.log('✓ Peça inserida')

// ── 2. Atualizar look l-di04 (Terno Vinho e Overcoat Inverno) ────────────────
console.log('Atualizando look l-di04...')
await sql`
  UPDATE look_pieces
  SET piece_id = 're-or-bam'
  WHERE look_id = 'l-di04' AND piece_id = 're-pr-cit'
`
await sql`
  UPDATE looks
  SET tip = 'Overcoat Raffer sobre terno vinho: maxima elegancia de inverno. O mostrador creme do Bambino e a pulseira marrom harmonizam com o burgundy do look.'
  WHERE id = 'l-di04'
`
console.log('✓ Look l-di04 atualizado')

// ── 3. Inserir 5 novos looks com o Bambino ───────────────────────────────────
const newLooks = [
  {
    id: 'l-bam01', title: 'Marrom Decinel com Bambino',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume marrom Decinel e Orient Bambino: a pulseira marrom do relógio ecoa diretamente no tom do costume. Gravata mocha fecha a paleta terrosa com sofisticação.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato',  pieceId: 'sa-ca-at' },
      { cat: 'Cinto',   pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam02', title: 'Caramelo Homem SA com Bambino',
    tags: ['formal', 'diurno'], formality: 4,
    tip: 'Costume caramelo Homem SA com camisa branca de punho francês e Bambino: paleta quente e elegante. O mostrador creme do relógio espelha o tom areia do costume.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam03', title: 'Blazer Creme e Bambino',
    tags: ['smart casual', 'diurno'], formality: 3,
    tip: 'Blazer creme Docthos com calça areia e Orient Bambino: paleta neutra e refinada para smart casual. O relógio mecânico eleva sem pesar o look.',
    pieces: [
      { cat: 'Blazer',  pieceId: 'bl-cr-doc' },
      { cat: 'Calça',   pieceId: 'cl-ar-doc' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam04', title: 'Cinza Raffer com Bambino',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume cinza Raffer com gravata xadrez cinza e marinho: look corporativo clássico. O Bambino substitui com classe qualquer relógio de quartzo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-bam05', title: 'Linho Areia com Bambino',
    tags: ['smart casual', 'diurno', 'verão'], formality: 3,
    tip: 'Terno de linho areia Homem SA e Orient Bambino: combinação perfeita de leveza e elegância para o calor. O automático mecânico e o linho são dois clássicos atemporais.',
    pieces: [
      { cat: 'Blazer',  pieceId: 'te-ar-hsa-b' },
      { cat: 'Calça',   pieceId: 'te-ar-hsa-c' },
      { cat: 'Camisa',  pieceId: 'cs-br-alg' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
]

for (const look of newLooks) {
  console.log(`Inserindo look ${look.id}: ${look.title}...`)
  await sql`
    INSERT INTO looks (id, title, tags, formality, tip)
    VALUES (${look.id}, ${look.title}, ${look.tags}, ${look.formality}, ${look.tip})
    ON CONFLICT (id) DO NOTHING
  `
  for (const p of look.pieces) {
    await sql`
      INSERT INTO look_pieces (look_id, piece_id, cat)
      VALUES (${look.id}, ${p.pieceId}, ${p.cat})
      ON CONFLICT DO NOTHING
    `
  }
  console.log(`  ✓ ${look.title}`)
}

console.log('\n🎉 Tudo pronto! Orient Bambino está no banco.')
