from packages.Movement import Forward, Turn

class Path:
  def __init__(self, route):
    self.route = route

  def create_movement(self, robot):
    if len(self.route) <= 1:
      return None

    if robot.get_sight_position() == self.route[1]:
      self.remove_current_position()
      return Forward()
    else:
      return Turn()

  def remove_current_position(self):
    del self.route[0]