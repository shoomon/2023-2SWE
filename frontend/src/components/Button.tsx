import { ReactNode } from 'react'
import styled from 'styled-components'

type ButtonProps = {
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}

export const Wrapper = styled.button<{ $disabled?: boolean }>`
  border-radius: 8px;
  border: 0;
  background: #7950f2;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #6741d9;
  }
`

export default function Button({ onClick, disabled, children }: ButtonProps) {
  return (
    <Wrapper onClick={onClick} $disabled={disabled}>
      {children}
    </Wrapper>
  )
}
