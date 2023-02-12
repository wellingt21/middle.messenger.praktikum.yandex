import Block from '../../core/block/Block'
import './profile.scss'
import '../../components/photo/photo'
import {AuthAPI} from "../../core/api/auth";

const state: ProfilePageProps = {
  img: {
    src: 'static/images/default_profile_image.png.png',
    alt: 'Аватар пользователя'
  },
  name: 'ivanIvanov', // TODO:dynamically
  profileInfo: [
    { label: 'Почта', value: 'pochta@yandex.ru' },
    { label: 'Логин', value: 'ivanIvanov' },
    { label: 'Имя', value: 'ivan' },
    { label: 'Фамилия', value: 'ivanov' },
    { label: 'Имя в чате', value: 'ivan ivanov' },
    { label: 'Телефон', value: '+79032678712' }
  ]
}
export default // @ts-expect-error
class ProfilePage extends Block<ProfilePageProps> {
  getStateFromProps (): void {
    this.state = state
  }
  async onLoad(): Promise<void> {
	const api = new AuthAPI()
	await api.read().then(r => console.log(r))
	this.state.profileInfo.map((field: ProfileInfo) => {
	  console.log(field)
	})
  }

  render (): string {
    return `<main class="profile-page">
              <nav class="profile-page-back">
                <a href="#" class="profile-page-link">
                  <div class="profile-page-back-icon">
                    <div class="profile-page-back-arrow"></div>
                  </div>
                </a>
              </nav>
              <section class="profile-info-wrapper">
                <div class="profile-info">
                  <div class="profile-info-picture">
                    {{{Photo img=img}}}
                  </div>
                  <div class="profile-info-name">{{name}}</div>
                  <ul class="profile-info-info-list">
                    {{#each profileInfo}}
                      <li class="profile-info-item">
                        <label class="profile-info-label">{{label}}</label>
                        <input class="profile-info-input" disabled type="text" value="{{value}}" />
                      </li>
                    {{/each}}
                  </ul>
                  <ul class="profile-info-change-info">
                    <li class="profile-info-item">
                      <a class="profile-info-item-link" href="#">Изменить данные</a>
                    </li>
                    <li class="profile-info-item">
                      <a class="profile-info-item-link" href="#">Изменить пароль</a>
                    </li>
                    <li class="profile-info-item profile-info-item_danger">
                      <a class="profile-info-item-link" href="#">Выйти</a>
                    </li>
                  </ul>
                </div>
              </section>
            </main>`
  }
}
