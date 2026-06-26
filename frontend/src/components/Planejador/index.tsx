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
import {
  usePlanejador,
  COOLDOWN_OPTIONS, periodOptions, seasonOptions, occasionOptions, daysSince,
} from './usePlanejador'

export function Planejador() {
  const {
    navigate,
    period, setPeriod, season, setSeason, occasion, setOccasion,
    seed, setSeed, showed, cooldown, setCooldown, usage,
    filtered, suggestions,
    toggle, handleSuggest, noFilters,
  } = usePlanejador()

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

        <FilterGroup>
          <CooldownRow>
            <CooldownLabel>Evitar reuso em menos de</CooldownLabel>
            <ChipRow>
              {COOLDOWN_OPTIONS.map(o => (
                <CooldownChip key={o.days} $active={cooldown === o.days} onClick={() => setCooldown(o.days)}>
                  {o.label}
                </CooldownChip>
              ))}
            </ChipRow>
          </CooldownRow>
        </FilterGroup>
      </FilterSection>

      <ActionRow>
        <SuggestBtn onClick={handleSuggest}>Sugerir looks</SuggestBtn>
        {showed && <ShuffleBtn onClick={() => setSeed(s => s + 1)}>🔀 Novo sorteio</ShuffleBtn>}
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
              const freshPct = days === null ? 100 : Math.min(100, Math.round((days / cooldown) * 100))
              return (
                <LookCard key={l.id} $dimmed={isRecent} onClick={() => navigate(`/looks/${l.id}`)}>
                  <LookNum>Opção {i + 1}</LookNum>
                  <LookTitle>{l.title}</LookTitle>
                  <TagRow>
                    {l.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}
                  </TagRow>
                  <FormalityRow>
                    {[1,2,3,4,5].map(n => <Dot key={n} $filled={n <= l.formality} />)}
                  </FormalityRow>
                  <FreshnessBar>
                    <FreshnessFill $pct={freshPct} $recent={isRecent} />
                  </FreshnessBar>
                  {days === null ? (
                    <LastWornBadge $recent={false}>✨ Nunca usado</LastWornBadge>
                  ) : isRecent ? (
                    <LastWornBadge $recent={true}>
                      <WarnIcon>⚠</WarnIcon> Usado há {days} dia{days !== 1 ? 's' : ''}
                    </LastWornBadge>
                  ) : (
                    <LastWornBadge $recent={false}>🗓 Último uso: {days} dias atrás</LastWornBadge>
                  )}
                </LookCard>
              )
            })}
          </LookGrid>
        </>
      )}
    </Wrap>
  )
}
