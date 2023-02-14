export interface IInput {
  id: string
  placeholder: string
    name?: string
  type: string
  value: string
  error?: string
    disabled: boolean
  isError?: boolean
  errorMessage?: string
  onFocus: (e: Event) => void
  onBlur: (e: Event) => void
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
