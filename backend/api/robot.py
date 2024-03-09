from packages.Position import Position

delta_position_by_direction = [(0, 1), (1, 0), (0, -1), (-1, 0)]

class Robot:
  def __init__(self, position):
    self.position = position
    self.direction = 1 # 0: 위쪽, 1: 오른쪽, 2: 아래쪽, 3: 왼쪽

  def get_position(self):
    return self.position

  def get_sight_position(self):
    dx, dy = delta_position_by_direction[self.direction]
    return Position(self.position.get_x() + dx, self.position.get_y() + dy)
  
  def forward(self):
    dx, dy = delta_position_by_direction[self.direction]
    self.position = Position(self.position.get_x() + dx, self.position.get_y() + dy)
    
  def turn(self):
    self.direction = (self.direction + 1) % 4
