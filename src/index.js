import hbs from 'handlebars'
import 'normalize.css'

import Auth from './pages/signup/signup'
import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Profile from './pages/profile/profile'
import Edit from './pages/edit/edit'

import notFound from './pages/404/404'
import fixingPage from './pages/500/500'
import button from './components/button.hbs'
import input from './components/input.hbs'
import photo from './components/photo.hbs'

const pages = {
  signup: Auth,
  login: Login,
  chat: Chat,
  profile: Profile,
  edit: Edit,
  fix: fixingPage
}

hbs.registerPartial('button', button)
hbs.registerPartial('input', input)
hbs.registerPartial('photo', photo)

const renderPage = ({ template, options }) => template(options)

window.onload = () => {
  const path = window.location.pathname.replace(/\//, '')
  const page = pages[path] || notFound
  const root = document.querySelector('#app')

  root.innerHTML = renderPage(page)
}
