from .movement import Movement

class Turn(Movement):
  def execute(self, robot):
    robot.turn()