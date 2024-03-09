from packages.Spot import Empty, Predefined

class Map:
  def __init__(self, width, height):
    self.width = width
    self.height = height
    self.spots = [[Empty() for _ in range(width + 1)] for _ in range(height + 1)]
    self.numOfTotalTarget = 0
    self.numOfArrivedTarget = 0

  def get_width(self):
    return self.width

  def get_height(self):
    return self.height
  
  def is_finished(self):
    return self.numOfArrivedTarget == self.numOfTotalTarget

  def get_spot(self, position):
    x, y = position.get_x(), position.get_y()
    return self.spots[-(y+1)][x]

  def add_spot(self, spot, position, checks):
    for check in checks:
      if not check.check(self, position):
        return False

    if isinstance(spot, Predefined):
      self.numOfTotalTarget += 1
    
    self.spots[-(position.y + 1)][position.x] = spot

    return True

  def detect_spot(self, position):
    self.get_spot(position).detected()

  def arrive_spot(self, position):
    arrived_spot = self.get_spot(position)
    status = arrived_spot.arrived()

    if isinstance(arrived_spot, Predefined) and not status.get("already_arrived"):
      self.numOfArrivedTarget += 1

      return {
        "finished": self.numOfArrivedTarget == self.numOfTotalTarget,
        "error": None,
        "is_predefined": True,
        "ratio": f'{self.numOfArrivedTarget} / {self.numOfTotalTarget}'
      }

    return {
      "finished": status.get("finished"),
      "error": status.get("error"),
      "is_predefined": False,
      "ratio": f'{self.numOfArrivedTarget} / {self.numOfTotalTarget}'
    }

