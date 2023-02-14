// base
import Block from '../../core/Block'
import template from './profile.hbs'

import * as styles from './profile.scss'

// components
import { BackButton } from '../../components/buttons/back/backButton'
import { ProfileForm } from '../../components/form/profileForm/profileForm'
import { ControlLink } from '../../components/buttons/link/ControlLink/ControlLink'
import { Avatar } from '../../components/avatar/avatar'

// controllers
import AuthController from '../../core/api/controllers/AuthController'
import UserController from '../../core/api/controllers/UserController'

import router from '../../core/Router'
import { validateForm } from '../../core/validation/validateForm'
import { getFormData } from '../../core/helpers/getFormData'

import { withStore } from '../../core/Store'

export class ProfilePageBase extends Block {
  protected init () {
    this.setState({
      isChangePassForm: false,
      isChangeForm: false
    })

    AuthController.fetchUser().then(() => console.log('user fetched'))

    this.children.profileAvatar = new Avatar({
      url: this.props.avatar
    })

    this.children.backButton = new BackButton({
      href: '/messenger'
    })

    this.children.changeInfoLink = new ControlLink({
      text: 'Изменить данные',
      events: {
        click: () => {
          this.setState({ isChangeForm: true })
        }
      }
    })

    this.children.changePasswordLink = new ControlLink({
      text: 'Изменить пароль',
      events: {
        click: () => {
          this.setState({ isChangeForm: true, isChangePassForm: true })
        }
      }
    })

    this.children.logOutLink = new ControlLink({
      text: 'Выйти',
      events: {
        click: () => {
          AuthController.logout().then(r => console.log(r))
          router.go('/')
        }
      }
    })

    this.children.settingsCloseLink = new ControlLink({
      text: 'Отмена',
      events: {
        click: () => this.setState({
          isChangeForm: false,
          isChangePassForm: false
        })
      }
    })
  }

  protected componentDidUpdate (oldProps: any, newProps: any): boolean {
    this.children.profileAvatar = new Avatar({
      url: this.props.avatar
    })

    this.children.profileForm = new ProfileForm({
      isChangeForm: this.props.isChangeForm,
      isChangePassForm: this.props.isChangePassForm,
      email: this.props.email,
      login: this.props.login,
      first_name: this.props.first_name,
      second_name: this.props.second_name,
      display_name: this.props.display_name,
      phone: this.props.phone,
      events: {
        submit: (event) => this.onSubmit(event)
      }
    })
    return super.componentDidUpdate(oldProps, newProps)
  }

  onSubmit (event: Event) {
    event.preventDefault()

    if (validateForm(event)) {
      const data = getFormData(event)

      if (this.props.isChangePassForm) {
        UserController.updateProfilePassword(data as UpdatePasswordData).then(r => console.log('\'update password\'' + r))
      } else {
        UserController.updateProfile(data as UpdateProfileData).then(r => console.log('update info ' + r))
      }

      this.setState({
        isChangeForm: false,
        isChangePassForm: false
      })
    }
  }

  protected render () {
    return this.compile(template, { ...this.props, styles })
  }
}

const withUser = withStore((state) => ({ ...state.user }))

// @ts-expect-error
export const ProfilePage = withUser(ProfilePageBase)
