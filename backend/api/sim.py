from packages.Check import DetectHazardSpot, DetectColorBlobSpot

class SIM:
  def detect_sensor(self, add_on):
    positioning = self.detect_positioning_sensor(add_on)

    if (positioning):
      add_on.update_robot_position()
      return { 'hazard': None, 'color_blob': [], 'positioning': positioning }

    hazard = self.detect_hazard_sensor(add_on)
    color_blob = self.detect_color_blob_sensor(add_on)

    return { 'hazard': hazard, 'color_blob': color_blob, 'positioning': positioning }

  def detect_hazard_sensor(self, add_on):
    return DetectHazardSpot().check(add_on.mapInfo, add_on.robot.get_sight_position())

  def detect_color_blob_sensor(self, add_on):
    return DetectColorBlobSpot().check(add_on.mapInfo, add_on.robot.get_position())

  def detect_positioning_sensor(self, add_on):
    return add_on.robot.get_position() != add_on.path.route[0]
