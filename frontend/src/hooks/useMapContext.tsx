/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext } from 'react'

type MapType = ('empty' | 'hazard' | 'predefined' | 'colorBlob')[][]

export const MapContext = createContext<MapType>([])

export default function useMapContext() {
  const map = useContext(MapContext)

  if (!map) throw new Error('Cannot find MapContext')

  return map
}
