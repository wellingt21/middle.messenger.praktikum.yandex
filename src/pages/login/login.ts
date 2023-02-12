import './login.scss'
import Block from '../../core/block/Block'
import validateString, { FormFieldTypes } from '../../utils/validate'
import { IInput } from '../../components/input/types'
import { LoginFieldsId, LoginPageProps } from './types'

export default // @ts-expect-error
class LoginPage extends Block<LoginPageProps> {
  getStateFromProps (): void {
    const onFocus = (event: Event): void => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement
      template.classList.remove('p-input_error')
    }
    const onBlur = (event: Event): void => {
      const id = (event.target as HTMLInputElement).id as LoginFieldsId
      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement
      const loginFields = { ...this.state }.loginFields
      const currentField = loginFields.find(
        (field: any) => field.id === id
      ) as IInput
      const validateField = validateString(
        inputElement.value,
        FormFieldTypes[id]
      )
      currentField.isError = !validateField.isValid
      currentField.errorMessage = validateField.message
      currentField.value = validateField.value
      this.setState({ loginFields })
    }

    const state: LoginPageProps = {
      loginFields: [
        {
          placeholder: 'Логин',
          id: 'login',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'Пароль',
          id: 'password',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        }
      ],
      onLogin: () => {
        const inputValues = {
          login: (this.refs.login.querySelector('#login') as HTMLInputElement)
            ?.value,
          password: (
            this.refs.password.querySelector('#password') as HTMLInputElement
          )?.value
        }
        if ('loginFields' in state) {
          const validatedFields: Record<string, ValidateOutput> = {
            login: validateString(inputValues.login, FormFieldTypes.login),
            password: validateString(
              inputValues.password,
              FormFieldTypes.password
            )
          }
          const nextInputFields = state.loginFields.map((field: any) => {
            const fieldId = field.id
            if (fieldId in validatedFields) {
              const validatedField = validatedFields?.[fieldId]
              if (!validatedField.isValid) {
                field.isError = true
                field.errorMessage = validatedField.message
              } else {
                field.isError = false
                field.errorMessage = ''
              }
              field.value = validatedField.value
            }
            return field
          })
          this.setState({ loginFields: nextInputFields })
          console.log(inputValues)
        }
      }
    }
    this.state = state
  }

  render (): string {
    return `
        <main class="login-page">
          <section class="login-form-wrapper">
            <form class="login-form">
              <h1 class="login-form-title">Вход</h1>
              {{#each loginFields}}
                {{{input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
              {{/each}}
              {{{Button text="Авторизоваться" modificator="primary" onClick=onLogin}}}
              <a class="login-form-registration-link" href="/signup">Нет аккаунта?</a>
            </form>
          </section>
        </main>`
  }
}
