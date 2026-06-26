import api from '../../api/client'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'
import type { Look } from '@data/types'
import {
  Wrap,
  MonthNav, NavArrow, MonthLabel, TodayBtn,
  StatsStrip, StatCard, StatNum, StatLbl,
  WeekRow, WeekDayLabel, CalGrid,
  DayCell, DayNum, DayDot,
  DayPanel, DayPanelTitle, PanelClose,
  LookList, LookRow, LookName, LookTags, TagChip, EmptyDay,
  StreakBanner,
} from './Calendario.styles'

interface UsageRecord { lookId: string; date: string }

// ── Helpers ── //

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const PT_MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
}

function todayISO() {
  const t = new Date()
  return toISO(t.getFullYear(), t.getMonth(), t.getDate())
}

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate()
}

function firstDayOfWeek(y: number, m: number) {
  return new Date(y, m, 1).getDay()
}

function calcStreak(records: UsageRecord[]): number {
  if (records.length === 0) return 0
  const used = new Set(records.map(r => r.date))
  let streak = 0
  const cursor = new Date()
  // Allow today to not have a use yet (check from yesterday)
  if (!used.has(todayISO())) cursor.setDate(cursor.getDate() - 1)
  while (true) {
    const iso = toISO(cursor.getFullYear(), cursor.getMonth(), cursor.getDate())
    if (!used.has(iso)) break
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

// ── Component ── //

export function Calendario() {
  const { looks } = useLooks()
  const today = new Date()
  const [year,    setYear]    = useState(today.getFullYear())
  const [month,   setMonth]   = useState(today.getMonth())
  const [records, setRecords] = useState<UsageRecord[]>([])
  const [selDay,  setSelDay]  = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/usage')
      .then(r => setRecords((r.data as {records: {lookId:string;date:string}[]}).records ?? []))
      .catch(() => {})
  }, [])

  // Map: date → look list worn that day
  const byDate = useMemo(() => {
    const map: Record<string, Look[]> = {}
    for (const rec of records) {
      const look = looks.find(l => l.id === rec.lookId)
      if (!look) continue
      if (!map[rec.date]) map[rec.date] = []
      // Avoid duplicate looks on same date
      if (!map[rec.date].find(l => l.id === look.id)) map[rec.date].push(look)
    }
    return map
  }, [records, looks])

  // Monthly stats
  const monthStats = useMemo(() => {
    const prefix = `${year}-${String(month + 1).padStart(2,'0')}`
    const monthRecords = records.filter(r => r.date.startsWith(prefix))
    const activeDays = new Set(monthRecords.map(r => r.date)).size
    const totalUses  = monthRecords.length
    const lookFreq: Record<string, number> = {}
    const lookLastUsed: Record<string, string> = {}
    for (const r of monthRecords) {
      lookFreq[r.lookId] = (lookFreq[r.lookId] ?? 0) + 1
      if (!lookLastUsed[r.lookId] || r.date > lookLastUsed[r.lookId]) {
        lookLastUsed[r.lookId] = r.date
      }
    }
    const topId = Object.entries(lookFreq)
      .sort((a, b) => b[1] - a[1] || lookLastUsed[b[0]].localeCompare(lookLastUsed[a[0]]))
      [0]?.[0]
    const topLook = topId ? looks.find(l => l.id === topId) : null
    return { activeDays, totalUses, topLook }
  }, [records, year, month])

  const streak = useMemo(() => calcStreak(records), [records])

  // Calendar cells
  const firstDow = firstDayOfWeek(year, month)
  const numDays  = daysInMonth(year, month)
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: numDays }, (_, i) => i + 1),
  ]
  // Pad to complete last week row
  while (cells.length % 7 !== 0) cells.push(null)

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
    setSelDay(null)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
    setSelDay(null)
  }
  function goToday() {
    setYear(today.getFullYear())
    setMonth(today.getMonth())
    setSelDay(todayISO())
  }

  const selectedLooks = selDay ? (byDate[selDay] ?? []) : []
  const todayStr = todayISO()

  const selDateLabel = selDay
    ? new Date(selDay + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  return (
    <Wrap>
      {/* Streak banner */}
      <StreakBanner $active={streak >= 2}>
        🔥 <strong>{streak} dias seguidos</strong> — você está em uma sequência!
      </StreakBanner>

      {/* Month navigation */}
      <MonthNav>
        <NavArrow onClick={prevMonth}>‹</NavArrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MonthLabel>{PT_MONTHS[month]} {year}</MonthLabel>
          <TodayBtn onClick={goToday}>Hoje</TodayBtn>
        </div>
        <NavArrow onClick={nextMonth}>›</NavArrow>
      </MonthNav>

      {/* Monthly stats */}
      <StatsStrip>
        <StatCard>
          <StatNum>{monthStats.totalUses}</StatNum>
          <StatLbl>Usos no mês</StatLbl>
        </StatCard>
        <StatCard>
          <StatNum>{monthStats.activeDays}</StatNum>
          <StatLbl>Dias ativos</StatLbl>
        </StatCard>
        <StatCard>
          <StatNum style={{ fontSize: 13, lineHeight: 1.3, paddingTop: 4 }}>
            {monthStats.topLook
              ? monthStats.topLook.title
              : '—'}
          </StatNum>
          <StatLbl>Look mais usado</StatLbl>
        </StatCard>
      </StatsStrip>

      {/* Week day headers */}
      <WeekRow>
        {WEEK_DAYS.map(d => <WeekDayLabel key={d}>{d}</WeekDayLabel>)}
      </WeekRow>

      {/* Calendar grid */}
      <CalGrid>
        {cells.map((day, idx) => {
          if (day === null) {
            return <DayCell key={`e-${idx}`} $empty $today={false} $selected={false} $count={0} disabled />
          }
          const iso   = toISO(year, month, day)
          const count = byDate[iso]?.length ?? 0
          const isToday = iso === todayStr
          const isSel   = iso === selDay
          return (
            <DayCell
              key={iso}
              $empty={false}
              $today={isToday}
              $selected={isSel}
              $count={count}
              onClick={() => setSelDay(prev => prev === iso ? null : iso)}
            >
              <DayNum $today={isToday} $count={count}>{day}</DayNum>
              {count > 0 && <DayDot $count={count} />}
            </DayCell>
          )
        })}
      </CalGrid>

      {/* Day detail panel */}
      {selDay && (
        <DayPanel>
          <DayPanelTitle>
            <span style={{ textTransform: 'capitalize' }}>{selDateLabel}</span>
            <PanelClose onClick={() => setSelDay(null)}>fechar</PanelClose>
          </DayPanelTitle>
          {selectedLooks.length === 0 ? (
            <EmptyDay>Nenhum look registrado neste dia.</EmptyDay>
          ) : (
            <LookList>
              {selectedLooks.map(look => (
                <LookRow key={look.id} onClick={() => navigate(`/looks/${look.id}`)}>
                  <LookName>{look.title}</LookName>
                  <LookTags>
                    {look.tags.map(t => <TagChip key={t}>{t}</TagChip>)}
                  </LookTags>
                </LookRow>
              ))}
            </LookList>
          )}
        </DayPanel>
      )}
    </Wrap>
  )
}
