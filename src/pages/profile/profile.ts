import Block from '../../core/block/Block'
import './profile.scss'
import '../../components/photo/photo'
import {AuthAPI} from "../../core/api/auth";
import {User} from "../../core/api/types";
// @ts-ignore todo: do not hardcode it that way
import image from '../../../static/images/default_profile_image.png'

const state: ProfilePageProps = {
    avatar: "static/images/default_profile_image.png",
    img: {
        src: image,
        alt: 'Аватар пользователя'
    },
    name: '', // TODO:dynamically
    profileInfo: [
    { label: 'Почта', value: '', tag: 'email' },
    { label: 'Логин', value: '', tag: 'login' },
    { label: 'Имя', value: '', tag: 'first_name' },
    { label: 'Фамилия', value: '', tag: 'second_name' },
    { label: 'Имя в чате', value: '', tag: 'display_name' },
    { label: 'Телефон', value: '', tag: 'phone' }
    ],
    onLogout: async () => {

      const authAPI = new AuthAPI()

      try {
        authAPI.logout().then(r => {
          console.log(r + "asdasdasdasd")
          // clear store
        })
      } catch (e) {
        // TODO: remove tempo
        console.log(e)
        alert(e)
      }
    }
}

export default // @ts-expect-error
class ProfilePage extends Block<ProfilePageProps> {
  getStateFromProps (): void {
    this.state = state
  }
  // TODO: try/catch possibly not the best solution
  async onLoad(): Promise<User | null> {
	const api = new AuthAPI()
	try {
	  return await api.read()
	} catch (e: { reason: string } | any) {
		alert(e.reason)
		this.router.go('/')
	}
	return null
  }

  init() {
	super.init();

	// TODO: not so good, bad null checking too
	this.onLoad().then(r => {
	  if (r == null) return
	  Object.entries(r).map(el => {
		this.state.profileInfo.map((field: ProfileInfo) => {
		  if (field.tag == el[0]) {
			field.value = el[1]
		  }
		})

		// TODO: display name fix empty field
	  })
	}).then(() => {
	  this.setState( this.state.profileInfo)
	  console.log(this.state.profileInfo)
	})
  }


  render (): string {

	// noinspection HtmlUnknownTarget
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
                      <a class="profile-info-item-link" href="/edit">Изменить данные</a>
                    </li>
                    <li class="profile-info-item">
                      <a class="profile-info-item-link" href="/password">Изменить пароль</a>
                    </li>
                    <li class="profile-info-item profile-info-item_danger">
                      {{{Button text="Выйти" modifier="primary" onClick=onLogout}}}
                    </li>
                  </ul>
                </div>
              </section>
            </main>`
  }
}


/*
{
    "id": 312328,
    "first_name": "Toper",
    "second_name": "Toperovich",
    "display_name": null,
    "login": "toper",
    "avatar": null,
    "email": "random@randasd.xc",
    "phone": "7896541659"
}
 */