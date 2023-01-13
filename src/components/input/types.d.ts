export interface IInput {
  id: string
  placeholder: string
  type: string
  value: string
  error: string
  isError: boolean
  focus: (e: Event) => void
  blur: (e: Event) => void
}

export interface InputProps {
  id: string
  placeholder: string
  type: string
  value: string
  errorMessage: string
  isError: boolean
  events: BlockEvents
}
