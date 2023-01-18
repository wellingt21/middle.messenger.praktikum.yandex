// @ts-expect-error
import hbs from 'handlebars'
import 'normalize.css'

import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Profile from './pages/profile/profile'
import Edit from './pages/edit/edit'

import notFound from './pages/404/404'
import fixingPage from './pages/500/500'
// @ts-expect-error
import button from './components/button/button.hbs'
// @ts-expect-error
import input from './components/input/input.hbs'
// @ts-expect-error
import photo from './components/photo.hbs'
// import { fieldTypes } from './index.d.ts'
import signupFieldType from './pages/signup/types'
import profileInfoFieldType from './pages/profile/types'
import editFieldType from './pages/edit/types'
import loginFieldType from './pages/login/types'
import SignUpPage from './pages/signup/SignUp'

import registerComponent from './core/registerComponent'
import Button from './components/button/button'
import Input from './components/input/input'
import renderDOM from './core/renderDOM'

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

// const pages: pagesArray = {
// TODO: type ComponentType should be refactored due to issues with type of options and template

// TODO: fix manual registration
hbs.registerPartial('button', button)
hbs.registerPartial('input', input)
hbs.registerPartial('photo', photo)

const pages: any = {
  // signup: Auth,
  login: Login,
  chat: Chat,
  profile: Profile,
  edit: Edit,
  fix: fixingPage,
  notfound: notFound,
  signup: SignUpPage
}

window.onload = () => {
  const path: string = window.location.pathname.replace(/\//, '')

  // eslint-ignore-next-line
  const page: any = pages[path] || pages.notfound
  // const page: componentType<string, fieldTypes> = pages[path] || pages.notfound TODO: typings

  if (page !== null) {
    renderDOM(page)
  }
}
