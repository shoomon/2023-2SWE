from packages.Spot import Empty
from .check import Check

class CheckIsEmptySpot(Check):
  def __init__(self):
    pass

  def check(self, mapInfo, position):
    return isinstance(mapInfo.get_spot(position), Empty)
