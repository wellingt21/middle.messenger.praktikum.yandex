import 'normalize.css'

import registerComponent from './core/registerComponent'

import Router from "./core/router/Router";

import Button from './components/button/button'
import Input from './components/input/input'
import Photo from './components/photo/photo'
import SignupPage from './pages/signup/signup'

import EditPage from './pages/edit/edit'
import ChatPage from './pages/chat/chat'
import ErrorPage from './pages/fix/fix'
import LoginPage from "./pages/login/login";
import NotFoundPage from './pages/notfound/notfound'
import ProfilePage from "./pages/profile/profile";

export type pagesArray = Record<string, componentType<string, fieldTypes>>

export type fieldTypes = any // TODO: temporary

(() => {
  registerComponent(Button) // TODO: registration
  registerComponent(Input)
  registerComponent(Photo)
})()

const router = new Router("#app")
router
  .use( {pathname: "/signup", block: SignupPage})
  .use( {pathname: "/chat", block: ChatPage})
  .use( {pathname: "/login", block: LoginPage})
  .use( {pathname: "/fix", block: ErrorPage})
  .use( {pathname: "/notfound", block: NotFoundPage})
  .use( {pathname: "/profile", block: ProfilePage})
  .use( {pathname: "/edit", block: EditPage})


window.onload = () => {
  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case "/login":
    case "/signup":
      isProtectedRoute = false;
      break;
  }

  router.start()

  if (!isProtectedRoute) {
    router.go("/chat")
  } else {
    router.go("/profile")
  }
}
