class Spot:
  def __init__(self):
    self.detect = 0
    self.arrive = 0
    pass

  def get_detect(self):
    return self.detect
  
  def get_arrive(self):
    return self.arrive

  def detected(self):
    if not self.detect:
      self.detect = 1

  def arrived(self):
    if not self.arrive:
      self.arrive = 1
      return { "finished": False, "error": None, "already_arrived": False }
    else:
      return { "finished": False, "error": None, "already_arrived": True }
