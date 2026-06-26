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
import { useCalendario, WEEK_DAYS, PT_MONTHS, toISO } from './useCalendario'

export function Calendario() {
  const {
    navigate,
    year, month, selDay, setSelDay,
    byDate, monthStats, streak, cells,
    prevMonth, nextMonth, goToday,
    selectedLooks, todayStr, selDateLabel,
  } = useCalendario()

  return (
    <Wrap>
      <StreakBanner $active={streak >= 2}>
        🔥 <strong>{streak} dias seguidos</strong> — você está em uma sequência!
      </StreakBanner>

      <MonthNav>
        <NavArrow onClick={prevMonth}>‹</NavArrow>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MonthLabel>{PT_MONTHS[month]} {year}</MonthLabel>
          <TodayBtn onClick={goToday}>Hoje</TodayBtn>
        </div>
        <NavArrow onClick={nextMonth}>›</NavArrow>
      </MonthNav>

      <StatsStrip>
        <StatCard><StatNum>{monthStats.totalUses}</StatNum><StatLbl>Usos no mês</StatLbl></StatCard>
        <StatCard><StatNum>{monthStats.activeDays}</StatNum><StatLbl>Dias ativos</StatLbl></StatCard>
        <StatCard>
          <StatNum style={{ fontSize: 13, lineHeight: 1.3, paddingTop: 4 }}>
            {monthStats.topLook ? monthStats.topLook.title : '—'}
          </StatNum>
          <StatLbl>Look mais usado</StatLbl>
        </StatCard>
      </StatsStrip>

      <WeekRow>
        {WEEK_DAYS.map(d => <WeekDayLabel key={d}>{d}</WeekDayLabel>)}
      </WeekRow>

      <CalGrid>
        {cells.map((day, idx) => {
          if (day === null) {
            return <DayCell key={`e-${idx}`} $empty $today={false} $selected={false} $count={0} disabled />
          }
          const iso     = toISO(year, month, day)
          const count   = byDate[iso]?.length ?? 0
          const isToday = iso === todayStr
          const isSel   = iso === selDay
          return (
            <DayCell key={iso} $empty={false} $today={isToday} $selected={isSel} $count={count}
              onClick={() => setSelDay(prev => prev === iso ? null : iso)}>
              <DayNum $today={isToday} $count={count}>{day}</DayNum>
              {count > 0 && <DayDot $count={count} />}
            </DayCell>
          )
        })}
      </CalGrid>

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
                  <LookTags>{look.tags.map(t => <TagChip key={t}>{t}</TagChip>)}</LookTags>
                </LookRow>
              ))}
            </LookList>
          )}
        </DayPanel>
      )}
    </Wrap>
  )
}
