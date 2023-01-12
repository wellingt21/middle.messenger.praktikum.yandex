// @ts-expect-error
import login from './login.hbs'
import componentType from '../../types'
import loginFieldType from './types'

const component: componentType<string, loginFieldType> = {
  template: login,
  options: {
    fields: [
      {
        placeholder: 'Логин',
        id: 'login',
        type: 'text',
        errorMessage: 'Логин уже существует'
      },
      {
        placeholder: 'Пароль',
        id: 'password',
        type: 'password',
        errorMessage: 'Почта уже существует'
      }
    ]
  }
}

export default component
