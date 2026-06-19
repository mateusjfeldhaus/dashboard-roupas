/**
 * Script: adiciona peças O Frances (suspensório + gravata marinho) + 10 looks.
 * Execute: node scripts/add-ofr.mjs
 */
import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não definida no .env')
const sql = neon(process.env.DATABASE_URL)

// ── 1. Inserir peças ─────────────────────────────────────────────────────────

console.log('Inserindo O Frances - Suspensório Adulto All Black...')
await sql`
  INSERT INTO pieces (id, name, brand, category, img, color, tips)
  VALUES (
    'ci-su-pr',
    'Suspensório Adulto — All Black',
    'O Frances',
    'Cinto',
    'Cintos/O Frances - Suspensorio Adulto - All Black - Preto.png',
    '#111827',
    ARRAY[
      'Suspensório substitui o cinto e eleva o nível de refinamento — detalhe que os entendedores notam',
      'All black: alças pretas, ferragem preta — coesão total com qualquer traje escuro',
      'Visível apenas na abertura do paletó, cria profundidade visual no look',
      'Use com costume ou blazer preto, chumbo ou cinza para máximo impacto',
      'Alternativa elegante ao cinto para looks de gala e eventos especiais'
    ]
  )
  ON CONFLICT (id) DO NOTHING
`
console.log('✓')

console.log('Inserindo O Frances - Gravata Slim Merino Marine...')
await sql`
  INSERT INTO pieces (id, name, brand, category, img, color, tips)
  VALUES (
    'gr-ma-ofr',
    'Gravata Slim Merino — Marine',
    'O Frances',
    'Gravata',
    'Gravatas/O Frances - Gravata Slim - Merino Marine - Marinho.png',
    '#1e3a5f',
    ARRAY[
      'Merino de alta qualidade: textura suave, queda impecável, sem brilho excessivo',
      'Marinho é a cor mais versátil depois do preto — combina com todos os tons de cinza, chumbo e azul',
      'Slim é o corte mais moderno — evita o look antiquado da gravata larga',
      'Funciona com costume marrom Decinel para contraste terra-mar sofisticado',
      'Com costume cinza Raffer = combinação mais clássica da alfaiataria europeia'
    ]
  )
  ON CONFLICT (id) DO NOTHING
`
console.log('✓')

// ── 2. Inserir looks ─────────────────────────────────────────────────────────

const looks = [
  // ── Suspensório ──────────────────────────────────────────────────────────
  {
    id: 'l-su01', title: 'All Black de Gala com Suspensório',
    tags: ['formal', 'noturno'], formality: 5,
    tip: 'Costume preto Cliffield + suspensório all black + gravata bordô: tonal escuro máximo com um único contraste. O suspensório é o detalhe que diferencia do look convencional.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-pr-cli' },
      { cat: 'Camisa',      pieceId: 'cs-br-hsa' },
      { cat: 'Gravata',     pieceId: 'gr-bv' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-ox' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-su02', title: 'Chumbo Zegna com Suspensório Elegante',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume chumbo Zegna + suspensório all black + gravata azul royal: o suspensório substitui o cinto e eleva o nível de refinamento. Look de diretoria com detalhe de alfaiate.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-ch-zeg' },
      { cat: 'Camisa',      pieceId: 'cs-br-doc' },
      { cat: 'Gravata',     pieceId: 'gr-ar-df' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-ox' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-su03', title: 'Blazer Preto + Suspensório Noturno',
    tags: ['casual', 'noturno'], formality: 3,
    tip: 'Blazer preto + calça malha preta + suspensório all black: elegância noturna sem traje completo. O suspensório é o detalhe que transforma o look casual em algo memorável.',
    pieces: [
      { cat: 'Blazer',      pieceId: 'bl-pr-doc' },
      { cat: 'Camisa',      pieceId: 'cs-br-alg' },
      { cat: 'Calça',       pieceId: 'cl-pr-doc' },
      { cat: 'Sapato',      pieceId: 'sa-pr-dem-lo' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-su04', title: 'Cinza Raffer com Suspensório',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume cinza Raffer + suspensório all black + gravata xadrez cinza: sofisticação discreta para os entendedores. O suspensório aparece apenas na abertura do paletó — detalhe de alfaiate britânico.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-ci-raf' },
      { cat: 'Camisa',      pieceId: 'cs-br-hsa' },
      { cat: 'Gravata',     pieceId: 'gr-xcm-df' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-mk' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-su05', title: 'Terno Vinho com Suspensório de Gala',
    tags: ['formal', 'noturno'], formality: 5,
    tip: 'Terno vinho Raffer + suspensório all black + gravata azul seda: contraste rico entre vinho e azul, com o suspensório adicionando textura ao tronco. Look de gala que combina elegância e personalidade.',
    pieces: [
      { cat: 'Costume',     pieceId: 'co-vi-raf' },
      { cat: 'Camisa',      pieceId: 'cs-br-hsa' },
      { cat: 'Gravata',     pieceId: 'gr-as' },
      { cat: 'Sapato',      pieceId: 'sa-pr-maj-ox' },
      { cat: 'Suspensório', pieceId: 'ci-su-pr' },
      { cat: 'Relógio',     pieceId: 're-or-bam' },
    ]
  },

  // ── Gravata Marinho ───────────────────────────────────────────────────────
  {
    id: 'l-grm01', title: 'Cinza Raffer + Gravata Marinho Clássico',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Cinza Raffer + gravata slim merino marinho: a combinação mais clássica da alfaiataria europeia. O merino tem queda impecável e textura suave que complementa o cinza médio.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ci-raf' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-grm02', title: 'Chumbo Zegna + Gravata Marinho Premium',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume chumbo Zegna + gravata merino marinho: dois tons escuros em harmonia sofisticada. O marinho aquece o chumbo frio do Zegna sem perder o rigor executivo.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ch-zeg' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
    ]
  },
  {
    id: 'l-grm03', title: 'Marrom Decinel + Gravata Marinho — Terra e Mar',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume marrom Decinel + gravata slim merino marinho: terra e mar. O marinho cria contraste inesperado e sofisticado com o marrom — look de colecionador de estilo que foge do óbvio.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-ma-dec' },
      { cat: 'Camisa',  pieceId: 'cs-br-doc' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-ca-at' },
      { cat: 'Cinto',   pieceId: 'ci-ca-at' },
      { cat: 'Relógio', pieceId: 're-or-bam' },
    ]
  },
  {
    id: 'l-grm04', title: 'Azul Homem SA + Gravata Marinho Tonal',
    tags: ['formal', 'diurno'], formality: 5,
    tip: 'Costume azul Homem SA + gravata slim merino marinho: look tonal azul com variação de profundidade. O marinho mais escuro da gravata ancora e dá peso visual ao look claro.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-az-hsa' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-or-tan' },
    ]
  },
  {
    id: 'l-grm05', title: 'Costume Preto + Gravata Marinho Noturno',
    tags: ['formal', 'noturno'], formality: 5,
    tip: 'Costume preto Cliffield + gravata merino marinho: contraste azul profundo no fundo escuro — sofisticado e moderno. Look de gala ou apresentação noturna que mantém seriedade com personalidade.',
    pieces: [
      { cat: 'Costume', pieceId: 'co-pr-cli' },
      { cat: 'Camisa',  pieceId: 'cs-br-hsa' },
      { cat: 'Gravata', pieceId: 'gr-ma-ofr' },
      { cat: 'Sapato',  pieceId: 'sa-pr-maj-ox' },
      { cat: 'Cinto',   pieceId: 'ci-pr' },
      { cat: 'Relógio', pieceId: 're-pr-cit' },
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
  console.log('  ✓')
}

console.log('\n🎉 O Frances adicionado com sucesso! (2 peças + 10 looks)')
