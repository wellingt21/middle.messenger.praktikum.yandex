import signUpTmpl from '../signup/SignUpTmpl'

import Block from "../../core/Block";
import SignUpTmpl from "../signup/SignUpTmpl";

export default class SignUp extends Block<any> {
  constructor () {
    super( {
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


  protected render(): string {
    return SignUpTmpl
  }
}

