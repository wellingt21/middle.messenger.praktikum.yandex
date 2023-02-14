import 'normalize.css'

import registerComponent from './core/registerComponent'

import Router from "./core/router/Router";

import Button from './components/button/button'
import Input from './components/input/input'
import Photo from './components/photo/photo'
import Avatar from './components/avatar/avatar'
import ControlLink from "./components/links/controlLink";
import BaseLink from "./components/links/link";


import Modal from './components/modal/modal'
import SignupPage from './pages/signup/signup'
import EditInfoPage from './pages/edit/info'
import EditPasswordPage from './pages/edit/password'
import ChatPage from './pages/chat/chat'
import ErrorPage from './pages/fix/fix'
import LoginPage from "./pages/login/login";
import NotFoundPage from './pages/notfound/notfound'
import ProfilePage from "./pages/profile/profile";
import ChatListBase from "./components/chat/chatList";
import ContextMenu from "./components/menu/ContextMenu";
import ContextMenuItem from "./components/menu/ContextMunuItem/ContextMenuItem";
import ContextButton from "./components/button/ContextButton/ContextButton";
import ChatHistoryBase from "./components/history/chatHistory";
import {MessageInput} from "./components/message/MessageInput/messageInput";

export type pagesArray = Record<string, componentType<string, fieldTypes>>

export type fieldTypes = any // TODO: temporary

(() => {
  registerComponent(Button) // TODO: registration
  registerComponent(Input)
  registerComponent(Photo)
    registerComponent(Avatar)
    registerComponent(Modal)
    registerComponent(ControlLink)
    registerComponent(BaseLink)
    registerComponent(ChatListBase)
    registerComponent(ContextMenu)
    registerComponent(ContextMenuItem)
    registerComponent(ContextButton)
    registerComponent(ChatHistoryBase)
    registerComponent(MessageInput)
    // registerComponent(createC)
})()

const router = new Router("#app")
router
  .use( {pathname: "/sign-up", block: SignupPage})
  .use( {pathname: "/messenger", block: ChatPage})
  .use( {pathname: "/", block: LoginPage})
  .use( {pathname: "/fix", block: ErrorPage})
  .use( {pathname: "/notfound", block: NotFoundPage})
  .use( {pathname: "/settings", block: ProfilePage})
  .use( {pathname: "/edit", block: EditInfoPage})
  .use( {pathname: "/password", block: EditPasswordPage})

window.onload = () => {
  // let isProtectedRoute = true;
  //
  // switch (window.location.pathname) {
  //   case "/login":
  //   case "/signup":
  //     isProtectedRoute = false;
  //     break;
  // }
  //
  router.start()
  //
  // if (!isProtectedRoute) {
  //   router.go("/links")
  // } else {
  //   router.go("/profile")
  // }
}
