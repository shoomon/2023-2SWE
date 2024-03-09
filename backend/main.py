import io
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from packages.AddOn import AddOn
from packages.Map import Map
from packages.Position import Position
from packages.Spot import Predefined, Hazard, ColorBlob
from api import Robot, VoiceRecognition, SIM

global add_on
app = FastAPI()
add_on = None
sim = SIM()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MapBody(BaseModel):
  map: str = Field(pattern="^\(\d \d\)$")
  start: str = Field(pattern="^\(\d \d\)$")
  predefined: str = Field(pattern="^\((\(\d \d\))*\)$")
  hazard: str = Field(pattern="^\((\(\d \d\))*\)$")
  colorBlob: str = Field(pattern="^\((\(\d \d\))*\)$")

@app.post("/")
def create_map(body: MapBody):
  global add_on

  # 좌표 파싱
  [width, height] = map(int, body.map[1:-1].split())
  [start_x, start_y] = map(int, body.start[1:-1].split())
  predefined = [list(map(int, coord.split())) for coord in body.predefined[2:-2].split(")(") if coord]
  hazard = [list(map(int, coord.split())) for coord in body.hazard[2:-2].split(")(") if coord]
  color_blob = [list(map(int, coord.split())) for coord in body.colorBlob[2:-2].split(")(") if coord]

  # ADD ON 생성
  robot = Robot(Position(start_x, start_y))
  add_on = AddOn(Map(width, height), robot)

  for [x, y] in predefined:
    add_on.create_spot(Predefined(), Position(x, y))
  
  for [x, y] in hazard:
    add_on.create_spot(Hazard(), Position(x, y))

  for [x, y] in color_blob:
    add_on.create_spot(ColorBlob(), Position(x, y))
  
  result = add_on.create_path()
  
  return {
    "status": result,
    "map": { "width": width + 1, "height": height + 1 },
    "robot": robot,
    "predefined": list(map(lambda coord: { "position": { "x": coord[0], "y": coord[1] }, "detected": True }, predefined)),
    "hazard": list(map(lambda coord: { "position": { "x": coord[0], "y": coord[1] }, "detected": False }, hazard)),
    "color_blob": list(map(lambda coord: { "position": { "x": coord[0], "y": coord[1] }, "detected": False }, color_blob))
  }

@app.post("/robot")
def request_robot_movement():
  global add_on

  if not add_on:
    return { "status": False }
  
  sensor_data = sim.detect_sensor(add_on)

  if sensor_data.get("positioning"):
    add_on.update_robot_position()
  
  if sensor_data.get("hazard"):
    add_on.create_path()

  result = add_on.move_robot()

  return {
    "finished": result.get("finished"),
    "is_predefined": result.get("is_predefined"),
    "ratio": result.get("ratio"),
    "error": result.get("error"),
    "robot": add_on.robot,
    "sensor_data": sensor_data
  }

@app.post("/voice")
async def handle_voice_command(voice: UploadFile):
  global add_on

  if not add_on:
    return { "status": False, "text": None, "result": None }

  audio = await voice.read()
  buffer = io.BytesIO(audio)
  buffer.name = "audio.webm"

  voice_recognition = VoiceRecognition(add_on)
  text = voice_recognition.recognize(buffer)
  result = voice_recognition.parse(text)

  return { "status": result.get("status"), "text": text, "result": result.get("spot") }
