import {
  Grid, SeasonCard, SeasonHeader, SeasonEmoji, SeasonName, LookCount,
  Strategy, TipsList, TipItem,
  SectionTitle, LookGrid, LookCard, LookTitle, LookTags, Tag,
  EmptyNote,
} from './Estacoes.styles'
import { useEstacoes, SEASON_DETAILS } from './useEstacoes'

export function Estacoes() {
  const { navigate, SEASONS, activeSeason, setActiveSeason, seasonLooks, active } = useEstacoes()

  return (
    <>
      <Grid>
        {SEASONS.map(s => {
          const count = seasonLooks(s.tag).length
          const det   = SEASON_DETAILS[s.tag]
          return (
            <SeasonCard key={s.tag} $color={s.color} $active={activeSeason === s.tag}
              onClick={() => setActiveSeason(s.tag)}>
              <SeasonHeader>
                <SeasonEmoji>{s.emoji}</SeasonEmoji>
                <SeasonName>{s.label}</SeasonName>
                <LookCount $color={s.color}>{count} looks</LookCount>
              </SeasonHeader>
              <Strategy>{det.strategy}</Strategy>
              <TipsList>{det.tips.map((tip, i) => <TipItem key={i}>{tip}</TipItem>)}</TipsList>
            </SeasonCard>
          )
        })}
      </Grid>

      <SectionTitle $color={active.color}>{active.emoji} Todos os Looks de {active.label}</SectionTitle>

      {seasonLooks(active.tag).length > 0 ? (
        <LookGrid>
          {seasonLooks(active.tag).map(l => (
            <LookCard key={l.id} onClick={() => navigate(`/looks/${l.id}`)}>
              <LookTitle>{l.title}</LookTitle>
              <LookTags>{l.tags.map(t => <Tag key={t} $tag={t}>{t}</Tag>)}</LookTags>
            </LookCard>
          ))}
        </LookGrid>
      ) : (
        <EmptyNote>Nenhum look com tag {active.tag} cadastrado.</EmptyNote>
      )}
    </>
  )
}
