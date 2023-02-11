export type LoginFields = any

interface LoginPageProps {
  loginFields: LoginFields
  onLogin: () => void
}

type LoginFieldsId = 'password' | 'login'
