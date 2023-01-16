// @ts-expect-error
import signup from './signup.hbs'
import signupFieldType from './types'

const component: componentType<string, signupFieldType> = {
  template: signup,
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
}

export default component
