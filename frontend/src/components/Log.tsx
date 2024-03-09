import { ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import useLog, { LogContext } from '../hooks/useLog'

type ContextProps = {
  children: ReactNode
}

export const Wrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  border-radius: 7px;
  background: #f3f0ff;
`

export const Item = styled.div`
  display: flex;
  gap: 12px;
`

export const Time = styled.div`
  width: 75px;
  padding-right: 10px;
  border-right: 1px solid #5f3dc4;
`

export const Description = styled.div`
  font-weight: 300;
`

export default function Log() {
  const ref = useRef<HTMLDivElement>(null)
  const { logs } = useLog()

  useEffect(() => {
    if (ref.current) ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [logs])

  return (
    <Wrapper ref={ref}>
      {logs.map(({ date, log }, index) => (
        <Item key={index}>
          <Time>{date}</Time>
          <Description>{log}</Description>
        </Item>
      ))}
    </Wrapper>
  )
}

Log.Context = function Context({ children }: ContextProps) {
  const [logs, setLogs] = useState<Array<{ date: string; log: string }>>([])

  const addLog = useCallback((log: string) => {
    const date = format(new Date(), 'HH:mm:ss')
    setLogs(prev => [...prev, { date, log }])
  }, [])

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  )
}
