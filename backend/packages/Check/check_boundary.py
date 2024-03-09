from .check import Check

class CheckBoundary(Check):
  def check(self, mapInfo, position):
    x, y = position.get_x(), position.get_y()

    return 0 <= x and x <= mapInfo.get_width() and 0 <= y and y <= mapInfo.get_height() # 추후 수정
