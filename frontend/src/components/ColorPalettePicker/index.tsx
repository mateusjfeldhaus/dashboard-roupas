import React, { useState } from 'react'
import { PALETTE_GROUPS, paletteFor } from '../../utils/colorPalette'

interface Props {
  value: string
  onChange: (hex: string) => void
}

export function ColorPalettePicker({ value, onChange }: Props) {
  const [tooltip, setTooltip] = useState<string | null>(null)
  const selected = paletteFor(value)

  return (
    <div>
      {/* Swatches agrupados por família */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PALETTE_GROUPS.map(group => (
          <div key={group.label} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {group.colors.map(c => {
              const isSelected = c.hex.toLowerCase() === value.toLowerCase()
              return (
                <button
                  key={c.id}
                  title={c.name}
                  onClick={() => onChange(c.hex)}
                  onMouseEnter={() => setTooltip(c.name)}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    width: 32, height: 32,
                    borderRadius: 8,
                    background: c.hex,
                    border: isSelected
                      ? '3px solid var(--accent, #c8a96e)'
                      : '2px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                    boxShadow: isSelected
                      ? '0 0 0 1px var(--accent, #c8a96e)'
                      : undefined,
                    transition: 'transform 0.1s, box-shadow 0.1s',
                    transform: isSelected ? 'scale(1.15)' : undefined,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Cor selecionada */}
      <div style={{
        marginTop: 10,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12, color: 'var(--text-muted, #888)',
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: 5,
          background: value,
          border: '1px solid var(--border, #333)',
          flexShrink: 0,
        }} />
        <span>
          {selected ? selected.name : 'Cor personalizada'}{' '}
          <span style={{ opacity: 0.5 }}>{value}</span>
        </span>
        {tooltip && tooltip !== selected?.name && (
          <span style={{ marginLeft: 'auto', opacity: 0.7 }}>→ {tooltip}</span>
        )}
      </div>
    </div>
  )
}
