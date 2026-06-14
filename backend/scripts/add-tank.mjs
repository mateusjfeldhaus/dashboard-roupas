/**
 * Script: adiciona Orient Tank GBSC1013 ao banco + 5 looks.
 * Execute: node scripts/add-tank.mjs
 */
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não definida no .env')
const sql = neon(process.env.DATABASE_URL)

// ── 1. Inserir peça ──────────────────────────────────────────────────────────
console.log('Inserindo Orient Tank GBSC1013...')
await sql`
  INSERT INTO pieces (id, name, brand, category, img, color, tips)
  VALUES (
    're-or-tan',
    'Tank GBSC1013',
    'Orient',
    'Relógio',
    'Relogios/Orient - Tank GBSC1013.png',
    '#d4af37',
    ARRAY[
      'Design retangular inspirado no clássico Tank — referência ao relógio de pulso mais icônico da história',
      'Mostrador dourado e índices aplicados: elegância vintage com acabamento contemporâneo',
      'Mecânico automático Orient — confiabilidade japonesa sem precisar de bateria',
      'Combina com looks terrosos, caramelo, chumbo e azul — versátil entre formal e smart casual',
      'O formato tank estreito cai muito bem em punhos médios com manga de camisa social'
    ]
  )
  ON CONFLICT (id) DO NOTHING
`
console.log('✓ Peça inserida')

// ── 2. Inserir looks ─────────────────────────────────────────────────────────
const looks = [
  {
    id: 'l-tan01', title: 'Caramelo com Tank Dourado',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume caramelo Homem SA e Tank dourado: a caixa retangular dourada amplifica o tom quente do caramelo. Um dos combos mais elegantes do guarda-roupa.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ca-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan02', title: 'Marrom Decinel com Tank',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume marrom Decinel, gravata mocha e Tank dourado: paleta terrosa de cima a baixo. O dourado do relógio aquece ainda mais o look.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-mm-df' },
      { cat: 'Sapato',  pieceId: 'sa-ca-at' },
      { cat: 'Cinto',   pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan03', title: 'Azul Homem SA com Tank',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume azul Homem SA com Tank dourado: contraste clássico azul e ouro — combinação de alfaiataria italiana.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-ar-df' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan04', title: 'Chumbo Zegna com Tank',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume chumbo Zegna com Tank dourado: o dourado cria um contraste luxuoso contra o cinza frio. Look de alto impacto para reuniões de peso.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-xcm-df' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-tan05', title: 'Blazer Creme com Tank',
    tags: ['smart casual', 'diurno'], formality: 3,
    tip: 'Blazer creme com calça areia e Tank dourado: paleta neutra quente onde o relógio é o único ponto de brilho.',
    pieces: [
      { cat: 'Blazer',  pieceId: 'bl-cr-doc' },
      { cat: 'Calça',   pieceId: 'cl-ar-doc' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Sapato',  pieceId: 'sa-ta-maj' },
      { cat: 'Cinto',   pieceId: 'ci-ta-at' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
]

for (const look of looks) {
  console.log(`Inserindo ${look.id}: ${look.title}...`)
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
  console.log(`  ✓`)
}

console.log('\n🎉 Orient Tank GBSC1013 adicionado com sucesso!')
