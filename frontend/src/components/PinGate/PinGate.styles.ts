import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none }`

export const Screen = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg, #0f0f0f);
  padding: 24px;
`

export const Card = styled.form`
  width: 100%;
  max-width: 360px;
  background: var(--surface, #1a1a1a);
  border: 1px solid var(--border, #2a2520);
  border-radius: 16px;
  padding: 40px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease;
`

export const Logo = styled.div`
  text-align: center;
  font-size: 22px;
  letter-spacing: 3px;
  color: var(--accent, #c8a96e);
  font-weight: 700;
  margin-bottom: 4px;
  text-transform: lowercase;
`

export const Subtitle = styled.p`
  text-align: center;
  color: var(--text-muted, #8a8070);
  font-size: 14px;
  margin: 0;
`

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  background: var(--bg, #0f0f0f);
  border: 1px solid var(--border, #2a2520);
  border-radius: 10px;
  color: var(--text, #f5f0e8);
  font-size: 20px;
  letter-spacing: 6px;
  text-align: center;
  outline: none;
  box-sizing: border-box;

  &:focus { border-color: var(--accent, #c8a96e); }
  &::placeholder { letter-spacing: 2px; font-size: 14px; }
`

export const Btn = styled.button<{ $loading?: boolean }>`
  width: 100%;
  padding: 14px;
  background: var(--accent, #c8a96e);
  color: #0f0f0f;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: ${p => p.$loading ? 'wait' : 'pointer'};
  opacity: ${p => p.$loading ? 0.7 : 1};
  transition: opacity 0.15s;

  &:hover:not(:disabled) { opacity: 0.88; }
`

export const ErrorMsg = styled.p`
  text-align: center;
  color: #ef4444;
  font-size: 13px;
  margin: 0;
`
