import login from './login.hbs'

const component = {
  template: login,
  options: {
    loginFields: [
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
