import Block from '../../core/Block'
import '../../components/photo/photo'
import { IInput } from '../../components/input/types'
import validateString, { FormFieldTypes } from '../../utils/validate'
import { EditProps } from './types'

// const state: EditPageProps = {
//   img: {
//     src: 'static/images/default_profile_image.png.png',
//     alt: 'Аватар пользователя'
//   },
//   name: 'ivanIvanov', // TODO:dynamically
//   profileInfo: [
//     { label: 'Почта', value: 'pochta@yandex.ru' },
//     { label: 'Логин', value: 'ivanIvanov' },
//     { label: 'Имя', value: 'ivan' },
//     { label: 'Фамилия', value: 'ivanov' },
//     { label: 'Имя в чате', value: 'ivan ivanov' },
//     { label: 'Телефон', value: '+79032678712' }
//   ]
// }

export default // @ts-expect-error
class EditPage extends Block<ProfilePageProps> {
  // getStateFromProps (): void {
  //   this.state = state
  // }

  getStateFromProps (): void {
    const onFocus = (event: Event): void => {
      const template = (event?.target as HTMLElement).parentNode as HTMLElement
      template.classList.remove('p-input-error')
    }
    const onBlur = (event: Event): void => {
      const id = (event.target as HTMLInputElement).id
      const inputElement = this.refs?.[id].querySelector(
        `#${id}`
      ) as HTMLInputElement
      const editFields = { ...this.state }.editFields
      const currentField = editFields.find(
        (field: any) => field.id === id
      ) as IInput

      const validateField = validateString(
        inputElement.value,
        // @ts-expect-error
        FormFieldTypes[id]
      )
      currentField.isError = !validateField.isValid
      currentField.errorMessage = validateField.message
      currentField.value = validateField.value
      this.setState({ editFields })
    }

    const state: EditProps = {
      editFields: [
        {
          placeholder: 'pochta',
          id: 'email',
          type: 'text',
          value: 'pochta@yandex.ru',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'login',
          id: 'login',
          type: 'text',
          value: 'ivanIvanov',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'name',
          id: 'first_name',
          type: 'text',
          value: 'ivan',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'surname',
          id: 'second_name',
          type: 'text',
          value: 'ivanov',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'display_name',
          id: 'display_name',
          type: 'text',
          value: 'ivanovIvan',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'Телефон',
          id: 'phone',
          type: 'number',
          value: '912873123',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        }
        // {
        //   placeholder: 'Пароль',
        //   id: 'password',
        //   type: 'password',
        //   value: '',
        //   isError: false,
        //   errorMessage: '',
        //   onFocus,
        //   onBlur
        // },
        // {
        //   placeholder: 'password again',
        //   id: 'password_repeat',
        //   type: 'password',
        //   value: '',
        //   isError: false,
        //   errorMessage: '',
        //   onFocus,
        //   onBlur
        // }
      ],
      onEdit: () => {
        const inputValues = {
          email: (this.refs.email.querySelector('#email') as HTMLInputElement)
            ?.value,
          login: (this.refs.login.querySelector('#login') as HTMLInputElement)
            ?.value,
          first_name: (
            this.refs.login.querySelector('#first_name') as HTMLInputElement
          )?.value,
          second_name: (
            this.refs.second_name.querySelector('#second_name') as HTMLInputElement
          )?.value
          // password: (
          //   this.refs.password.querySelector('#password') as HTMLInputElement
          // )?.value,
          // password_repeat: (
          //   this.refs.password_repeat.querySelector(
          //     '#password_repeat'
          //   ) as HTMLInputElement
          // )?.value
        }

        const validatedFields: Record<string, ValidateOutput> = {
          email: validateString(inputValues.email, FormFieldTypes.email),
          login: validateString(inputValues.login, FormFieldTypes.login),
          // password: validateString(
          //   inputValues.password,
          //   FormFieldTypes.password
          // ),
          first_name: validateString(
            inputValues.first_name,
            FormFieldTypes.first_name
          ),
          second_name: validateString(
            inputValues.second_name,
            FormFieldTypes.second_name
          )
          // password_repeat: validateIsSame(
          //   inputValues.password_repeat,
          //   inputValues.password,
          //   FormFieldTypes.password_repeat
          // )
        }
        const nextInputFields = state.editFields.map((field: any) => {
          if (field.id in validatedFields) {
            const validatedField = validatedFields?.[field.id]
            if (!validatedField.isValid) {
              field.isError = true
              field.errorMessage = validatedField.message
            } else {
              field.isError = false
              field.errorMessage = ''
            }
            field.value = validatedField.value
          }
          return field
        })
        this.setState({ signupFields: nextInputFields })
        console.log(inputValues)
      }

    }
    this.state = state
  }

  render (): string {
    return `
      <main class="profile-page">
        <nav class="profile-page-back">
            <a href="/" class="profile-page-link">
                <div class="profile-page-back-icon">
                    <div class="profile-page-back-arrow"></div>
                </div>
            </a>
        </nav>
        <section class="profile-info-wrapper">
          <div class="profile-info">
              <div class="profile-info-picture">
                  {{{Photo src=img}}}
              </div>
              <div class="profile-info-name">{{name}}</div>
              <form action="">
                <ul class="profile-info-info-list">
                  {{#each editFields}}
                      {{{ input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
                  {{/each}}
                </ul>
                {{{Button text="Сохранить" modificator="primary" onClick=onEdit}}}
              </form>
          </div>
        </section>
      </main>
`
  }
}
