import styled from 'styled-components'
import { SpotType } from '../utils/type'

type SpotProps = {
  type?: SpotType
  detected?: boolean
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Target = styled.img<{ $detected?: boolean }>`
  max-width: 60%;
  opacity: ${({ $detected }) => ($detected ? 1 : 0.2)};
  transition: opacity 0.3s ease-in-out;
`

export default function Spot({ type, detected }: SpotProps) {
  return (
    <Wrapper>
      {type ? (
        <Target src={`${type}.png`} alt={type} $detected={detected} />
      ) : null}
    </Wrapper>
  )
}
