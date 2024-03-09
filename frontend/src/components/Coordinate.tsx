import { ReactNode, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import Node from './Node'
import Spot from './Spot'
import { Position, SpotType } from '../utils/type'
import useMap, { MapContext, MapContextType } from '../hooks/useMap'

type CoordinateProps = {
  children: ReactNode
}

export const Wrapper = styled.div`
  position: relative;
  display: grid;
  align-self: baseline;
`

export default function Coordinate({ children }: CoordinateProps) {
  const { map } = useMap()

  const spots = useMemo(
    () =>
      map
        ? [
            ...map.predefined.map(position => ({
              ...position,
              type: SpotType.PREDEFINED,
            })),
            ...map.hazard.map(position => ({
              ...position,
              type: SpotType.HAZARD,
            })),
            ...map.color_blob.map(position => ({
              ...position,
              type: SpotType.COLOR_BLOB,
            })),
          ]
        : [],
    [map],
  )

  if (!map) return null

  const { width, height } = map.size

  return (
    <Wrapper
      style={{ gridTemplate: `repeat(${height}, 1fr) / repeat(${width}, 1fr)` }}
    >
      {Array.from({ length: width * height }).map((_, index) => {
        const coordX = index % width
        const coordY = height - Math.floor(index / width) - 1
        const spot = spots.find(
          ({ position: { x, y } }) => x === coordX && y === coordY,
        )

        return (
          <Node key={index}>
            <Spot type={spot?.type} detected={spot?.detected} />
          </Node>
        )
      })}

      {children}
    </Wrapper>
  )
}

Coordinate.Context = function Context({ children }: CoordinateProps) {
  const [map, setMap] = useState<MapContextType['map']>()

  const handleCreateMap = useCallback(
    (data: MapContextType['map']) => setMap(data),
    [],
  )

  const handleAddSpot = useCallback(
    (type: SpotType, position: Position) =>
      setMap(prev =>
        prev
          ? {
              ...prev,
              [type]: [...prev[type], { position, detected: false }],
            }
          : prev,
      ),
    [],
  )

  const handleDetectSpot = useCallback(
    (type: SpotType, position: Position) =>
      setMap(prev =>
        prev
          ? {
              ...prev,
              [type]: prev[type].map(spot =>
                spot.position.x === position.x && spot.position.y === position.y
                  ? { ...spot, detected: true }
                  : spot,
              ),
            }
          : prev,
      ),
    [],
  )

  return (
    <MapContext.Provider
      value={{ map, handleCreateMap, handleAddSpot, handleDetectSpot }}
    >
      {children}
    </MapContext.Provider>
  )
}
