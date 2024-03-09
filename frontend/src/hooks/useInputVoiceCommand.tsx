import { useEffect } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { useMutation } from '@tanstack/react-query'
import { instance } from '../utils/axios'
import useLog from './useLog'
import useMap from './useMap'
import { Position, SpotType } from '../utils/type'

type ResponseType = {
  status: boolean
  text: string
  result: { spot: SpotType; position: Position }
}

export default function useInputVoiceCommand() {
  const { addLog } = useLog()
  const { handleAddSpot } = useMap()
  const { startRecording, stopRecording, recordingBlob, isRecording } =
    useAudioRecorder()
  const { mutate, isPending } = useMutation({
    mutationFn: (voice: FormData) =>
      instance.post<ResponseType>('/voice', voice, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: ({ data }) => {
      if (!data.status) addLog(`음성 인식 실패 : ${data.text}`)
      else if (!data.result) addLog('위험/중요 지점 추가 실패')
      else {
        const spot =
          data.result.spot === SpotType.HAZARD ? '위험 지역' : '중요 지점'

        addLog(
          `(${data.result.position.x}, ${data.result.position.y})에 ${spot} 추가 완료`,
        )
        handleAddSpot(data.result.spot, data.result.position)
      }
    },
    onError: e => {
      addLog('음성 인식 실패')
      console.log(e)
    },
  })

  useEffect(() => {
    if (recordingBlob) {
      const file = new File([recordingBlob], 'voice.wav', { type: 'audio/wav' })
      const data = new FormData()
      data.append('voice', file)

      mutate(data)
    }
  }, [mutate, recordingBlob])

  const handleStartRecord = () => {
    startRecording()
    addLog('음성 인식 시작')
  }

  const handleStopRecord = () => {
    stopRecording()
    addLog('음성 인식 종료 및 파싱 중')
  }

  return { handleStartRecord, handleStopRecord, isRecording, isPending }
}
