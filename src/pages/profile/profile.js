import profile from './profile.hbs'

// TODO: форматрование номера телефона по шаблону (регекс)
const component = {
  template: profile,
  options: {
    profileInfo: [
      { label: 'Почта', value: 'pochta@yandex.ru' },
      { label: 'Логин', value: 'ivanivanov' },
      { label: 'Имя', value: 'Иван' },
      { label: 'Фамилия', value: 'Иванов' },
      { label: 'Имя в чате', value: 'Иван' },
      { label: 'Телефон', value: '+7 (909) 9773030' }
    ],
    img: null,
    name: 'Иван'
  }
}

export default component
