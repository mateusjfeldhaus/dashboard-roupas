/**
 * Adiciona itens faltantes à wishlist.
 * Execute: npx tsx scripts/add-wishlist.ts
 */

import 'dotenv/config'
import { db } from '../db/client'
import { wishlistItems } from '../db/schema'

const items = [
  // ── CRÍTICO ──────────────────────────────────────────────────────────────────
  {
    name:     'Jeans Azul',
    category: 'Calça',
    brand:    '',
    priority: 1,
    notes:    'Base de 30%+ dos looks casuais. Só existe jeans preto. Azul médio ou escuro — Levi\'s 511 ou 512.',
  },
  {
    name:     'Abotoaduras Clássicas',
    category: 'Acessório',
    brand:    '',
    priority: 1,
    notes:    'Necessário para usar a Homem SA Punho Francês (cs-br-hsa) e Brooksfield Fio 200 (cs-ab-brk). Ambas estão bloqueadas sem abotoaduras.',
  },
  {
    name:     'Tênis Branco',
    category: 'Sapato',
    brand:    '',
    priority: 1,
    notes:    '23 sapatos no armário, zero tênis. Para looks com camiseta e jeans não existe opção casual relaxada. New Balance 574 ou similar clássico.',
  },
  {
    name:     'Polo Branca',
    category: 'Polo',
    brand:    '',
    priority: 1,
    notes:    'A polo mais versátil está faltando. Combina com qualquer calça. Das 5 polos (petróleo, verde, vermelha, creme, rosa) nenhuma é branca.',
  },
  // ── ALTO ─────────────────────────────────────────────────────────────────────
  {
    name:     'Polo Preta',
    category: 'Polo',
    brand:    '',
    priority: 2,
    notes:    'Completa o trio básico de polos. Com calça cinza ou bege forma look casual elegante.',
  },
  {
    name:     'Camiseta Cinza',
    category: 'Camiseta',
    brand:    '',
    priority: 2,
    notes:    'Tríade básica: branca (Individual) ✓, preta (Malwee) ✓, cinza ✗. Cinza é o tom mais versátil com blazer.',
  },
  {
    name:     'Suéter Cinza Médio',
    category: 'Suéter',
    brand:    '',
    priority: 2,
    notes:    '5 suéteres: 3 pretos, 1 branco, 1 petróleo. Cinza médio combina com mais blazers que qualquer outro tom e está faltando.',
  },
  {
    name:     'Calça Chino Marinho',
    category: 'Calça',
    brand:    '',
    priority: 2,
    notes:    'Smart casual do dia a dia fica restrito a linho (calor) ou alfaiataria (formal). Chino marinho preenche o meio-termo. Cor mais versátil para chino.',
  },
  // ── MODERADO ─────────────────────────────────────────────────────────────────
  {
    name:     'Lenço de Bolso Branco',
    category: 'Acessório',
    brand:    '',
    priority: 2,
    notes:    'Tem lenço preto e vermelho. O branco é o mais clássico e mais usado em looks formais. Custo mínimo, impacto alto.',
  },
  {
    name:     'Calça Alfaiataria Off-White ou Bege',
    category: 'Calça',
    brand:    '',
    priority: 2,
    notes:    'Perfeita para blazers coloridos (vinho, verde, azul royal) no verão formal. Linho ou gabardine.',
  },
  // ── BAIXO ────────────────────────────────────────────────────────────────────
  {
    name:     'Calça Chino Verde-Oliva',
    category: 'Calça',
    brand:    '',
    priority: 3,
    notes:    'Diversifica o smart casual sem ser redundante. Combina com blazer caramelo, preto e areia.',
  },
  {
    name:     'Cardigan',
    category: 'Suéter',
    brand:    '',
    priority: 3,
    notes:    'Camada diferente do suéter pullover — mais casual e fácil de remover. Ótimo sobre camisa social.',
  },
  {
    name:     'Cinto Marinho',
    category: 'Cinto',
    brand:    '',
    priority: 3,
    notes:    'Para fechar looks com calça e polo/camiseta marinho. Completa a paleta tonal.',
  },
]

async function run() {
  console.log('Inserindo ' + items.length + ' itens na wishlist...')

  for (const item of items) {
    const [created] = await db.insert(wishlistItems)
      .values({ ...item, id: crypto.randomUUID(), link: '', purchased: false })
      .returning()
    console.log('  ✓ ' + created.name + ' [prioridade ' + created.priority + ']')
  }

  console.log('\nWishlist atualizada com ' + items.length + ' itens.')
  process.exit(0)
}

run().catch(err => {
  console.error('Erro:', err)
  process.exit(1)
})
