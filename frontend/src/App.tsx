import styled, { createGlobalStyle } from 'styled-components'
import Coordinate from './components/Coordinate'
import Log from './components/Log'
import Form from './components/Form'
import Button from './components/Button'
import Robot from './components/Robot'
import useInputVoiceCommand from './hooks/useInputVoiceCommand'
import useCreateMap from './hooks/useCreateMap'
import useRobot from './hooks/useRobot'
import useMap from './hooks/useMap'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Pretendard, 'Noto Sans KR', sans-serif;
  }

  html, body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  #root {
    display: flex;
    justify-content: center;
    gap: 80px;
  }
`

const Section = styled.div`
  display: grid;
  grid-template-rows: 1fr 50px;
  grid-gap: 20px;
  width: 300px;
  height: 400px;
`

export default function App() {
  const { map } = useMap()
  const { form, handleChange, handleCreate } = useCreateMap()
  const { handleStartRecord, handleStopRecord, isRecording, isPending } =
    useInputVoiceCommand()
  const { robot, finished, handleSetRobot } = useRobot(
    !!map && !isRecording && !isPending,
  )

  const handleCreateMap = async () => {
    const data = await handleCreate()

    if (!data) return

    handleSetRobot({
      position: { x: data.position.x, y: data.position.y },
      direction: data.direction,
    })
  }

  return (
    <>
      <GlobalStyle />

      {map ? (
        <Coordinate>{robot ? <Robot {...robot} /> : null}</Coordinate>
      ) : null}

      {!map ? (
        <Section>
          <Form>
            <Form.Input
              name="map"
              placeholder="맵 크기"
              value={form.map}
              onChange={handleChange}
            />
            <Form.Input
              name="start"
              placeholder="시작 위치"
              value={form.start}
              onChange={handleChange}
            />
            <Form.Input
              name="predefined"
              placeholder="탐색 위치"
              value={form.predefined}
              onChange={handleChange}
            />
            <Form.Input
              name="hazard"
              placeholder="위험 지점"
              value={form.hazard}
              onChange={handleChange}
            />
            <Form.Input
              name="colorBlob"
              placeholder="중요 지점"
              value={form.colorBlob}
              onChange={handleChange}
            />
          </Form>
          <Button onClick={handleCreateMap}>재난 지역 모델 생성</Button>
        </Section>
      ) : (
        <Section>
          <Log />
          {!finished ? (
            <Button
              onClick={isRecording ? handleStopRecord : handleStartRecord}
              disabled={isRecording}
            >
              {isRecording ? '녹음 중...' : '일시정지'}
            </Button>
          ) : (
            <Button onClick={() => window.location.reload()}>탐색 종료</Button>
          )}
        </Section>
      )}
    </>
  )
}
