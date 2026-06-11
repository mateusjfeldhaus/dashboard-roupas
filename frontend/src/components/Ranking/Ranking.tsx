import { useState, useEffect } from 'react'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import { LookModal } from '../Looks/LookModal'
import api from '../../api/client'
import {
  Wrap, SectionLabel, RankList, RankCard,
  Position, LookInfo, LookTitle, TagRow, Tag,
  MetaCol, Stars, UsagePill, LastUsed, EmptyNote,
} from './Ranking.styles'

interface LookStats {
  lookId: string
  count: number
  lastDate: string | null
}

function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function Ranking() {
  const { looks } = useLooks()
  const [ratings,  setRatings]  = useState<Record<string, number>>({})
  const [summary,  setSummary]  = useState<Record<string, LookStats>>({})
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState<Look | null>(null)

  useEffect(() => {
    Promise.all([
      api.get<{ ratings: Record<string, number> }>('/api/rating'),
      api.get<{ summary: Record<string, LookStats> }>('/api/usage'),
    ]).then(([rRes, uRes]) => {
      setRatings(rRes.data.ratings ?? {})
      setSummary(uRes.data.summary ?? {})
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  // Build sorted list
  const ranked = looks
    .map(look => ({
      look,
      rating:   ratings[look.id]   ?? 0,
      count:    summary[look.id]?.count    ?? 0,
      lastDate: summary[look.id]?.lastDate ?? null,
    }))
    .filter(item => item.rating > 0)
    .sort((a, b) => {
      if (b.rating  !== a.rating)  return b.rating  - a.rating
      if (b.count   !== a.count)   return b.count   - a.count
      if (a.lastDate && b.lastDate) return b.lastDate.localeCompare(a.lastDate)
      if (b.lastDate) return 1
      if (a.lastDate) return -1
      return 0
    })

  const unrated = looks.filter(l => !ratings[l.id])

  if (loading) {
    return <EmptyNote>Carregando ranking…</EmptyNote>
  }

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
              <RankCard key={item.look.id} onClick={() => setModal(item.look)}>
                <Position $top={idx < 3}>#{idx + 1}</Position>
                <LookInfo>
                  <LookTitle>{item.look.title}</LookTitle>
                  <TagRow>
                    {item.look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
                  </TagRow>
                </LookInfo>
                <MetaCol>
                  <Stars>{renderStars(item.rating)}</Stars>
                  {item.count > 0 ? (
                    <UsagePill>{item.count}× usado{item.count !== 1 ? 's' : ''}</UsagePill>
                  ) : (
                    <UsagePill style={{ opacity: 0.4 }}>nunca usado</UsagePill>
                  )}
                  {item.lastDate && (
                    <LastUsed>último {formatDate(item.lastDate)}</LastUsed>
                  )}
                </MetaCol>
              </RankCard>
            ))}
          </RankList>
        </>
      )}

      <SectionLabel>Sem Avaliação — {unrated.length}</SectionLabel>
      <RankList>
        {unrated.map(look => (
          <RankCard key={look.id} onClick={() => setModal(look)}>
            <Position $top={false}>—</Position>
            <LookInfo>
              <LookTitle>{look.title}</LookTitle>
              <TagRow>
                {look.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
              </TagRow>
            </LookInfo>
            <MetaCol>
              <Stars style={{ color: 'var(--border, #333)', opacity: 0.4 }}>{'☆'.repeat(5)}</Stars>
              {(summary[look.id]?.count ?? 0) > 0 && (
                <UsagePill>{summary[look.id].count}× usado{summary[look.id].count !== 1 ? 's' : ''}</UsagePill>
              )}
            </MetaCol>
          </RankCard>
        ))}
      </RankList>

      {modal && <LookModal look={modal} onClose={() => setModal(null)} />}
    </Wrap>
  )
}
