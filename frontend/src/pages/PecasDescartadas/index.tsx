import { usePecasDescartadas } from './usePecasDescartadas'
import { useAdminDelete } from '../../hooks/useAdminDelete'
import { imgUrl } from '../../utils/imgUrl'
import {
  Wrap, TopRow, BackBtn, PageTitle, Count,
  Empty, Grid, Card, Thumb, ThumbImg, CardBody,
  CardTitle, CardMeta, ColorBar, RestoreBtn, DeleteBtn,
} from './PecasDescartadas.styles'
import { DialogOverlay, DialogBox, DialogTitle, DialogActions, SaveBtn, CancelBtn } from '../LookPage/LookPage.styles'

export function PecasDescartadas() {
  const { navigate, hidden, toggleHidden, deletePiece } = usePecasDescartadas()
  const del = useAdminDelete({ onDelete: deletePiece })

  return (
    <Wrap>
      <TopRow>
        <BackBtn onClick={() => navigate('/pecas')}>← Peças</BackBtn>
        <PageTitle>Peças Descartadas <Count>({hidden.length})</Count></PageTitle>
      </TopRow>

      {hidden.length === 0 ? (
        <Empty>
          Nenhuma peça descartada ainda.<br />
          Use o botão "Ocultar peça" em qualquer peça para enviá-la aqui.
        </Empty>
      ) : (
        <Grid>
          {hidden.map(piece => (
            <Card key={piece.id}>
              <Thumb>
                {piece.img
                  ? <ThumbImg src={imgUrl(piece.img)} alt={piece.name}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  : null
                }
              </Thumb>
              <ColorBar $color={piece.color} />
              <CardBody>
                <CardTitle onClick={() => navigate(`/pecas/${piece.id}`)}>
                  {piece.name}
                </CardTitle>
                <CardMeta>{piece.brand} · {piece.category}</CardMeta>
                <RestoreBtn onClick={() => toggleHidden(piece.id, false)}>
                  👁 Restaurar peça
                </RestoreBtn>
                <DeleteBtn onClick={() => del.openDelete(piece.id)}>
                  🗑 Excluir definitivamente
                </DeleteBtn>
              </CardBody>
            </Card>
          ))}
        </Grid>
      )}

      {del.isOpen && (
        <DialogOverlay onClick={del.closeDelete}>
          <DialogBox onClick={e => e.stopPropagation()} style={{ textAlign: 'left', maxWidth: 380, width: '90vw' }}>
            <DialogTitle style={{ marginBottom: 12 }}>Excluir definitivamente</DialogTitle>
            <p style={{ fontSize: 13, color: 'var(--text-muted, #888)', marginBottom: 16 }}>
              Esta ação é irreversível. Confirme com o PIN de admin.
            </p>
            <input
              type="password"
              placeholder="PIN de admin"
              value={del.pin}
              onChange={e => del.setPin(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && del.confirmDelete()}
              autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '9px 12px', borderRadius: 8,
                border: `1px solid ${del.error ? '#ef4444' : 'var(--border, #333)'}`,
                background: 'var(--bg, #111)',
                color: 'inherit', fontSize: 13, marginBottom: 8,
              }}
            />
            {del.error && (
              <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 8 }}>{del.error}</p>
            )}
            <DialogActions style={{ marginTop: 8 }}>
              <CancelBtn onClick={del.closeDelete}>Cancelar</CancelBtn>
              <SaveBtn
                onClick={del.confirmDelete}
                disabled={del.loading || !del.pin.trim()}
                style={{ background: '#ef4444', borderColor: '#ef4444' }}
              >
                {del.loading ? 'Excluindo…' : 'Excluir'}
              </SaveBtn>
            </DialogActions>
          </DialogBox>
        </DialogOverlay>
      )}
    </Wrap>
  )
}
