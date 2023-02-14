import Router from './core/Router'
import { AuthPage } from './pages/login/login'
import { RegistrationPage } from './pages/signup/signup'
import { ProfilePage } from './pages/profile/profile'
import { ChatPage } from './pages/chat/chat'
import { Routes } from './utils/routes'
import AuthController from './core/api/controllers/AuthController'

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, AuthPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Messenger, ChatPage)

  let isProtectedRoute = true

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Register:
      isProtectedRoute = false
      break
  }

  try {
    await AuthController.fetchUser()

    Router.start()
    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start()
    if (isProtectedRoute) {
      Router.go(Routes.Index)
    }
  }
})
