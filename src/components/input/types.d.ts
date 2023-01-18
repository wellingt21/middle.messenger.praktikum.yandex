// interface IInput {
//   id: string
//   placeholder: string
//   type: string
//   value: string
//   errorMessage: string
//   isError: boolean
//   onFocus: (e: Event) => void
//   onBlur: (e: Event) => void
// }
//
// interface InputProps {
//   id: string
//   placeholder: string
//   type: string
//   value: string
//   errorMessage: string
//   isError: boolean
//   events: BlockEvents
// }

export interface IInput {
  id: string
  placeholder: string
  type: string
  value: string
  error: string
  isError: boolean
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
