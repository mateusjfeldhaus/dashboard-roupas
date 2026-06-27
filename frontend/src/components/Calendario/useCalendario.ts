import api from '../../api/client'
import { UsageRecord, calcStreak as calcStreakUtil } from '../../utils/wardrobeUtils'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLooks } from '../../hooks/useLooks'

export const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export const PT_MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

export function toISO(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
}

export function todayISO() {
  const t = new Date()
  return toISO(t.getFullYear(), t.getMonth(), t.getDate())
}

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOfWeek(y: number, m: number) { return new Date(y, m, 1).getDay() }

export function useCalendario() {
  const { looks } = useLooks()
  const navigate  = useNavigate()
  const today     = new Date()
  const [year,    setYear]    = useState(today.getFullYear())
  const [month,   setMonth]   = useState(today.getMonth())
  const [records, setRecords] = useState<UsageRecord[]>([])
  const [selDay,  setSelDay]  = useState<string | null>(null)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    api.get('/api/usage')
      .then(r => setRecords((r.data as { records: UsageRecord[] }).records ?? []))
      .catch(() => setError('Erro ao carregar registros de uso'))
  }, [])

  const byDate = useMemo(() => {
    const map: Record<string, typeof looks> = {}
    for (const rec of records) {
      const look = looks.find(l => l.id === rec.lookId)
      if (!look) continue
      if (!map[rec.date]) map[rec.date] = []
      if (!map[rec.date].find(l => l.id === look.id)) map[rec.date].push(look)
    }
    return map
  }, [records, looks])

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
      .sort((a, b) => b[1] - a[1] || lookLastUsed[b[0]].localeCompare(lookLastUsed[a[0]]))[0]?.[0]
    const topLook = topId ? looks.find(l => l.id === topId) : null
    return { activeDays, totalUses, topLook }
  }, [records, year, month, looks])

  const streak = useMemo(() => calcStreakUtil(records).current, [records])

  const firstDow = firstDayOfWeek(year, month)
  const numDays  = daysInMonth(year, month)
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: numDays }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11) } else setMonth(m => m - 1)
    setSelDay(null)
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0) } else setMonth(m => m + 1)
    setSelDay(null)
  }
  function goToday() {
    setYear(today.getFullYear()); setMonth(today.getMonth()); setSelDay(todayISO())
  }

  const selectedLooks = selDay ? (byDate[selDay] ?? []) : []
  const todayStr      = todayISO()
  const selDateLabel  = selDay
    ? new Date(selDay + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  return {
    navigate,
    year, month, selDay, setSelDay,
    byDate, monthStats, streak, cells,
    prevMonth, nextMonth, goToday,
    selectedLooks, todayStr, selDateLabel,
    error,
  }
}
