import numpy as np
from .movement import Movement

class Forward(Movement):
  def execute(self, robot):
    if np.random.uniform() < 0.1:
      robot.forward()

    robot.forward()
