import { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

type FormProps = {
  children: ReactNode
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 15px;
  border-radius: 7px;
  background: #f3f0ff;
`

const FormInput = styled.input`
  padding: 10px 0;
  border: 0;
  border-bottom: 2px solid #9775fa;
  background: transparent;
  font-size: 15px;
  outline: none;
`

export default function Form({ children }: FormProps) {
  return <Wrapper>{children}</Wrapper>
}

Form.Input = function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <FormInput {...props} />
}
