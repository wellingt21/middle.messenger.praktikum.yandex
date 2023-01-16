// @ts-expect-error
import edit from './edit.hbs'
import editFieldType from './types'

const component: componentType<string, editFieldType> = {
  template: edit,
  options: {
    fields: [
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
        placeholder: 'Имя в чате',
        id: 'display_name',
        type: 'text'
      },
      {
        placeholder: 'Телефон',
        id: 'phone',
        type: 'text'
      }
    ],
    // img: null,
    name: 'Иван'
  }
}

export default component
