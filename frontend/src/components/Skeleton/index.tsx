import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0%   { background-position: -600px 0 }
  100% { background-position:  600px 0 }
`

const Base = styled.div<{ $w?: string; $h?: string; $radius?: string }>`
  width:         ${p => p.$w ?? '100%'};
  height:        ${p => p.$h ?? '16px'};
  border-radius: ${p => p.$radius ?? '6px'};
  background: linear-gradient(
    90deg,
    ${p => p.theme.colors.border}   25%,
    ${p => p.theme.colors.surface}  50%,
    ${p => p.theme.colors.border}   75%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s infinite linear;
  flex-shrink: 0;
`

/** Linha de texto */
export const SkLine  = styled(Base)``

/** Bloco de card */
export const SkCard  = styled(Base)<{ $h?: string }>`
  height:        ${p => p.$h ?? '120px'};
  border-radius: 14px;
`

/** Avatar / círculo */
export const SkCircle = styled(Base)<{ $size?: string }>`
  width:         ${p => p.$size ?? '40px'};
  height:        ${p => p.$size ?? '40px'};
  border-radius: 50%;
`

/** Wrapper de grid igual ao das páginas */
export const SkGrid = styled.div<{ $cols?: string }>`
  display: grid;
  grid-template-columns: ${p => p.$cols ?? 'repeat(auto-fill, minmax(260px, 1fr))'};
  gap: 16px;
  margin-top: 20px;
`

/** Stack vertical com gap */
export const SkStack = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${p => p.$gap ?? '10px'};
`

/** Linha horizontal com gap */
export const SkRow = styled.div<{ $gap?: string }>`
  display: flex;
  align-items: center;
  gap: ${p => p.$gap ?? '8px'};
`
