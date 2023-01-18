import 'normalize.css'

import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Profile from './pages/profile/profile'
import Edit from './pages/edit/edit'

import notFound from './pages/404/404'
import fixingPage from './pages/500/500'

import profileInfoFieldType from './pages/profile/types'
import editFieldType from './pages/edit/types'
import loginFieldType from './pages/login/types'

import registerComponent from './core/registerComponent'
import Button from './components/button/button'
import Input from './components/input/input'
import renderDOM from './core/renderDOM'
import SignupPage from './pages/signup'
import { signupFieldType } from './pages/signup/types'

export type pagesArray = Record<string, componentType<string, fieldTypes>>

export type fieldTypes =
  signupFieldType
  | loginFieldType
  | profileInfoFieldType
  | editFieldType
  | null
  | {}
  | any

(() => {
  registerComponent(Button)
  registerComponent(Input)
})()

const pages: any = {
  chat: Chat,
  edit: Edit,
  fix: fixingPage,
  login: Login,
  profile: Profile,
  // @ts-expect-error // TODO: fixme
  signup: new SignupPage()
}

window.onload = () => {
  const path: string = window.location.pathname.replace(/\//, '')

  const page: componentType<string, fieldTypes> = pages !== null ? pages[path] : notFound

  if (page !== null) {
    renderDOM(page)
  }
}
