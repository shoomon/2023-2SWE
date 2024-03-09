/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

type LogContextType = {
  logs: Array<{ date: string; log: string }>
  addLog: (log: string) => void
}

export const LogContext = createContext<LogContextType>({
  logs: [],
  addLog: () => {},
})

export default function useLog() {
  const context = useContext(LogContext)

  if (!context) throw new Error('Cannot find LogProvider')

  return context
}
