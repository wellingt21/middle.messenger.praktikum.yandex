type SignupFields = IInputProps[]

interface SignupProps {
  signupFields: SignupFields
  onSignup: () => void
}

type SignupFieldsId =
  | 'login'
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'firstName'
  | 'lastName'

export interface signupFieldType {
  placeholder: string
  id: string
  type: string
  error: string
}
