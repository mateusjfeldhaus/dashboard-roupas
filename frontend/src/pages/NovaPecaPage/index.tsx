import React from 'react'
import { useNovaPecaPage, CAT_LIST } from './useNovaPecaPage'
import { PageWrap, BackBtn } from '../PecaPage/PecaPage.styles'
import { DialogTitle, SaveBtn, CancelBtn } from '../LookPage/LookPage.styles'

const Label = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted, #888)', marginBottom: 6, ...style }}>
    {children}
  </div>
)

const Field = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
    {children}
  </div>
)

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    style={{
      padding: '9px 12px', borderRadius: 8,
      border: '1px solid var(--border, #333)',
      background: 'var(--bg, #111)',
      color: 'inherit', fontSize: 13,
      width: '100%', boxSizing: 'border-box',
      ...props.style,
    }}
  />
)

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    style={{
      padding: '9px 12px', borderRadius: 8,
      border: '1px solid var(--border, #333)',
      background: 'var(--bg, #111)',
      color: 'inherit', fontSize: 13,
      width: '100%', boxSizing: 'border-box',
      ...props.style,
    }}
  />
)

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    style={{
      padding: '9px 12px', borderRadius: 8,
      border: '1px solid var(--border, #333)',
      background: 'var(--bg, #111)',
      color: 'inherit', fontSize: 13,
      width: '100%', boxSizing: 'border-box',
      resize: 'vertical',
      ...props.style,
    }}
  />
)

export function NovaPecaPage() {
  const {
    navigate,
    description, setDescription,
    name, handleNameChange, resetName, nameEdited,
    brand, setBrand,
    category, setCategory,
    color, setColor,
    tips, setTips,
    preview, handleFileChange, fileRef,
    save, busy, canSave,
  } = useNovaPecaPage()

  return (
    <PageWrap>
      <BackBtn onClick={() => navigate('/pecas')}>← Peças</BackBtn>

      <DialogTitle style={{ marginBottom: 28, fontSize: 20 }}>Nova Peça</DialogTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>

        {/* Foto */}
        <Field>
          <Label>Foto (opcional)</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 90, height: 90, borderRadius: 12,
                border: '1px dashed var(--border, #333)',
                background: 'var(--surface, #1a1a1a)',
                overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {preview
                ? <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 28, opacity: 0.3 }}>📷</span>
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label
                htmlFor="nova-peca-foto"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
                  border: '1px solid var(--border, #333)',
                  fontSize: 12, fontWeight: 600, color: 'var(--text-muted, #888)',
                  transition: 'all 0.15s',
                }}
              >
                {preview ? '🔄 Trocar foto' : '📸 Adicionar foto'}
                <input
                  id="nova-peca-foto"
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
              {preview && (
                <span style={{ fontSize: 11, color: 'var(--text-muted, #888)' }}>
                  ✓ Comprimida e pronta
                </span>
              )}
            </div>
          </div>
        </Field>

        {/* Categoria */}
        <Field>
          <Label>Categoria *</Label>
          <Select value={category} onChange={e => setCategory(e.target.value as typeof category)}>
            {CAT_LIST.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>

        {/* Descrição */}
        <Field>
          <Label>Descrição <span style={{ fontWeight: 400, textTransform: 'none' }}>(cor, material, detalhe)</span></Label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="ex: Chumbo Lã 120"
            autoFocus
          />
        </Field>

        {/* Marca */}
        <Field>
          <Label>Marca</Label>
          <Input
            value={brand}
            onChange={e => setBrand(e.target.value)}
            placeholder="ex: Bespoke"
          />
        </Field>

        {/* Nome gerado */}
        <Field>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <Label style={{ marginBottom: 0 }}>
              Nome da peça {nameEdited
                ? <span style={{ fontWeight: 400, color: 'var(--accent, #c8a96e)' }}>(editado)</span>
                : <span style={{ fontWeight: 400, textTransform: 'none' }}>(gerado automaticamente)</span>}
            </Label>
            {nameEdited && (
              <button
                onClick={resetName}
                style={{ fontSize: 11, background: 'none', border: 'none', color: 'var(--text-muted, #888)', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                resetar
              </button>
            )}
          </div>
          <Input
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="ex: Blazer Chumbo Lã 120 - Bespoke"
            style={nameEdited ? { borderColor: 'var(--accent, #c8a96e)' } : {}}
          />
        </Field>

        {/* Cor */}
        <Field>
          <Label>Cor da peça</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              style={{ width: 44, height: 36, borderRadius: 8, border: '1px solid var(--border, #333)', background: 'none', cursor: 'pointer', padding: 2 }}
            />
            <Input
              value={color}
              onChange={e => setColor(e.target.value)}
              placeholder="#6b7280"
              style={{ maxWidth: 120 }}
            />
            <div style={{ width: 32, height: 32, borderRadius: 8, background: color, border: '1px solid var(--border, #333)', flexShrink: 0 }} />
          </div>
        </Field>

        {/* Dicas */}
        <Field>
          <Label>Dicas de uso (uma por linha)</Label>
          <Textarea
            value={tips}
            onChange={e => setTips(e.target.value)}
            rows={4}
            placeholder={'Como usar esta peça em diferentes contextos…\nCombinações recomendadas…'}
          />
        </Field>

        {/* Ações */}
        <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
          <CancelBtn onClick={() => navigate('/pecas')}>Cancelar</CancelBtn>
          <SaveBtn onClick={save} disabled={!canSave}>
            {busy ? 'Salvando…' : 'Criar peça'}
          </SaveBtn>
        </div>

      </div>
    </PageWrap>
  )
}
