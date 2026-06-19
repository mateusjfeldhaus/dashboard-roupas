import api from '../../api/client'
import { useState, useMemo, useEffect } from 'react'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import { SEASONS, OCCASIONS } from '../../styles/tags'
import { LookModal } from '../Looks/LookModal'
import {
  Wrap, Intro,
  FilterSection, FilterGroup, GroupLabel, ChipRow, Chip,
  ActionRow, SuggestBtn, ShuffleBtn, MatchCount,
  ResultsTitle, LookGrid, LookCard, LookNum, LookTitle, TagRow, Tag, FormalityRow, Dot,
  NoMatch,
  CooldownRow, CooldownLabel, CooldownChip,
  FreshnessBar, FreshnessFill,
  LastWornBadge, WarnIcon,
} from './Planejador.styles'

type Period   = 'diurno' | 'noturno'
type Season   = typeof SEASONS[number]['tag']
type Occasion = 'formal' | 'casual' | 'esportes'

interface UsageSummary {
  [lookId: string]: { count: number; lastDate: string | null; dates: string[] }
}

const COOLDOWN_OPTIONS = [
  { days: 7,  label: '7 dias'  },
  { days: 14, label: '14 dias' },
  { days: 30, label: '30 dias' },
]

const periodOptions:   { id: Period;   label: string }[] = [
  { id: 'diurno',    label: 'Diurno'   },
  { id: 'noturno',   label: 'Noturno'  },
]
const seasonOptions   = SEASONS.map(s => ({ id: s.tag as Season, label: `${s.emoji} ${s.label}` }))
const occasionOptions = OCCASIONS.filter(o => o.tag !== 'diurno' && o.tag !== 'noturno')
                                 .map(o => ({ id: o.tag as Occasion, label: o.label }))

// ── Helpers ──────────────────────────────────────────────────────────────────

function daysSince(dateStr: string | null): number | null {
  if (!dateStr) return null
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// Seeded shuffle — mesma seed → mesmo resultado; seed diferente → ordem diferente
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = (seed + 1) * 1664525 + 1013904223
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Agrupa em fresh (nunca usado ou fora do cooldown) e recent (dentro do cooldown),
// embaralha cada grupo com a seed e retorna fresh primeiro.
// Assim "Novo sorteio" sempre traz resultados diferentes dentro de cada grupo.
function getRotatedSuggestions(
  filtered: Look[],
  usage: UsageSummary,
  cooldown: number,
  seed: number,
): Look[] {
  const fresh: Look[] = []
  const recent: Look[] = []
  for (const look of filtered) {
    const days = daysSince(usage[look.id]?.lastDate ?? null)
    if (days === null || days >= cooldown) fresh.push(look)
    else recent.push(look)
  }
  return [...seededShuffle(fresh, seed), ...seededShuffle(recent, seed)]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Planejador() {
  const { looks } = useLooks()
  const [period,    setPeriod]   = useState<Period | null>(null)
  const [season,    setSeason]   = useState<Season | null>(null)
  const [occasion,  setOccasion] = useState<Occasion | null>(null)
  const [seed,      setSeed]     = useState(0)
  const [showed,    setShowed]   = useState(false)
  const [modal,     setModal]    = useState<Look | null>(null)
  const [cooldown,  setCooldown] = useState(14)
  const [usage,     setUsage]    = useState<UsageSummary>({})

  // Fetch usage summary once on mount
  useEffect(() => {
    api.get('/api/usage')
      .then(r => setUsage(((r.data as {summary?: UsageSummary}).summary) ?? {}))
      .catch(() => {})
  }, [])

  // Re-fetch after closing modal (might have recorded a use)
  function handleModalClose() {
    setModal(null)
    api.get('/api/usage')
      .then(r => setUsage(((r.data as {summary?: UsageSummary}).summary) ?? {}))
      .catch(() => {})
  }

  const filtered = useMemo(() => {
    return looks.filter(l => {
      if (period   && !l.tags.includes(period))   return false
      if (season   && !l.tags.includes(season))   return false
      if (occasion && !l.tags.includes(occasion as import('@data/types').LookTag)) return false
      return true
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, season, occasion])

  // Rotação inteligente: fresh primeiro, depois recentes — ambos embaralhados com seed
  const suggestions = useMemo(() => {
    return getRotatedSuggestions(filtered, usage, cooldown, seed).slice(0, 3)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, usage, cooldown, seed])

  const toggle = <T,>(current: T | null, value: T, set: (v: T | null) => void) => {
    set(current === value ? null : value)
    setShowed(false)
  }

  const handleSuggest = () => {
    setSeed(s => s + 1)
    setShowed(true)
  }

  const noFilters = !period && !season && !occasion

  return (
    <Wrap>
      <Intro>
        Escolha os critérios do look que você precisa hoje. Looks usados recentemente ficam no final da fila.
      </Intro>

      <FilterSection>
        <FilterGroup>
          <GroupLabel>Período</GroupLabel>
          <ChipRow>
            {periodOptions.map(o => (
              <Chip key={o.id} $active={period === o.id} $tag={o.id}
                onClick={() => toggle(period, o.id, setPeriod)}>
                {o.label}
              </Chip>
            ))}
          </ChipRow>
        </FilterGroup>

        <FilterGroup>
          <GroupLabel>Estação</GroupLabel>
          <ChipRow>
            {seasonOptions.map(o => (
              <Chip key={o.id} $active={season === o.id} $tag={o.id}
                onClick={() => toggle(season, o.id, setSeason)}>
                {o.label}
              </Chip>
            ))}
          </ChipRow>
        </FilterGroup>

        <FilterGroup>
          <GroupLabel>Ocasião</GroupLabel>
          <ChipRow>
            {occasionOptions.map(o => (
              <Chip key={o.id} $active={occasion === o.id} $tag={o.id}
                onClick={() => toggle(occasion, o.id, setOccasion)}>
                {o.label}
              </Chip>
            ))}
          </ChipRow>
        </FilterGroup>

        {/* Cooldown threshold */}
        <FilterGroup>
          <CooldownRow>
            <CooldownLabel>Evitar reuso em menos de</CooldownLabel>
            <ChipRow>
              {COOLDOWN_OPTIONS.map(o => (
                <CooldownChip
                  key={o.days}
                  $active={cooldown === o.days}
                  onClick={() => setCooldown(o.days)}
                >
                  {o.label}
                </CooldownChip>
              ))}
            </ChipRow>
          </CooldownRow>
        </FilterGroup>
      </FilterSection>

      <ActionRow>
        <SuggestBtn onClick={handleSuggest}>
          Sugerir looks
        </SuggestBtn>
        {showed && (
          <ShuffleBtn onClick={() => setSeed(s => s + 1)}>
            🔀 Novo sorteio
          </ShuffleBtn>
        )}
        {showed && (
          <MatchCount>
            {filtered.length} look{filtered.length !== 1 ? 's' : ''}{' '}
            {noFilters ? 'no total' : `encontrado${filtered.length !== 1 ? 's' : ''}`}
          </MatchCount>
        )}
      </ActionRow>

      {showed && suggestions.length === 0 && (
        <NoMatch>
          Nenhum look cadastrado combina com todos esses critérios.<br />
          Tente remover algum filtro.
        </NoMatch>
      )}

      {showed && suggestions.length > 0 && (
        <>
          <ResultsTitle>Sugestões de hoje</ResultsTitle>
          <LookGrid>
            {suggestions.map((l, i) => {
              const info = usage[l.id]
              const days = daysSince(info?.lastDate ?? null)
              const isRecent = days !== null && days < cooldown
              const freshPct = days === null
                ? 100
                : Math.min(100, Math.round((days / cooldown) * 100))

              return (
                <LookCard key={l.id} $dimmed={isRecent} onClick={() => setModal(l)}>
                  <LookNum>Opção {i + 1}</LookNum>
                  <LookTitle>{l.title}</LookTitle>
                  <TagRow>
                    {l.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
                  </TagRow>
                  <FormalityRow>
                    {[1,2,3,4,5].map(n => <Dot key={n} $filled={n <= l.formality} />)}
                  </FormalityRow>

                  {/* Freshness bar */}
                  <FreshnessBar>
                    <FreshnessFill $pct={freshPct} $recent={isRecent} />
                  </FreshnessBar>

                  {/* Last worn info */}
                  {days === null ? (
                    <LastWornBadge $recent={false}>✨ Nunca usado</LastWornBadge>
                  ) : isRecent ? (
                    <LastWornBadge $recent={true}>
                      <WarnIcon>⚠</WarnIcon> Usado há {days} dia{days !== 1 ? 's' : ''}
                    </LastWornBadge>
                  ) : (
                    <LastWornBadge $recent={false}>
                      🗓 Último uso: {days} dias atrás
                    </LastWornBadge>
                  )}
                </LookCard>
              )
            })}
          </LookGrid>
        </>
      )}

      {modal && <LookModal look={modal} onClose={handleModalClose} />}
    </Wrap>
  )
}
