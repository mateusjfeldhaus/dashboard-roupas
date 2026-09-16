import React, { useState } from 'react'
import { PALETTE_GROUPS, paletteFor } from '../../utils/colorPalette'

interface Props {
  value: string
  onChange: (hex: string) => void
  defaultOpen?: boolean
}

export function ColorPalettePicker({ value, onChange, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const selected = paletteFor(value)

  function handleSelect(hex: string) {
    onChange(hex)
    setOpen(false)
  }

  return (
    <div>
      {/* Preview + botão toggle */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid var(--border, #333)',
          background: open ? 'var(--bg-card, #1a1a1a)' : 'var(--bg, #111)',
          color: 'inherit', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{
          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
          background: value,
          border: '1px solid rgba(255,255,255,0.15)',
        }} />
        <span style={{ fontSize: 13, flex: 1 }}>
          {selected ? selected.name : 'Cor personalizada'}
          <span style={{ opacity: 0.4, marginLeft: 6, fontSize: 11 }}>{value}</span>
        </span>
        <span style={{ opacity: 0.4, fontSize: 11 }}>{open ? '▲' : '▼'}</span>
      </button>

      {/* Paleta expandida */}
      {open && (
        <div style={{
          marginTop: 8,
          padding: '12px 14px',
          borderRadius: 10,
          border: '1px solid var(--border, #333)',
          background: 'var(--bg-card, #1a1a1a)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PALETTE_GROUPS.map(group => (
              <div key={group.label}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  color: 'var(--text-muted, #888)', textTransform: 'uppercase',
                  marginBottom: 5,
                }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {group.colors.map(c => {
                    const isSelected = c.hex.toLowerCase() === value.toLowerCase()
                    return (
                      <button
                        key={c.id}
                        type="button"
                        title={c.name}
                        onClick={() => handleSelect(c.hex)}
                        onMouseEnter={() => setTooltip(c.name)}
                        onMouseLeave={() => setTooltip(null)}
                        style={{
                          width: 28, height: 28,
                          borderRadius: 7,
                          background: c.hex,
                          border: isSelected
                            ? '3px solid var(--accent, #c8a96e)'
                            : '2px solid rgba(255,255,255,0.10)',
                          cursor: 'pointer',
                          padding: 0,
                          flexShrink: 0,
                          boxShadow: isSelected ? '0 0 0 1px var(--accent, #c8a96e)' : undefined,
                          transform: isSelected ? 'scale(1.18)' : undefined,
                          transition: 'transform 0.1s',
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div style={{
              marginTop: 10, fontSize: 12,
              color: 'var(--text-muted, #888)',
              opacity: 0.8,
            }}>
              → {tooltip}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
