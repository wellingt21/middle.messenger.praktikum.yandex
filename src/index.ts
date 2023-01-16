// @ts-expect-error
import hbs from 'handlebars'
import 'normalize.css'

import Auth from './pages/signup/signup'
import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Profile from './pages/profile/profile'
import Edit from './pages/edit/edit'

import notFound from './pages/404/404'
import fixingPage from './pages/500/500'
// @ts-expect-error
import button from './components/button.hbs'
// @ts-expect-error
import input from './components/input.hbs'
// @ts-expect-error
import photo from './components/photo.hbs'
// import { fieldTypes } from './index.d.ts'
import signupFieldType from './pages/signup/types'
import profileInfoFieldType from './pages/profile/types'
import editFieldType from './pages/edit/types'
import loginFieldType from './pages/login/types'

export type pagesArray = Record<string, componentType<string, fieldTypes>>

export type fieldTypes =
  signupFieldType
  | loginFieldType
  | profileInfoFieldType
  | editFieldType
  | null
  | {}
  | any

// const pages: pagesArray = {
// TODO: type ComponentType should be refactored due to issues with type of options and template

const pages: any = {
  signup: Auth,
  login: Login,
  chat: Chat,
  profile: Profile,
  edit: Edit,
  fix: fixingPage,
  notfound: notFound,
  newsignup: 'test'
}

hbs.registerPartial('button', button)
hbs.registerPartial('input', input)
hbs.registerPartial('photo', photo)

// const renderPage = ({ template, options }: componentType<string, fieldTypes>): any => {
//   console.log(template, options)
//
//   if (options !== null) {
//     return template(options)
//   }
//   // console.log(`index ${template}`)
//   return template
// }
//
// window.onload = () => {
//   const path: string = window.location.pathname.replace(/\//, '')
//   const page: componentType<string, fieldTypes> = pages[path] || pages.notfound
//   const root = document.querySelector('#app')
//
//   if (root !== null) {
//     console.log(page)
//     root.innerHTML = renderPage(page)
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  const path: string = window.location.pathname.replace(/\//, '')
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const page: any = pages[path] || pages.notfound
  // const page: componentType<string, fieldTypes> = pages[path] || pages.notfound TODO: typings
  console.log(page)
  // renderDOM(page)
})
