from packages.Check import CheckBoundary, Check
from packages.Spot import Hazard
from .check import Check
from .check_boundary import CheckBoundary

class DetectHazardSpot(Check):
  def check(self, mapInfo, position):
    if CheckBoundary().check(mapInfo, position) and isinstance(mapInfo.get_spot(position), Hazard) and mapInfo.get_spot(position).get_detect() == 0:
      mapInfo.detect_spot(position)
      return position
    else:
      return None
