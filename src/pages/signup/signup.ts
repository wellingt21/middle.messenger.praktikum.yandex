import Block from '../../core/Block'
import template from './signup.hbs'
import { RegistrationForm } from '../../components/form/registrationForm/registrationForm'
import { getFormData } from '../../core/helpers/getFormData'
import { validateForm } from '../../core/validation/validateForm'
import AuthController from '../../core/api/controllers/AuthController'
export class RegistrationPage extends Block {
  constructor () {
    super({})
  }

  protected init () {
    this.children.registrationForm = new RegistrationForm({
      events: {
        submit: (event: Event | undefined) => {
          event.preventDefault()
          if (validateForm(event)) {
            const data = getFormData(event)
            AuthController.signup(data as SignupData)
          }
        }
      }
    })
  }

  protected render (): DocumentFragment {
    return this.compile(template, this.props)
  }
}
