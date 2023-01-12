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
import { componentType, fieldTypes, pagesArray } from './types'

const pages: pagesArray = {
  signup: Auth,
  login: Login,
  chat: Chat,
  profile: Profile,
  edit: Edit,
  fix: fixingPage,
  notfound: notFound
}

hbs.registerPartial('button', button)
hbs.registerPartial('input', input)
hbs.registerPartial('photo', photo)

const renderPage = ({ template, options }: componentType<string, fieldTypes>): string => {
  return template(options)
}

window.onload = () => {
  const path: string = window.location.pathname.replace(/\//, '')
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const page: componentType<string, fieldTypes> = pages[path] || pages.notfound
  const root = document.querySelector('#app')

  if (root !== null) {
    root.innerHTML = renderPage(page)
  }
}
