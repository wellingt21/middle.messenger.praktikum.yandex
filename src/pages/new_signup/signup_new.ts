import signUpTmpl from './SignUpTmpl'
import TestBlock from '../../modules/TestBlock'

// import { template } from '../../components/button/template'

export class Signup_new extends TestBlock {
  constructor () {
    super('signup', {
      template: signUpTmpl,
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
}
