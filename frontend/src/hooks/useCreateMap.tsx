import { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { instance } from '../utils/axios'
import { Position } from '../utils/type'
import useLog from './useLog'
import useMap from './useMap'

type RequestBody = {
  map: string
  start: string
  predefined: string
  hazard: string
  colorBlob: string
}

type ResponseBody = {
  map: { width: number; height: number }
  robot: { position: Position; direction: number }
  predefined: { position: Position; detected: boolean }[]
  hazard: { position: Position; detected: boolean }[]
  color_blob: { position: Position; detected: boolean }[]
}

export default function useCreateMap() {
  const [form, setForm] = useState<RequestBody>({
    map: '',
    start: '',
    predefined: '',
    hazard: '',
    colorBlob: '',
  })
  const { mutateAsync } = useMutation({
    mutationFn: (body: RequestBody) => instance.post<ResponseBody>('/', body),
  })
  const { addLog } = useLog()
  const { handleCreateMap } = useMap()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))

  const handleCreate = async () => {
    if (!Object.values(form).every(value => !!value)) return

    const {
      data: { map, robot, ...data },
    } = await mutateAsync(form)

    handleCreateMap({ size: { width: map.width, height: map.height }, ...data })
    addLog('재난 지역 모델 생성')

    return robot
  }

  return { form, handleChange, handleCreate }
}
