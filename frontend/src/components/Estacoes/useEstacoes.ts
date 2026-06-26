import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import { SEASONS } from '../../styles/tags'

export const SEASON_DETAILS: Record<string, { strategy: string; tips: string[] }> = {
  verao: {
    strategy: 'Tecidos leves são o segredo. Priorize lã tropical, linho e algodão fino. A camisa branca leve e o costume azul Homem SA são seus aliados principais.',
    tips: [
      'Lã tropical do costume azul Homem SA — não esquenta',
      'Camisa branca leve + calça areia = casual perfeito',
      'Sapato loafer sem meia em looks smart casual',
      'Evite veludo e flanela',
      'Relógio com pulseira clara (azul Seiko) fica melhor no verão',
    ],
  },
  outono: {
    strategy: 'A estação mais elegante para alfaiataria. Tons terrosos (caramelo, vinho, verde musgo) estão no auge. Os suéteres entram. É quando sua coleção brilha mais.',
    tips: [
      'Costume caramelo — cores sazonais no auge',
      'Terno vinho Raffer: tons outonais perfeitos',
      'Suéter por baixo de blazer para layering elegante',
      'Tons de marrom, ferrugem e bordô em evidência',
      'Oxford burgundy + look outono = combinação dos sonhos',
    ],
  },
  inverno: {
    strategy: 'Layering é a palavra-chave. Suéter sob blazer, gravatas mais pesadas, tecidos como flanela e lã grossa entram. O terno Zegna Lã 180 foi feito para esta estação.',
    tips: [
      'Zegna Lã 180 — este é o momento dele',
      'Suéter + blazer + calça de alfaiataria = smart casual de inverno',
      'Gravatas de seda e lã ficam mais à vontade',
      'Meia grossa de lã com o Oxford',
      'Sobretudo sobre costume = nível máximo de elegância',
    ],
  },
  primavera: {
    strategy: 'Transição para cores mais vivas. Camisas com padrões (listradas, xadrez) ganham espaço. Costumes em tons médios são ideais.',
    tips: [
      'Camisa rosa listrada Homem SA se destaca na primavera',
      'Blazer creme com calça colorida — a estação permite',
      'Gravatas de padrão sutil funcionam bem',
      'Camisa azul bebê Brooksfield é primaveril por natureza',
      'Sapatos mais claros entram em cena',
    ],
  },
}

export function useEstacoes() {
  const navigate = useNavigate()
  const { looks } = useLooks()
  const [activeSeason, setActiveSeason] = useState<string>('verao')

  const seasonLooks = (tag: string) => looks.filter(l => l.tags.includes(tag as never))
  const active   = SEASONS.find(s => s.tag === activeSeason)!
  const details  = SEASON_DETAILS[activeSeason]

  return { navigate, looks, SEASONS, SEASON_DETAILS, activeSeason, setActiveSeason, seasonLooks, active, details }
}
