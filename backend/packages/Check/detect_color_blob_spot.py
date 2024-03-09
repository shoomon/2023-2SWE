from packages.Position import Position
from packages.Spot import ColorBlob
from .check import Check
from .check_boundary import CheckBoundary

class DetectColorBlobSpot(Check):
  def check(self, mapInfo, position):
    x, y, detected = position.get_x(), position.get_y(), []

    for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
      pos = Position(x + dx, y + dy)
      if CheckBoundary().check(mapInfo, pos) and isinstance(mapInfo.get_spot(pos), ColorBlob) and mapInfo.get_spot(pos).get_detect() == 0:
        mapInfo.detect_spot(pos)
        detected.append(pos)
    
    return detected
