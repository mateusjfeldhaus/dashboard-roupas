import type { Look, Piece } from '@data/types'
import { imgUrl } from './imgUrl'
import { tagColors } from '../styles/tagColors'

// ── Theme constants (mirrors dark theme) ─────────────────────────────────────
const C = {
  bg:       '#0f0f0f',
  surface:  '#1a1a1a',
  surface2: '#222018',
  accent:   '#c8a96e',
  text:     '#f5f0e8',
  muted:    '#8a8070',
  border:   '#2a2520',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

async function loadImg(src: string): Promise<HTMLImageElement | null> {
  return new Promise(resolve => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

// ── Tag chip drawing ──────────────────────────────────────────────────────────

function drawTag(ctx: CanvasRenderingContext2D, tag: string, x: number, y: number): number {
  const colors = tagColors[tag] ?? { bg: '#1a1a1a', text: '#8a8070', border: '#2a2520' }
  ctx.font = '600 22px Inter, sans-serif'
  const tw = ctx.measureText(tag).width
  const pw = 20; const ph = 36; const r = 8
  const w = tw + pw * 2

  roundRect(ctx, x, y, w, ph, r)
  ctx.fillStyle = colors.bg
  ctx.fill()
  roundRect(ctx, x, y, w, ph, r)
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.fillStyle = colors.text
  ctx.fillText(tag, x + pw, y + ph - 10)
  return w + 10
}

// ── Main export function ──────────────────────────────────────────────────────

export async function exportLookAsImage(
  look: Look,
  piecesInLook: { cat: string; piece: Piece }[]
): Promise<void> {
  // ── Ensure Inter font is loaded ──────────────────────────────────────────
  try { await document.fonts.load('700 40px Inter') } catch { /* ok */ }

  const W = 1080
  const H = 1350
  const PAD = 64

  const canvas = document.createElement('canvas')
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // ── Background ────────────────────────────────────────────────────────────
  ctx.fillStyle = C.bg
  ctx.fillRect(0, 0, W, H)

  // ── Top accent bar ────────────────────────────────────────────────────────
  ctx.fillStyle = C.accent
  ctx.fillRect(PAD, 56, 4, 52)

  // ── App name ──────────────────────────────────────────────────────────────
  ctx.font = '600 18px Inter, sans-serif'
  ctx.fillStyle = C.muted
  ctx.fillText('GUARDA-ROUPA', PAD + 18, 72)

  // ── Look title ────────────────────────────────────────────────────────────
  ctx.font = '800 46px Inter, sans-serif'
  ctx.fillStyle = C.text
  const titleLines = wrapText(ctx, look.title, W - PAD * 2 - 20)
  titleLines.forEach((line, i) => ctx.fillText(line, PAD + 18, 96 + i * 54))
  const titleBottom = 96 + titleLines.length * 54

  // ── Tags ──────────────────────────────────────────────────────────────────
  let tagX = PAD + 18
  const tagY = titleBottom + 16
  for (const tag of look.tags) {
    tagX += drawTag(ctx, tag, tagX, tagY)
  }

  // ── Formality dots ────────────────────────────────────────────────────────
  const dotsY = tagY + 56
  ctx.font = '500 20px Inter, sans-serif'
  ctx.fillStyle = C.muted
  ctx.fillText('FORMALIDADE', PAD + 18, dotsY)
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath()
    ctx.arc(PAD + 18 + 130 + (i - 1) * 26, dotsY - 7, 9, 0, Math.PI * 2)
    ctx.fillStyle = i <= look.formality ? C.accent : C.border
    ctx.fill()
  }

  // ── Divider ───────────────────────────────────────────────────────────────
  const divY = dotsY + 26
  ctx.strokeStyle = C.border
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(PAD, divY)
  ctx.lineTo(W - PAD, divY)
  ctx.stroke()

  // ── Pieces section ────────────────────────────────────────────────────────
  const count   = Math.min(piecesInLook.length, 6)
  const cols    = count <= 3 ? count : count <= 4 ? 4 : count <= 6 ? 3 : 4
  const rows    = Math.ceil(count / cols)
  const cellW   = Math.floor((W - PAD * 2 - (cols - 1) * 16) / cols)
  const imgH    = Math.min(Math.floor(cellW * 1.35), rows === 1 ? 420 : 290)
  const piecesTopY = divY + 36

  // Load all images in parallel
  const imgEls = await Promise.all(
    piecesInLook.slice(0, count).map(({ piece }) => loadImg(imgUrl(piece.img)))
  )

  for (let idx = 0; idx < count; idx++) {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    const x = PAD + col * (cellW + 16)
    const y = piecesTopY + row * (imgH + 56 + 16)

    const { piece } = piecesInLook[idx]
    const el = imgEls[idx]

    // Image card background
    roundRect(ctx, x, y, cellW, imgH, 12)
    ctx.fillStyle = piece.color + '22'
    ctx.fill()
    roundRect(ctx, x, y, cellW, imgH, 12)
    ctx.strokeStyle = C.border
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw image with clipping
    if (el) {
      ctx.save()
      roundRect(ctx, x, y, cellW, imgH, 12)
      ctx.clip()
      const scale = Math.min(cellW / el.width, imgH / el.height)
      const dw = el.width  * scale
      const dh = el.height * scale
      ctx.drawImage(el, x + (cellW - dw) / 2, y + (imgH - dh) / 2, dw, dh)
      ctx.restore()
    }

    // Color dot
    ctx.beginPath()
    ctx.arc(x + cellW - 16, y + 16, 7, 0, Math.PI * 2)
    ctx.fillStyle = piece.color
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.2)'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Piece labels
    const labelY = y + imgH + 10
    ctx.font = '600 19px Inter, sans-serif'
    ctx.fillStyle = C.muted
    ctx.textAlign = 'center'
    const catStr = piecesInLook[idx].cat.toUpperCase()
    ctx.fillText(catStr, x + cellW / 2, labelY + 16)

    ctx.font = '700 21px Inter, sans-serif'
    ctx.fillStyle = C.text
    const nameLines = wrapText(ctx, piece.name, cellW - 8)
    nameLines.slice(0, 2).forEach((line, li) => {
      ctx.fillText(line, x + cellW / 2, labelY + 38 + li * 24)
    })
    ctx.textAlign = 'left'
  }

  // ── Tip ───────────────────────────────────────────────────────────────────
  const tipY = piecesTopY + rows * (imgH + 72) + 16
  if (tipY + 100 < H - 80) {
    ctx.strokeStyle = C.border
    ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(PAD, tipY); ctx.lineTo(W - PAD, tipY); ctx.stroke()

    ctx.font = '500 20px Inter, sans-serif'
    ctx.fillStyle = C.muted
    ctx.fillText('DICA DO STYLIST', PAD, tipY + 30)

    ctx.font = 'italic 400 22px Inter, sans-serif'
    ctx.fillStyle = C.text
    const tipLines = wrapText(ctx, look.tip, W - PAD * 2)
    tipLines.slice(0, 3).forEach((line, i) => ctx.fillText(line, PAD, tipY + 58 + i * 30))
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  ctx.strokeStyle = C.border
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(PAD, H - 60); ctx.lineTo(W - PAD, H - 60); ctx.stroke()
  ctx.font = '500 18px Inter, sans-serif'
  ctx.fillStyle = C.muted
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  ctx.fillText(`Gerado em ${today}`, PAD, H - 30)
  ctx.textAlign = 'right'
  ctx.fillText('guarda-roupa.app', W - PAD, H - 30)
  ctx.textAlign = 'left'

  // ── Download ──────────────────────────────────────────────────────────────
  canvas.toBlob(blob => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a   = document.createElement('a')
    a.href     = url
    a.download = `${look.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
}
