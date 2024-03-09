import { ReactNode } from 'react'
import styled from 'styled-components'

type NodeProps = {
  children: ReactNode
}

export const Wrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`

const Grid = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #adb5bd;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 2px;
    background: #adb5bd;
  }
`

export default function Node({ children }: NodeProps) {
  return (
    <Wrapper>
      {children}
      <Grid />
    </Wrapper>
  )
}
