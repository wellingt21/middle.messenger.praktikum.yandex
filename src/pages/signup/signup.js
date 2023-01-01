import signup from './signup.hbs'

const component = {
  template: signup,
  options: {
    signupFields: [
      {
        placeholder: 'Почта',
        id: 'email',
        type: 'text'
      },
      {
        placeholder: 'Логин',
        id: 'login',
        type: 'text'
      },
      {
        placeholder: 'Имя',
        id: 'first_name',
        type: 'text'
      },
      {
        placeholder: 'Фамилия',
        id: 'second_name',
        type: 'text'
      },
      {
        placeholder: 'Телефон',
        id: 'phone',
        type: 'text'
      },
      {
        placeholder: 'Пароль',
        id: 'password',
        type: 'password'
      },
      {
        placeholder: 'Пароль (ещё раз)',
        id: 'password_repeat',
        type: 'password'
      }
    ]
  }
}

export default component
