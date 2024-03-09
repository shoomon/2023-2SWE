import { useEffect, useState } from 'react'
import styled from 'styled-components'
import useLog from '../hooks/useLog'

type RobotProps = {
  position: {
    x: number
    y: number
  }
  direction: number
}

const Wrapper = styled.div`
  position: absolute;
  display: grid;
  place-items: center;
  width: 80px;
  height: 80px;
  transition: all 0.5s ease-in-out;
`

const Icon = styled.img`
  max-width: 60%;
`

export default function Robot({ position: { x, y }, direction }: RobotProps) {
  const { addLog } = useLog()
  const [deg, setDeg] = useState<number>(90)
  const [prevDirection, setPrevDirection] = useState<number>(direction)
  const [prevPosition, setPrevPosition] = useState<{ x: number; y: number }>({
    x,
    y,
  })

  useEffect(() => {
    if (direction !== prevDirection) {
      setDeg(prev => prev + 90)
      setPrevDirection(direction)
      addLog('로봇 시계 방향 90도 회전')
    }
  }, [prevDirection, direction, addLog])

  useEffect(() => {
    if (x !== prevPosition.x || y !== prevPosition.y) {
      setPrevPosition({ x, y })

      addLog(
        Math.abs(x - prevPosition.x) > 1 || Math.abs(y - prevPosition.y) > 1
          ? 'SIM 오류로 인한 2칸 전진'
          : '로봇 앞으로 1칸 전진',
      )
    }
  }, [prevPosition, x, y, addLog])

  return (
    <Wrapper
      style={{ bottom: 80 * y, left: 80 * x, transform: `rotate(${deg}deg)` }}
    >
      <Icon src="robot.png" />
    </Wrapper>
  )
}
