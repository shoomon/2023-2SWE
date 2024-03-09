from packages.Spot import Hazard
from .check import Check
from .check_boundary import CheckBoundary

class CheckIsHazardSpot(Check):

  def __init__(self):
    pass
  def check(self, mapInfo, position):
    return CheckBoundary().check(mapInfo, position) and isinstance(mapInfo.get_spot(position), Hazard)

