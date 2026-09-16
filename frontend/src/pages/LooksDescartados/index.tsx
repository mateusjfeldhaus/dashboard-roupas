import { useLooksDescartados } from './useLooksDescartados'
import { useAdminDelete } from '../../hooks/useAdminDelete'
import {
  Wrap, TopRow, BackBtn, PageTitle, Count,
  Empty, Grid, Card, CardTitle, FormalityRow, Dot, RestoreBtn, DeleteBtn,
} from './LooksDescartados.styles'
import { DialogOverlay, DialogBox, DialogTitle, DialogActions, SaveBtn, CancelBtn } from '../LookPage/LookPage.styles'

export function LooksDescartados() {
  const { navigate, hidden, toggleHidden, deleteLook } = useLooksDescartados()
  const del = useAdminDelete({ onDelete: deleteLook })

  return (
    <Wrap>
      <TopRow>
        <BackBtn onClick={() => navigate('/looks')}>← Looks</BackBtn>
        <PageTitle>Looks Descartados <Count>({hidden.length})</Count></PageTitle>
      </TopRow>

      {hidden.length === 0 ? (
        <Empty>
          Nenhum look descartado ainda.<br />
          Use o botão "Ocultar look" em qualquer look para enviá-lo aqui.
        </Empty>
      ) : (
        <Grid>
          {hidden.map(look => (
            <Card key={look.id}>
              <CardTitle onClick={() => navigate(`/looks/${look.id}`)}>
                {look.title}
              </CardTitle>
              <FormalityRow>
                {[1,2,3,4,5].map(i => <Dot key={i} $filled={i <= look.formality} />)}
              </FormalityRow>
              <RestoreBtn onClick={() => toggleHidden(look.id, false)}>
                👁 Restaurar look
              </RestoreBtn>
              <DeleteBtn onClick={() => del.openDelete(look.id)}>
                🗑 Excluir definitivamente
              </DeleteBtn>
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
