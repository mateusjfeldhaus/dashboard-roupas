import { useState, useMemo, useCallback } from 'react'
import { usePieces } from '../../hooks/usePieces'
import { useLooks } from '../../hooks/useLooks'
import type { Look, LookTag, Piece } from '@data/types'
import { getTagColor } from '../../styles/tagColors'
import { LookModal } from '../Looks/LookModal'
import { PecaModal } from '../Pecas/PecaModal'
import {
  Wrapper, Panel, PanelTitle,
  SettingsGrid, FieldGroup, FieldLabel, ChipRow, Chip, DaysInput,
  ActionRow, GenerateBtn, ShuffleBtn,
  StatsBar, StatBadge,
  LookList, LookRow, LookRowBtn, LookRowTitle,
  TagRow, Tag, FormalityDots, FormalityDot, RemoveBtn,
  EmptyState, EmptyIcon,
  ProgressBar, ProgressFill, ProgressLabel,
  CatBlock, CatBlockTitle, CheckItem, Checkbox, CheckLabel, CheckCat,
  ClearCheckBtn, CopyBtn, ViewPieceBtn,
} from './Viagem.styles'

// ── Types ─────────────────────────────────────────────────────────────────────

type OccasionFilter = 'formal' | 'casual' | 'esportes' | null
type SeasonFilter   = 'verao' | 'inverno' | 'primavera' | 'outono' | null

const CAT_ORDER = [
  'Camisa','Polo','Camiseta','Costume','Blazer','Terno',
  'Calça','Sapato','Cinto','Gravata','Relógio','Suéter','Jaqueta','Acessório',
]

// ── Capsule algorithm (greedy: maximises piece reuse) ─────────────────────────

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCapsule(
  pool: Look[],
  target: number,
  seed: number
): Look[] {
  if (pool.length === 0) return []
  if (pool.length <= target) return seededShuffle(pool, seed)

  const shuffled = seededShuffle(pool, seed)
  const selected: Look[] = [shuffled[0]]
  const usedPieces = new Set(shuffled[0].pieces.map(lp => lp.pieceId))

  while (selected.length < target) {
    let best: Look | null = null
    let bestScore = -1

    for (const look of shuffled) {
      if (selected.some(s => s.id === look.id)) continue
      const ids = look.pieces.map(lp => lp.pieceId)
      const overlap = ids.filter(id => usedPieces.has(id)).length
      // score: overlap ratio + small random jitter from seed so shuffle has effect
      const score = overlap / Math.max(ids.length, 1)
      if (score > bestScore) { best = look; bestScore = score }
    }

    if (!best) break
    selected.push(best)
    best.pieces.forEach(lp => usedPieces.add(lp.pieceId))
  }

  return selected
}

function uniquePieceIds(selectedLooks: Look[]): string[] {
  const seen = new Set<string>()
  for (const look of selectedLooks) {
    for (const lp of look.pieces) seen.add(lp.pieceId)
  }
  return [...seen]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Viagem() {
  const { pieces } = usePieces()
  const { looks } = useLooks()
  const [days,     setDays]     = useState(5)
  const [occasion, setOccasion] = useState<OccasionFilter>(null)
  const [season,   setSeason]   = useState<SeasonFilter>(null)
  const [seed,     setSeed]     = useState(1)

  const [capsule,       setCapsule]       = useState<Look[]>([])
  const [generated,     setGenerated]     = useState(false)
  const [checkedIds,    setCheckedIds]    = useState<Set<string>>(new Set())
  const [modal,         setModal]         = useState<Look | null>(null)
  const [pieceModal,    setPieceModal]    = useState<Piece | null>(null)
  const [copiedMsg,     setCopiedMsg]     = useState(false)

  // ── Filtered pool ──────────────────────────────────────────────────────────
  const pool = useMemo(() => {
    let l = looks
    if (occasion) l = l.filter(x => x.tags.includes(occasion as LookTag))
    if (season)   l = l.filter(x => x.tags.includes(season   as LookTag))
    return l
  }, [looks, occasion, season])

  // ── Generate capsule ───────────────────────────────────────────────────────
  const generate = useCallback((newSeed?: number) => {
    const s = newSeed ?? seed
    const target = Math.max(days, 1)
    const result = buildCapsule(pool, target, s)
    setCapsule(result)
    setGenerated(true)
    setCheckedIds(new Set())
  }, [pool, days, seed])

  function handleGenerate() {
    const s = Math.floor(Math.random() * 999999) + 1
    setSeed(s)
    generate(s)
  }

  function handleShuffle() {
    const s = seed + 1
    setSeed(s)
    generate(s)
  }

  function removeLook(id: string) {
    setCapsule(prev => prev.filter(l => l.id !== id))
  }

  // ── Derived checklist ──────────────────────────────────────────────────────
  const allPieceIds = useMemo(() => uniquePieceIds(capsule), [capsule])

  const checklistItems = useMemo(() => {
    return allPieceIds
      .map(id => pieces.find(p => p.id === id))
      .filter(Boolean)
      .sort((a, b) => {
        const ai = CAT_ORDER.indexOf(a!.category as string)
        const bi = CAT_ORDER.indexOf(b!.category as string)
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
      }) as typeof pieces
  }, [allPieceIds, pieces])

  // group by category
  const byCategory = useMemo(() => {
    const map = new Map<string, typeof pieces>()
    for (const p of checklistItems) {
      const cat = p.category as string
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(p)
    }
    return map
  }, [checklistItems])

  const checkedCount = checkedIds.size
  const totalCount   = checklistItems.length
  const pct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0

  function toggleCheck(id: string) {
    setCheckedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function copyList() {
    const lines: string[] = [`🧳 Mala — ${days} dias\n`]
    byCategory.forEach((items, cat) => {
      lines.push(`${cat}:`)
      items.forEach(p => lines.push(`  ${checkedIds.has(p.id) ? '✓' : '□'} ${p.name}`))
    })
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopiedMsg(true)
      setTimeout(() => setCopiedMsg(false), 2000)
    })
  }

  // ── Efficiency label ───────────────────────────────────────────────────────
  const efficiency = totalCount > 0
    ? (capsule.length / totalCount).toFixed(1)
    : '—'

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Wrapper>
        {/* ── Left: settings + look list ─────────────────────────────── */}
        <Panel>
          <PanelTitle>Configurar viagem</PanelTitle>

          <SettingsGrid>
            <FieldGroup>
              <FieldLabel>Dias de viagem</FieldLabel>
              <DaysInput
                type="number" min={1} max={30} value={days}
                onChange={e => setDays(Math.max(1, Math.min(30, Number(e.target.value))))}
              />
            </FieldGroup>

            <FieldGroup>
              <FieldLabel>Ocasião</FieldLabel>
              <ChipRow>
                {(['formal','casual','esportes'] as OccasionFilter[]).map(o => (
                  <Chip key={String(o)} $active={occasion === o}
                    onClick={() => setOccasion(occasion === o ? null : o)}>
                    {o}
                  </Chip>
                ))}
              </ChipRow>
            </FieldGroup>

            <FieldGroup style={{ gridColumn: '1 / -1' }}>
              <FieldLabel>Estação</FieldLabel>
              <ChipRow>
                {(['verao','outono','inverno','primavera'] as SeasonFilter[]).map(s => (
                  <Chip key={String(s)} $active={season === s}
                    onClick={() => setSeason(season === s ? null : s)}>
                    {s}
                  </Chip>
                ))}
              </ChipRow>
            </FieldGroup>
          </SettingsGrid>

          <ActionRow>
            <GenerateBtn onClick={handleGenerate}>✈️ Gerar mala cápsula</GenerateBtn>
            {generated && (
              <ShuffleBtn onClick={handleShuffle} title="Gerar nova combinação">🔀 Novo sorteio</ShuffleBtn>
            )}
          </ActionRow>

          {generated && capsule.length > 0 && (
            <>
              <StatsBar>
                <StatBadge>{capsule.length} look{capsule.length > 1 ? 's' : ''}</StatBadge>
                <StatBadge>{totalCount} peça{totalCount > 1 ? 's' : ''} únicas</StatBadge>
                <StatBadge $accent>{efficiency} looks/peça</StatBadge>
                {pool.length < days && (
                  <StatBadge title="Menos looks disponíveis do que dias de viagem">
                    ⚠️ {pool.length}/{days} looks no filtro
                  </StatBadge>
                )}
              </StatsBar>

              <LookList>
                {capsule.map(look => (
                  <LookRow key={look.id}>
                    <LookRowBtn onClick={() => setModal(look)}>
                      <LookRowTitle>{look.title}</LookRowTitle>
                      <TagRow>
                        {look.tags.map(t => {
                          const c = getTagColor(t)
                          return (
                            <Tag key={t} style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                              {t}
                            </Tag>
                          )
                        })}
                      </TagRow>
                      <FormalityDots>
                        {[1,2,3,4,5].map(i => (
                          <FormalityDot key={i} $filled={i <= look.formality} />
                        ))}
                      </FormalityDots>
                    </LookRowBtn>
                    <RemoveBtn onClick={() => removeLook(look.id)} title="Remover do look">×</RemoveBtn>
                  </LookRow>
                ))}
              </LookList>
            </>
          )}

          {generated && capsule.length === 0 && (
            <EmptyState>
              <EmptyIcon>😕</EmptyIcon>
              Nenhum look encontrado com esses filtros.<br />
              <span style={{ fontSize: 12 }}>Tente remover a ocasião ou estação.</span>
            </EmptyState>
          )}

          {!generated && (
            <EmptyState>
              <EmptyIcon>🧳</EmptyIcon>
              Configure os dias e filtros acima, depois clique em <strong>Gerar mala cápsula</strong>.
              <br /><br />
              <span style={{ fontSize: 12 }}>
                O algoritmo seleciona os looks que compartilham mais peças entre si — menos bagagem, mais combinações.
              </span>
            </EmptyState>
          )}
        </Panel>

        {/* ── Right: checklist ──────────────────────────────────────────── */}
        <Panel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <PanelTitle style={{ marginBottom: 0 }}>Checklist de peças</PanelTitle>
            {totalCount > 0 && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <CopyBtn onClick={copyList}>{copiedMsg ? '✓ copiado' : '📋 copiar'}</CopyBtn>
                {checkedCount > 0 && (
                  <ClearCheckBtn onClick={() => setCheckedIds(new Set())}>limpar</ClearCheckBtn>
                )}
              </div>
            )}
          </div>

          {totalCount === 0 ? (
            <EmptyState style={{ padding: '32px 16px' }}>
              <EmptyIcon>📋</EmptyIcon>
              {generated
                ? 'Nenhuma peça para listar.'
                : 'Gere a mala cápsula para ver as peças necessárias aqui.'}
            </EmptyState>
          ) : (
            <>
              <ProgressLabel>
                <span>{checkedCount} de {totalCount} separadas</span>
                <span>{pct}%</span>
              </ProgressLabel>
              <ProgressBar>
                <ProgressFill $pct={pct} />
              </ProgressBar>

              {[...byCategory.entries()].map(([cat, items]) => (
                <CatBlock key={cat}>
                  <CatBlockTitle>{cat} ({items.length})</CatBlockTitle>
                  {items.map(p => (
                    <CheckItem key={p.id} $checked={checkedIds.has(p.id)}>
                      <Checkbox
                        type="checkbox"
                        checked={checkedIds.has(p.id)}
                        onChange={() => toggleCheck(p.id)}
                      />
                      <CheckLabel $checked={checkedIds.has(p.id)}>{p.name}</CheckLabel>
                      <CheckCat>{p.brand}</CheckCat>
                      <ViewPieceBtn
                        onClick={e => { e.preventDefault(); setPieceModal(p) }}
                        title="Ver peça"
                      >👁</ViewPieceBtn>
                    </CheckItem>
                  ))}
                </CatBlock>
              ))}
            </>
          )}
        </Panel>
      </Wrapper>

      {modal && <LookModal look={modal} onClose={() => setModal(null)} />}
      {pieceModal && <PecaModal piece={pieceModal} onClose={() => setPieceModal(null)} />}
    </>
  )
}
