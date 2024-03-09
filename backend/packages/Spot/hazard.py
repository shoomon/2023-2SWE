from .spot import Spot

class Hazard(Spot):
  def detected(self):
    self.detect = 1

  def arrived(self):
    return { "finished": True, "error": "위험 지역 도착", "already_arrived": False }
