// @ts-expect-error
import profile from './profile.hbs'
import profileInfoFieldType from './types'

const component: componentType<string, profileInfoFieldType> = {
  template: profile,
  options: {
    fields: [
      { label: 'Почта', value: 'pochta@yandex.ru' },
      { label: 'Логин', value: 'ivanivanov' },
      { label: 'Имя', value: 'Иван' },
      { label: 'Фамилия', value: 'Иванов' },
      { label: 'Имя в чате', value: 'Иван' },
      { label: 'Телефон', value: '+7 (909) 9773030' }
    ],
    // img: null,
    name: 'Иван'
  }
}

export default component
