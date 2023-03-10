import Block from '../../core/Block'
import validateString, { FormFieldTypes, validateIsSame } from '../../utils/validate'
import './signup.scss'
import { SignupFields, SignupFieldsId, SignupProps } from './types'
import { IInput } from '../../components/input/types'

export default // @ts-expect-error // TODO: fixme
class SignupPage extends Block<SignupProps> {
  protected getStateFromProps (): void {
    const onFocus = (event: Event): void => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement
      template.classList.remove('p-input_error')
    }
    const onBlur = (event: Event): void => {
      console.log(event)

      const id = (event.target as HTMLInputElement).id as SignupFieldsId
      console.log(id)

      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement
      const signupFields = { ...this.state }.signupFields as SignupFields
      const currentField = signupFields.find(
        (field) => field.id === id
      ) as IInput
      let validateField
      if (id === 'password_repeat') {
        const passwordInputValue = (
          this.refs.password.querySelector('#password') as HTMLInputElement
        ).value
        validateField = validateIsSame(
          inputElement.value,
          passwordInputValue,
          FormFieldTypes.password_repeat
        )
      } else {
        // @ts-expect-error
        validateField = validateString(inputElement.value, FormFieldTypes[id])
      }
      currentField.isError = !validateField.isValid
      currentField.errorMessage = validateField.message
      currentField.value = validateField.value
      this.setState({ signupFields })
    }
    const state: SignupProps = {
      signupFields: [
        {
          placeholder: 'pochta',
          id: 'email',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'login',
          id: 'login',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'name',
          id: 'first_name',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'surname',
          id: 'second_name',
          type: 'text',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: '??????????????',
          id: 'phone',
          type: 'number',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: '????????????',
          id: 'password',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'password again',
          id: 'password_repeat',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        }
      ],
      onSignup: () => {
        const inputValues = {
          email: (this.refs.email.querySelector('#email') as HTMLInputElement)
            ?.value,
          login: (this.refs.login.querySelector('#login') as HTMLInputElement)
            ?.value,
          first_name: (
            this.refs.login.querySelector('#first_name') as HTMLInputElement
          )?.value,
          second_name: (
            this.refs.second_name.querySelector('#second_name') as HTMLInputElement
          )?.value,
          password: (
            this.refs.password.querySelector('#password') as HTMLInputElement
          )?.value,
          password_repeat: (
            this.refs.password_repeat.querySelector(
              '#password_repeat'
            ) as HTMLInputElement
          )?.value
        }

        const validatedFields: Record<string, ValidateOutput> = {
          email: validateString(inputValues.email, FormFieldTypes.email),
          login: validateString(inputValues.login, FormFieldTypes.login),
          password: validateString(
            inputValues.password,
            FormFieldTypes.password
          ),
          first_name: validateString(
            inputValues.first_name,
            FormFieldTypes.first_name
          ),
          second_name: validateString(
            inputValues.second_name,
            FormFieldTypes.second_name
          ),
          password_repeat: validateIsSame(
            inputValues.password_repeat,
            inputValues.password,
            FormFieldTypes.password_repeat
          )
        }
        const nextInputFields = state.signupFields.map((field) => {
          if (field.id in validatedFields) {
            const validatedField = validatedFields?.[field.id]
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
        this.setState({ signupFields: nextInputFields })
        console.log(inputValues)
      }
    }
    this.state = state
  }

  protected render (): string {
    return `<main class="signup-page">
            <section class="signup-form-wrapper">
              <form class="signup-form">
                <h1 class="signup-form__title">registration</h1>
                {{#each signupFields}}
                  {{{input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
                {{/each}}
                {{{Button text="????????????????????????????????????" modificator="primary" onClick=onSignup}}}
                <a class="signup-form__registration-link" href="/">??????????</a>
              </form>
            </section>
          </main>`
  }
}
