import { useState } from 'react'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import { LookModal } from '../Looks/LookModal'
import {
  Grid, SeasonCard, SeasonHeader, SeasonEmoji, SeasonName, LookCount,
  Strategy, TipsList, TipItem,
  SectionTitle, LookGrid, LookCard, LookTitle, LookTags, Tag,
  EmptyNote,
} from './Estacoes.styles'

const seasons = [
  {
    id: 'verao',
    name: 'Verão',
    emoji: '☀️',
    color: '#f59e0b',
    strategy: 'Tecidos leves são o segredo. Priorize lã tropical, linho e algodão fino. A camisa branca leve e o costume azul Homem SA são seus aliados principais.',
    tips: [
      'Lã tropical do costume azul Homem SA — não esquenta',
      'Camisa branca leve + calça areia = casual perfeito',
      'Sapato loafer sem meia em looks smart casual',
      'Evite veludo e flanela',
      'Relógio com pulseira clara (azul Seiko) fica melhor no verão',
    ],
    tagFilter: 'verao' as const,
  },
  {
    id: 'outono',
    name: 'Outono',
    emoji: '🍂',
    color: '#c2410c',
    strategy: 'A estação mais elegante para alfaiataria. Tons terrosos (caramelo, vinho, verde musgo) estão no auge. Os suéteres entram. É quando sua coleção brilha mais.',
    tips: [
      'Costume caramelo — cores sazonais no auge',
      'Terno vinho Raffer: tons outonais perfeitos',
      'Suéter por baixo de blazer para layering elegante',
      'Tons de marrom, ferrugem e bordô em evidência',
      'Oxford burgundy + look outono = combinação dos sonhos',
    ],
    tagFilter: 'outono' as const,
  },
  {
    id: 'inverno',
    name: 'Inverno',
    emoji: '🧥',
    color: '#6366f1',
    strategy: 'Layering é a palavra-chave. Suéter sob blazer, gravatas mais pesadas, tecidos como flanela e lã grossa entram. O terno Zegna Lã 180 foi feito para esta estação.',
    tips: [
      'Zegna Lã 180 — este é o momento dele',
      'Suéter + blazer + calça de alfaiataria = smart casual de inverno',
      'Gravatas de seda e lã ficam mais à vontade',
      'Meia grossa de lã com o Oxford',
      'Sobretudo sobre costume = nível máximo de elegância',
    ],
    tagFilter: 'inverno' as const,
  },
  {
    id: 'primavera',
    name: 'Primavera',
    emoji: '🌸',
    color: '#10b981',
    strategy: 'Transição para cores mais vivas. Camisas com padrões (listradas, xadrez) ganham espaço. Costumes em tons médios são ideais.',
    tips: [
      'Camisa rosa listrada Homem SA se destaca na primavera',
      'Blazer creme com calça colorida — a estação permite',
      'Gravatas de padrão sutil funcionam bem',
      'Camisa azul bebê Brooksfield é primaveril por natureza',
      'Sapatos mais claros entram em cena',
    ],
    tagFilter: 'primavera' as const,
  },
]

export function Estacoes() {
  const { looks } = useLooks()
  const [activeSeason, setActiveSeason] = useState<string>('verao')
  const [modal, setModal] = useState<Look | null>(null)

  const seasonLooks = (tag: string) =>
    looks.filter(l => l.tags.includes(tag as never))

  const active = seasons.find(s => s.id === activeSeason)!

  return (
    <>
      <Grid>
        {seasons.map(s => {
          const count = seasonLooks(s.tagFilter).length
          return (
            <SeasonCard
              key={s.id}
              $color={s.color}
              $active={activeSeason === s.id}
              onClick={() => setActiveSeason(s.id)}
            >
              <SeasonHeader>
                <SeasonEmoji>{s.emoji}</SeasonEmoji>
                <SeasonName>{s.name}</SeasonName>
                <LookCount $color={s.color}>{count} looks</LookCount>
              </SeasonHeader>
              <Strategy>{s.strategy}</Strategy>
              <TipsList>
                {s.tips.map((tip, i) => <TipItem key={i}>{tip}</TipItem>)}
              </TipsList>
            </SeasonCard>
          )
        })}
      </Grid>

      <SectionTitle $color={active.color}>
        {active.emoji} Todos os Looks de {active.name}
      </SectionTitle>

      {seasonLooks(active.tagFilter).length > 0 ? (
        <LookGrid>
          {seasonLooks(active.tagFilter).map(l => (
            <LookCard key={l.id} onClick={() => setModal(l)}>
              <LookTitle>{l.title}</LookTitle>
              <LookTags>
                {l.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
              </LookTags>
            </LookCard>
          ))}
        </LookGrid>
      ) : (
        <EmptyNote>Nenhum look com tag {active.tagFilter} cadastrado.</EmptyNote>
      )}

      {modal && <LookModal look={modal} onClose={() => setModal(null)} />}
    </>
  )
}
