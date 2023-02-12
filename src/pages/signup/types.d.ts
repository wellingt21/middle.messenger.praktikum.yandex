// @ts-expect-error
type SignupFields = IInputProps[]

interface SignupProps {
  signupFields: SignupFields
  onSignup: () => void
}

type SignupFieldsId =
  | 'login'
  | 'email'
  | 'password'
  | 'password_repeat'
  | 'first_name'
  | 'last_name'
  | 'phone'

export interface signupFieldType {
  placeholder: string
  id: string
  type: string
  error: string
}
