import {
  Wrap, SectionLabel, RankList, RankCard,
  Position, LookInfo, LookTitle, TagRow, Tag,
  MetaCol, Stars, UsagePill, LastUsed, EmptyNote,
} from './Ranking.styles'
import { useRanking, renderStars, formatDate } from './useRanking'

export function Ranking() {
  const { navigate, looks, summary, loading, ranked, unrated } = useRanking()

  if (loading) return <EmptyNote>Carregando ranking…</EmptyNote>

  return (
    <Wrap>
      {ranked.length === 0 ? (
        <EmptyNote>
          Nenhum look avaliado ainda.<br />
          Abra qualquer look e clique nas ★ para avaliar.
        </EmptyNote>
      ) : (
        <>
          <SectionLabel>Looks Avaliados — {ranked.length}</SectionLabel>
          <RankList>
            {ranked.map((item, idx) => (
              <RankCard key={item.look.id} onClick={() => navigate(`/looks/${item.look.id}`)}>
                <Position $top={idx < 3}>#{idx + 1}</Position>
                <LookInfo>
                  <LookTitle>{item.look.title}</LookTitle>
                  <TagRow>{item.look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}</TagRow>
                </LookInfo>
                <MetaCol>
                  <Stars>{renderStars(item.rating)} <span style={{ fontSize: 11, opacity: 0.7, marginLeft: 4 }}>{item.rating}/10</span></Stars>
                  {item.count > 0
                    ? <UsagePill>{item.count}× usado{item.count !== 1 ? 's' : ''}</UsagePill>
                    : <UsagePill style={{ opacity: 0.4 }}>nunca usado</UsagePill>
                  }
                  {item.lastDate && <LastUsed>último {formatDate(item.lastDate)}</LastUsed>}
                </MetaCol>
              </RankCard>
            ))}
          </RankList>
        </>
      )}

      <SectionLabel>Sem Avaliação — {unrated.length}</SectionLabel>
      <RankList>
        {unrated.map(look => (
          <RankCard key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
            <Position $top={false}>—</Position>
            <LookInfo>
              <LookTitle>{look.title}</LookTitle>
              <TagRow>{look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}</TagRow>
            </LookInfo>
            <MetaCol>
              <Stars style={{ color: 'var(--border, #333)', opacity: 0.4 }}>{'☆'.repeat(10)}</Stars>
              {(summary[look.id]?.count ?? 0) > 0 && (
                <UsagePill>{summary[look.id].count}× usado{summary[look.id].count !== 1 ? 's' : ''}</UsagePill>
              )}
            </MetaCol>
          </RankCard>
        ))}
      </RankList>
    </Wrap>
  )
}
