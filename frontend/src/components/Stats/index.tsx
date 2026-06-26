import { getTagColor } from '../../styles/tagColors'
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
import { useStats, PERIOD_LABELS } from './useStats'
import type { Period } from './useStats'

export function Stats() {
  const {
    looks,
    allRecords, loading,
    period, setPeriod,
    records, streak, periodDays,
    uniqueWorn, neverWorn,
    monthData, maxMonth,
    topLooks, neverWornLooks,
    tagDist, formalDist, maxFormal,
    topPieces, insight,
    chartH, barW, gap, svgW,
  } = useStats()

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
          <MetricNum>{periodDays > 0 ? (records.length / (periodDays / 7)).toFixed(1) : '0'}</MetricNum>
          <MetricLabel>Média/semana</MetricLabel>
        </MetricCard>
      </MetricsGrid>

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
                    x={x} y={y} width={barW} height={barH} rx="4"
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
