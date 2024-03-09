/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import { Position, SpotType } from '../utils/type'

export type MapContextType = {
  map:
    | {
        size: { width: number; height: number }
        [SpotType.PREDEFINED]: { position: Position; detected: boolean }[]
        [SpotType.HAZARD]: { position: Position; detected: boolean }[]
        [SpotType.COLOR_BLOB]: { position: Position; detected: boolean }[]
      }
    | undefined
  handleCreateMap: (map: MapContextType['map']) => void
  handleAddSpot: (type: SpotType, position: Position) => void
  handleDetectSpot: (type: SpotType, position: Position) => void
}

export const MapContext = createContext<MapContextType>({
  map: undefined,
  handleCreateMap: () => {},
  handleAddSpot: () => {},
  handleDetectSpot: () => {},
})

export default function useMap() {
  const context = useContext(MapContext)

  if (!context) throw new Error('Cannot find MapProvider')

  return context
}
