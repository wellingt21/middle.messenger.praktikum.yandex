import 'normalize.css'

import Login from './pages/login/login'
import Profile from './pages/profile/profile'

import NotFound from './pages/notfound/notfound'

import registerComponent from './core/registerComponent'
import Button from './components/button/button'
import Input from './components/input/input'
import renderDOM from './core/renderDOM'
import SignupPage from './pages/signup/signup'
import Photo from './components/photo/photo'
import EditPage from './pages/edit/edit'
import ChatPage from './pages/chat/chat'
import ErrorPage from './pages/fix/fix'

export type pagesArray = Record<string, componentType<string, fieldTypes>>

export type fieldTypes = any // TODO: temporary

(() => {
  registerComponent(Button) // TODO: registration
  registerComponent(Input)
  registerComponent(Photo)
})()

const pages: any = {
  // @ts-expect-error // TODO: same
  chat: new ChatPage(),
  // @ts-expect-error // TODO: same
  edit: new EditPage(),
  // @ts-expect-error // TODO: same
  fix: new ErrorPage(),
  // @ts-expect-error
  login: new Login(),
  // @ts-expect-error // TODO: same
  profile: new Profile(),
  // @ts-expect-error // TODO: fixme
  signup: new SignupPage()
}

window.onload = () => {
  const path: string = window.location.pathname.replace(/\//, '')

  // @ts-expect-error
  const page: componentType<string, fieldTypes> = pages !== null ? pages[path] : new NotFound()

  if (page !== null) {
    renderDOM(page)
  }
}
