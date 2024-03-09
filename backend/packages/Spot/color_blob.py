from .spot import Spot

class ColorBlob(Spot):
  def detected(self):
    self.detect = 1
