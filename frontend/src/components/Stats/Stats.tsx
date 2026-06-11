import { useState, useEffect, useMemo } from 'react'
import { useLooks } from '../../hooks/useLooks'
import { usePieces } from '../../hooks/usePieces'
import { getTagColor } from '../../styles/tagColors'
import api from '../../api/client'
import {
  PageHeader, PageTitle, PeriodRow, PeriodChip,
  MetricsGrid, MetricCard, MetricNum, MetricLabel,
  TwoCol, ThreeCol, Section, SectionTitle,
  ChartWrap, BarChart,
  DistRow, DistLabel, DistBarWrap, DistBarFill, DistCount,
  RankedList, RankedItem, RankNum, RankName, RankBadge, RankSub,
  FormalRow, FDot,
  EmptyState, LoadingMsg, InsightBanner,
} from './Stats.styles'

// ── Types ─────────────────────────────────────────────────────────────────────

interface UsageRecord { lookId: string; date: string }

type Period = 'all' | 'year' | '6m' | '30d'

const PERIOD_LABELS: Record<Period, string> = {
  all: 'Tudo', year: 'Este ano', '6m': '6 meses', '30d': '30 dias',
}

// ── Date helpers ──────────────────────────────────────────────────────────────

function cutoffDate(period: Period): string | null {
  if (period === 'all') return null
  const d = new Date()
  if (period === '30d')  d.setDate(d.getDate() - 30)
  if (period === '6m')   d.setMonth(d.getMonth() - 6)
  if (period === 'year') d.setMonth(0); d.setDate(1)
  return d.toISOString().split('T')[0]
}

function calcStreak(records: UsageRecord[]): { current: number; max: number } {
  if (records.length === 0) return { current: 0, max: 0 }
  const days = [...new Set(records.map(r => r.date))].sort()
  let max = 1; let cur = 1
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]); const curr = new Date(days[i])
    const diff = (curr.getTime() - prev.getTime()) / 86400000
    if (diff === 1) { cur++; max = Math.max(max, cur) }
    else cur = 1
  }
  // current streak: is today or yesterday the last entry?
  const today = new Date().toISOString().split('T')[0]
  const yest  = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const last  = days[days.length - 1]
  const currentStreak = (last === today || last === yest) ? cur : 0
  return { current: currentStreak, max }
}

function avgPerWeek(records: UsageRecord[], totalDays: number): string {
  if (records.length === 0 || totalDays === 0) return '0'
  return (records.length / (totalDays / 7)).toFixed(1)
}

function last12Months(): { key: string; label: string }[] {
  const months = []
  for (let i = 11; i >= 0; i--) {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - i)
    const key   = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
    months.push({ key, label })
  }
  return months
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Stats() {
  const { looks } = useLooks()
  const { pieces } = usePieces()
  const [allRecords, setAllRecords] = useState<UsageRecord[]>([])
  const [loading,    setLoading]    = useState(true)
  const [period,     setPeriod]     = useState<Period>('all')

  useEffect(() => {
    api.get<{ records: UsageRecord[] }>('/api/usage')
      .then(r => { setAllRecords(r.data.records ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // ── Filtered records ───────────────────────────────────────────────────────
  const records = useMemo(() => {
    const cutoff = cutoffDate(period)
    if (!cutoff) return allRecords
    return allRecords.filter(r => r.date >= cutoff)
  }, [allRecords, period])

  // ── Streak (always from all records) ──────────────────────────────────────
  const streak = useMemo(() => calcStreak(allRecords), [allRecords])

  // ── Period span in days ────────────────────────────────────────────────────
  const periodDays = useMemo(() => {
    if (records.length === 0) return 0
    if (period === 'all') {
      const first = new Date(records[0].date)
      const last  = new Date(records[records.length - 1].date)
      return Math.max(1, Math.round((last.getTime() - first.getTime()) / 86400000) + 1)
    }
    return period === '30d' ? 30 : period === '6m' ? 180 : 365
  }, [records, period])

  // ── Core metrics ───────────────────────────────────────────────────────────
  const uniqueWorn    = useMemo(() => new Set(records.map(r => r.lookId)).size, [records])
  const neverWorn     = useMemo(() => looks.filter(l => !new Set(allRecords.map(r => r.lookId)).has(l.id)).length, [allRecords])

  // ── Monthly activity (always last 12 months) ───────────────────────────────
  const monthData = useMemo(() => {
    const months = last12Months()
    return months.map(m => ({
      ...m,
      count: allRecords.filter(r => r.date.startsWith(m.key)).length,
    }))
  }, [allRecords])
  const maxMonth = Math.max(...monthData.map(m => m.count), 1)

  // ── Top looks ──────────────────────────────────────────────────────────────
  const topLooks = useMemo(() => {
    const freq: Record<string, number> = {}
    records.forEach(r => { freq[r.lookId] = (freq[r.lookId] ?? 0) + 1 })
    return Object.entries(freq)
      .map(([id, count]) => ({ look: looks.find(l => l.id === id), count }))
      .filter(x => x.look)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) as { look: (typeof looks)[0]; count: number }[]
  }, [records])

  // ── Never worn looks ───────────────────────────────────────────────────────
  const neverWornLooks = useMemo(() => {
    const worn = new Set(allRecords.map(r => r.lookId))
    return looks.filter(l => !worn.has(l.id)).slice(0, 6)
  }, [allRecords])

  // ── Tag distribution ───────────────────────────────────────────────────────
  const tagDist = useMemo(() => {
    const tagLooksUsed: Record<string, number> = {}
    records.forEach(r => {
      const look = looks.find(l => l.id === r.lookId)
      if (!look) return
      look.tags.forEach(t => { tagLooksUsed[t] = (tagLooksUsed[t] ?? 0) + 1 })
    })
    return Object.entries(tagLooksUsed)
      .sort((a, b) => b[1] - a[1])
  }, [records])

  // ── Formality distribution ─────────────────────────────────────────────────
  const formalDist = useMemo(() => {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    records.forEach(r => {
      const look = looks.find(l => l.id === r.lookId)
      if (look) dist[look.formality] = (dist[look.formality] ?? 0) + 1
    })
    return [1,2,3,4,5].map(f => ({ level: f, count: dist[f] }))
  }, [records])
  const maxFormal = Math.max(...formalDist.map(f => f.count), 1)

  // ── Top pieces (derived from worn looks) ───────────────────────────────────
  const topPieces = useMemo(() => {
    const freq: Record<string, number> = {}
    records.forEach(r => {
      const look = looks.find(l => l.id === r.lookId)
      if (!look) return
      look.pieces.forEach(lp => { freq[lp.pieceId] = (freq[lp.pieceId] ?? 0) + 1 })
    })
    return Object.entries(freq)
      .map(([id, count]) => ({ piece: pieces.find(p => p.id === id), count }))
      .filter(x => x.piece)
      .sort((a, b) => b.count - a.count)
      .slice(0, 8) as { piece: (typeof pieces)[0]; count: number }[]
  }, [records])

  // ── Insight text ───────────────────────────────────────────────────────────
  const insight = useMemo(() => {
    if (records.length === 0) return null
    const parts: string[] = []
    const thisMonth = new Date().toISOString().slice(0, 7)
    const thisMonthCount = allRecords.filter(r => r.date.startsWith(thisMonth)).length
    if (thisMonthCount > 0) parts.push(`${thisMonthCount} uso${thisMonthCount > 1 ? 's' : ''} este mês`)
    if (streak.current >= 3) parts.push(`sequência ativa de ${streak.current} dias 🔥`)
    if (topLooks.length > 0) parts.push(`look favorito: "${topLooks[0].look.title}" (${topLooks[0].count}×)`)
    if (neverWorn > 0) parts.push(`${neverWorn} look${neverWorn > 1 ? 's' : ''} nunca usados`)
    return parts.length ? parts.join(' · ') : null
  }, [records, allRecords, streak, topLooks, neverWorn])

  // ── Bar chart SVG ──────────────────────────────────────────────────────────
  const chartW = 600; const chartH = 100; const barW = 36; const gap = 10
  const totalBars = monthData.length
  const svgW = totalBars * (barW + gap) - gap

  if (loading) return <LoadingMsg>Carregando estatísticas…</LoadingMsg>
  if (allRecords.length === 0) return (
    <EmptyState>
      Nenhum look registrado ainda.<br />
      Use o botão + no LookModal para registrar seus usos.
    </EmptyState>
  )

  return (
    <>
      <PageHeader>
        <PageTitle>Estatísticas</PageTitle>
        <PeriodRow>
          {(Object.keys(PERIOD_LABELS) as Period[]).map(p => (
            <PeriodChip key={p} $active={period === p} onClick={() => setPeriod(p)}>
              {PERIOD_LABELS[p]}
            </PeriodChip>
          ))}
        </PeriodRow>
      </PageHeader>

      {insight && <InsightBanner>✨ {insight}</InsightBanner>}

      {/* ── Key metrics ──────────────────────────────────────────────────── */}
      <MetricsGrid>
        <MetricCard $accent>
          <MetricNum $accent>{records.length}</MetricNum>
          <MetricLabel>Total de usos</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricNum>{uniqueWorn}</MetricNum>
          <MetricLabel>Looks usados</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricNum>{looks.length - uniqueWorn}</MetricNum>
          <MetricLabel>Não usados (período)</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricNum>{neverWorn}</MetricNum>
          <MetricLabel>Nunca usados</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricNum>{streak.current > 0 ? `${streak.current}d` : '—'}</MetricNum>
          <MetricLabel>Streak atual</MetricLabel>
        </MetricCard>
        <MetricCard>
          <MetricNum>{avgPerWeek(records, periodDays)}</MetricNum>
          <MetricLabel>Média/semana</MetricLabel>
        </MetricCard>
      </MetricsGrid>

      {/* ── Monthly activity ──────────────────────────────────────────────── */}
      <Section>
        <SectionTitle>Atividade por mês (últimos 12 meses)</SectionTitle>
        <ChartWrap>
          <BarChart
            width={svgW}
            height={chartH + 32}
            viewBox={`0 0 ${svgW} ${chartH + 32}`}
            style={{ minWidth: svgW }}
          >
            {monthData.map((m, i) => {
              const x     = i * (barW + gap)
              const barH  = m.count > 0 ? Math.max(4, Math.round((m.count / maxMonth) * chartH)) : 2
              const y     = chartH - barH
              const isNow = m.key === new Date().toISOString().slice(0, 7)
              return (
                <g key={m.key}>
                  <rect
                    x={x} y={y} width={barW} height={barH}
                    rx="4"
                    fill={isNow ? '#c8a96e' : m.count > 0 ? '#c8a96e66' : '#2a2520'}
                  />
                  {m.count > 0 && (
                    <text x={x + barW / 2} y={y - 4} textAnchor="middle"
                      fill="#8a8070" fontSize="9" fontWeight="600">
                      {m.count}
                    </text>
                  )}
                  <text x={x + barW / 2} y={chartH + 20} textAnchor="middle"
                    fill={isNow ? '#c8a96e' : '#8a8070'} fontSize="9" fontWeight={isNow ? '700' : '500'}>
                    {m.label}
                  </text>
                </g>
              )
            })}
          </BarChart>
        </ChartWrap>
      </Section>

      <TwoCol>
        {/* ── Top looks ────────────────────────────────────────────────── */}
        <Section style={{ marginBottom: 0 }}>
          <SectionTitle>Looks mais usados</SectionTitle>
          {topLooks.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem dados no período.</p>
          ) : (
            <RankedList>
              {topLooks.map(({ look, count }, i) => (
                <RankedItem key={look.id}>
                  <RankNum>{i + 1}</RankNum>
                  <RankName>{look.title}</RankName>
                  <RankBadge>{count}×</RankBadge>
                </RankedItem>
              ))}
            </RankedList>
          )}
        </Section>

        {/* ── Top pieces ───────────────────────────────────────────────── */}
        <Section style={{ marginBottom: 0 }}>
          <SectionTitle>Peças mais vestidas</SectionTitle>
          {topPieces.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem dados no período.</p>
          ) : (
            <RankedList>
              {topPieces.map(({ piece, count }, i) => (
                <RankedItem key={piece.id}>
                  <RankNum>{i + 1}</RankNum>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <RankName>{piece.name}</RankName>
                    <br />
                    <RankSub>{piece.category}</RankSub>
                  </div>
                  <RankBadge>{count}×</RankBadge>
                </RankedItem>
              ))}
            </RankedList>
          )}
        </Section>
      </TwoCol>

      <ThreeCol>
        {/* ── Tag distribution ─────────────────────────────────────────── */}
        <Section style={{ marginBottom: 0 }}>
          <SectionTitle>Por tag</SectionTitle>
          {tagDist.length === 0
            ? <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem dados.</p>
            : tagDist.map(([tag, count]) => {
                const c   = getTagColor(tag)
                const pct = Math.round((count / records.length) * 100)
                return (
                  <DistRow key={tag}>
                    <DistLabel>{tag}</DistLabel>
                    <DistBarWrap>
                      <DistBarFill $pct={pct} $color={c.text} />
                    </DistBarWrap>
                    <DistCount>{count}</DistCount>
                  </DistRow>
                )
              })
          }
        </Section>

        {/* ── Formality distribution ───────────────────────────────────── */}
        <Section style={{ marginBottom: 0 }}>
          <SectionTitle>Por formalidade</SectionTitle>
          {formalDist.map(({ level, count }) => (
            <DistRow key={level}>
              <FormalRow>
                {[1,2,3,4,5].map(i => <FDot key={i} $filled={i <= level} />)}
              </FormalRow>
              <DistBarWrap>
                <DistBarFill $pct={Math.round((count / Math.max(records.length, 1)) * 100)} />
              </DistBarWrap>
              <DistCount>{count}</DistCount>
            </DistRow>
          ))}
        </Section>

        {/* ── Never worn ───────────────────────────────────────────────── */}
        <Section style={{ marginBottom: 0 }}>
          <SectionTitle>Nunca usados ({neverWorn})</SectionTitle>
          {neverWornLooks.length === 0 ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Todos os looks já foram usados! 🎉</p>
          ) : (
            <RankedList>
              {neverWornLooks.map(look => (
                <RankedItem key={look.id}>
                  <RankName>{look.title}</RankName>
                  <RankSub>{look.tags.join(', ')}</RankSub>
                </RankedItem>
              ))}
              {neverWorn > 6 && (
                <RankedItem>
                  <RankSub style={{ fontStyle: 'italic' }}>
                    + {neverWorn - 6} outros looks
                  </RankSub>
                </RankedItem>
              )}
            </RankedList>
          )}
        </Section>
      </ThreeCol>
    </>
  )
}
