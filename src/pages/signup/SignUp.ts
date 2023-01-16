import SignUpTmpl from '../signup/SignUpTmpl'
import { IInput } from '../../components/input/types'

import Block from '../../core/Block'

/* eslint-disable no-useless-escape */
export enum FormFieldTypes {
  login,
  password,
  firstName,
  lastName,
  email,
  repeatPassword,
}

type SignupFields = any

interface SignupProps {
  signupFields: SignupFields
  onSignup: () => void
}

type SignupFieldsId =
  | 'login'
  | 'email'
  | 'password'
  | 'repeatPassword'
  | 'firstName'
  | 'lastName'

const email =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i

const VALIDATORS_REG_EXP: Record<string, RegExp> = {
  email,
  firstName: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
  lastName: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
  login: /^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/,
  password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/
}
const VALIDATORS_MESSAGES: Record<string, string> = {
  login: 'Неверный формат логина',
  password: 'Неверный формат пароля',
  firstName: 'Неверный формат Имени',
  lastName: 'Неверный формат Фамилии',
  email: 'Неверный формат email',
  phone: 'Неверный формат телефона',
  repeatPassword: 'Пароли не совпадают'
}

interface ValidateOutput {
  isValid: boolean
  value: string
  message: string
}

const validateString = (
  value: string,
  type: FormFieldTypes
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value,
    message: ''
  }
  if (value === '') {
    value = ''
  }
  const TYPE_KEY = FormFieldTypes[type]
  if (TYPE_KEY !== '') {
    if (!VALIDATORS_REG_EXP[TYPE_KEY].test(value)) {
      result.isValid = false
      result.message = VALIDATORS_MESSAGES[TYPE_KEY]
    }
  }
  return result
}
export const validateIsSame = (
  validatedValue: string,
  comparableValue: string,
  type: FormFieldTypes
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value: validatedValue,
    message: ''
  }
  const TYPE_KEY = FormFieldTypes[type]
  if (validatedValue !== comparableValue || validatedValue.length === 0) {
    result.isValid = false
    result.message = VALIDATORS_MESSAGES[TYPE_KEY]
  }
  return result
}

export default class SignUp extends Block<any> {
  constructor () {
    super({
      template: SignUpTmpl,
      options: {
        fields: [
          {
            placeholder: 'Почта',
            id: 'email',
            type: 'email',
            error: 'something'
          },
          {
            placeholder: 'Логин',
            id: 'login',
            type: 'text',
            error: 'something'
          },
          {
            placeholder: 'Имя',
            id: 'first_name',
            type: 'text',
            error: 'something'
          },
          {
            placeholder: 'Фамилия',
            id: 'second_name',
            type: 'text',
            error: 'something'
          },
          {
            placeholder: 'Телефон',
            id: 'phone',
            type: 'text',
            error: 'something'
          },
          {
            placeholder: 'Пароль',
            id: 'password',
            type: 'password',
            error: 'something'
          },
          {
            placeholder: 'Пароль (ещё раз)',
            id: 'password_repeat',
            type: 'password',
            error: 'something'
          }
        ]
      }
    })
  }

  protected getStateFromProps (): void {
    const onFocus = (event: Event): void => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement
      template.classList.remove('p-input_error')
    }
    const onBlur = (event: Event): void => {
      const id = (event.target as HTMLInputElement).id as SignupFieldsId
      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement
      const signupFields = { ...this.state }.signupFields
      const currentField = signupFields.find(
        (field: any) => field.id === id
      ) as IInput
      let validateField
      if (id === 'repeatPassword') {
        const passwordInputValue = (
          this.refs.password.querySelector('#password') as HTMLInputElement
        ).value
        validateField = validateIsSame(
          inputElement.value,
          passwordInputValue,
          FormFieldTypes.repeatPassword
        )
      } else {
        validateField = validateString(inputElement.value, FormFieldTypes[id])
      }
      currentField.isError = !validateField.isValid
      currentField.error = validateField.message
      currentField.value = validateField.value
      this.setState({ signupFields })
    }
    const state: SignupProps = {
      signupFields: [
        {
          placeholder: 'Почта',
          id: 'email',
          type: 'text',
          value: '',
          isError: false,
          error: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'Логин',
          id: 'login',
          type: 'text',
          value: '',
          isError: false,
          error: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'Имя',
          id: 'firstName',
          type: 'text',
          value: '',
          isError: false,
          error: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'Фамилия',
          id: 'lastName',
          type: 'text',
          value: '',
          isError: false,
          error: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'Пароль',
          id: 'password',
          type: 'password',
          value: '',
          isError: false,
          error: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'И еще разочек Пароль',
          id: 'repeatPassword',
          type: 'password',
          value: '',
          isError: false,
          error: '',
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
          firstName: (
            this.refs.login.querySelector('#firstName') as HTMLInputElement
          )?.value,
          lastName: (
            this.refs.lastName.querySelector('#lastName') as HTMLInputElement
          )?.value,
          password: (
            this.refs.password.querySelector('#password') as HTMLInputElement
          )?.value,
          repeatPassword: (
            this.refs.repeatPassword.querySelector(
              '#repeatPassword'
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
          firstName: validateString(
            inputValues.firstName,
            FormFieldTypes.firstName
          ),
          lastName: validateString(
            inputValues.lastName,
            FormFieldTypes.lastName
          ),
          repeatPassword: validateIsSame(
            inputValues.repeatPassword,
            inputValues.password,
            FormFieldTypes.repeatPassword
          )
        }
        const nextInputFields = state.signupFields.map((field: any) => {
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
    return SignUpTmpl
  }
}
