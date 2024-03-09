from collections import deque
from packages.Position import Position
from packages.Spot import Predefined
from packages.Check import CheckBoundary, CheckIsEmptySpot, CheckIsHazardSpot
from packages.Path import Path

search_order = [[0, 1], [0, -1], [1, 0], [-1, 0]]  # 상, 하, 우, 좌

class AddOn:
  def __init__(self, mapInfo, robot):
    self.mapInfo = mapInfo
    self.robot = robot
    self.path = Path([])

  def create_spot(self, spot, position):
    return self.mapInfo.add_spot(spot, position, [CheckBoundary(), CheckIsEmptySpot()])

  def update_robot_position(self):
    self.create_path()

  def move_robot(self):
    movement = self.path.create_movement(self.robot)

    if movement is None:
      if self.mapInfo.is_finished():
        return { "finished": True, "error": None }
      else:
        return { "finished": False, "error": "경로 탐색 실패" }

    movement.execute(self.robot)

    if not CheckBoundary().check(self.mapInfo, self.robot.get_position()):
      return { "finished": True, "error": "재난 지역 모델 이탈" }

    result = self.mapInfo.arrive_spot(self.robot.get_position())

    if not result.get("finished") and result.get("is_predefined"):
      self.create_path()
    
    return result

  def create_path(self):
    if not CheckBoundary().check(self.mapInfo, self.robot.get_position()) or CheckIsHazardSpot().check(self.mapInfo, self.robot.get_position()):
      return False
    
    path = [[None] * (self.mapInfo.get_width() + 1) for _ in range(self.mapInfo.get_height() + 1)]
    queue = deque([self.robot.get_position()])
    visited = [self.robot.get_position()]

    while queue:
      current_pos = queue.popleft()

      if isinstance(self.mapInfo.get_spot(current_pos), Predefined) and not self.mapInfo.get_spot(current_pos).get_arrive():
        result, target = [], current_pos

        while target is not None:
          result.append(target)
          target = path[-(target.get_y() + 1)][target.get_x()]

        self.path = Path(result[::-1])

        return True

      for [x, y] in search_order:
        next_pos = current_pos + Position(x, y)

        if not CheckBoundary().check(self.mapInfo, next_pos):
          continue

        if next_pos in visited:
          continue

        if CheckIsHazardSpot().check(self.mapInfo, next_pos) and self.mapInfo.get_spot(next_pos).get_detect() == 1:
          continue

        queue.append(next_pos)
        visited.append(next_pos)
        path[-(next_pos.get_y() + 1)][next_pos.get_x()] = current_pos
    
    return False
