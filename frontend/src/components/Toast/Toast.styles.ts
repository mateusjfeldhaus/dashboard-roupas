import styled, { keyframes, css } from 'styled-components'
import type { ToastType } from '../../hooks/useToast'

const slideUp = keyframes`
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`

export const Container = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
`

export const Item = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  animation: ${slideUp} 0.2s ease-out;
  pointer-events: auto;

  ${p => p.$type === 'success' && css`
    background: ${p.theme.colors.green};
    color: #0f0f0f;
  `}

  ${p => p.$type === 'error' && css`
    background: ${p.theme.colors.red};
    color: #fff;
  `}
`
