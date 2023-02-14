import Block from '../../core/Block'
import template from './login.hbs'
import { LoginForm } from '../../components/form/loginForm/loginForm'
import { validateForm } from '../../core/validation/validateForm'
import { getFormData } from '../../core/helpers/getFormData'
import AuthController from '../../core/api/controllers/AuthController'

export class AuthPage extends Block {
  constructor () {
    super({})
  }

  protected init () {
    this.children.loginForm = new LoginForm({
      events: {
        submit: (event: Event | undefined) => {
          event.preventDefault()
          if (validateForm(event)) {
            const data = getFormData(event)
            AuthController.signin(data as SigninData)
          }
        }
      }
    })
  }

  protected render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
