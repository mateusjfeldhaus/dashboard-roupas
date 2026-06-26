import { Grid, Card, Badge, ItemName, Why, SectionNote, SectionTitle } from './Lacunas.styles'
import { gaps, sections } from './useLacunas'

export function Lacunas() {
  return (
    <>
      <SectionNote>
        Algumas lacunas ja foram preenchidas. Assim que tiver fotos, adicione na pasta correspondente.
      </SectionNote>
      {sections.map(({ label, priority }) => {
        const items = gaps.filter(g => g.priority === priority)
        return (
          <div key={priority} style={{ marginBottom: 36 }}>
            <SectionTitle>{label} ({items.length})</SectionTitle>
            <Grid>
              {items.map(g => (
                <Card key={g.item} $priority={g.priority}>
                  <Badge $priority={g.priority}>{g.priority}</Badge>
                  <ItemName>{g.item}</ItemName>
                  <Why>{g.why}</Why>
                </Card>
              ))}
            </Grid>
          </div>
        )
      })}
    </>
  )
}
