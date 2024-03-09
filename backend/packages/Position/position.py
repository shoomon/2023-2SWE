class Position:
  def __init__(self, x, y):
    self.x = x
    self.y = y
  
  def get_x(self):
    return self.x 
  
  def get_y(self):
    return self.y

  def __str__(self):
    return f'({self.x}, {self.y})'

  def __eq__(self, other):
    return self.x == other.x and self.y == other.y

  def __add__(self, other):
    return Position(self.x + other.x, self.y + other.y)
