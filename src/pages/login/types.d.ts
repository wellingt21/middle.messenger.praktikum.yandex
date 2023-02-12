export type LoginFields = any

interface LoginPageProps {
  loginFields: LoginFields
  onLogin: () => void
  onLogout: () => void // TODO: remove tempo shit
}

type LoginFieldsId = 'password' | 'login'
