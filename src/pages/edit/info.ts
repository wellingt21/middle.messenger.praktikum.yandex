import Block from '../../core/block/Block'
import '../../components/photo/photo'
import {IInput} from '../../components/input/types'
import validateString, {FormFieldTypes} from '../../utils/validate'
import {EditProps} from './types'
import {UpdateProfileData, User} from "../../core/api/types";
import {AuthAPI} from "../../core/api/auth";
import {UserAPI} from "../../core/api/user";

// @ts-ignore
import defaultAvatar from '../../../static/images/default_profile_image.png'

export default // @ts-expect-error
class EditInfoPage extends Block<ProfilePageProps> {
    onClick = () => console.log('shit is clicked')

    // TODO: handle formData
    async createUpdateRequest(formData: UpdateProfileData): Promise<void> {

        if (typeof formData === 'object') {
            const updateRequest = new UserAPI();

            // this.router.go("/messenger")

            try {
                await updateRequest.updateProfile(formData)
                    .then(r => {
                        if (r.status == 200) {
                            // TODO: make store here
                            // this.router.go("/messenger")

                            console.log("status comes to 200: " + r)
                        }

                    })

            } catch (e: any) {
                const editFields = { ...this.state }.editFields

                editFields.map((field: IInput) => {
                    field.errorMessage = e.reason
                    field.isError = true
                })

                this.setState({ editFields })
            }

            // TODO: chech why and test this logic
            // this.router.go("/profile")
        }
    }

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

    // TODO: duplication
    init() {
        super.init();

        // TODO: not so good, bad null checking too
        this.onLoad().then(r => {
            if (r == null) return
            Object.entries(r).map(el => {
                this.state.editFields.map((field: any) => {
                    if (field.id == el[0]) {
                        field.value = el[1]
                    }
                })
            })
        }).then(() => {
            this.setState(this.state.editFields)
        })
    }

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
        avatar: {
            src: defaultAvatar,
            onClick: () => console.log('strange click')
        },
        editFields: [
            {
              placeholder: 'mail',
              id: 'email',
              type: 'text',
              value: '',
              isError: false,
              errorMessage: '',
              onFocus,
              onBlur
            },
            {
              placeholder: 'login',
              id: 'login',
              type: 'text',
              value: '',
              isError: false,
              errorMessage: '',
              onFocus,
              onBlur
            },
            {
              placeholder: 'name',
              id: 'first_name',
              type: 'text',
              value: '',
              isError: false,
              errorMessage: '',
              onFocus,
              onBlur
            },
            {
              placeholder: 'surname',
              id: 'second_name',
              type: 'text',
              value: '',
              isError: false,
              errorMessage: '',
              onFocus,
              onBlur
            },
            {
              placeholder: 'display_name',
              id: 'display_name',
              type: 'text',
              value: '',
              isError: false,
              errorMessage: '',
              onFocus,
              onBlur
            },
            {
              placeholder: 'Телефон',
              id: 'phone',
              type: 'number',
              value: '',
              isError: false,
              errorMessage: '',
              onFocus,
              onBlur
            }
        ],
        onEdit: () => {
            const inputValues = {
                email: (this.refs.email.querySelector('#email') as HTMLInputElement)
                ?.value,
                login: (this.refs.login.querySelector('#login') as HTMLInputElement)
                ?.value,
                first_name: (
                this.refs.first_name.querySelector('#first_name') as HTMLInputElement
                )?.value,
                second_name: (
                this.refs.second_name.querySelector('#second_name') as HTMLInputElement
                )?.value,
                phone: (
                  this.refs.phone.querySelector('#phone') as HTMLInputElement
                )?.value,
                display_name: (
                    this.refs.display_name.querySelector('#display_name') as HTMLInputElement
                )?.value
        }

        const validatedFields: Record<string, ValidateOutput> = {
          email: validateString(inputValues.email, FormFieldTypes.email),
          login: validateString(inputValues.login, FormFieldTypes.login),
          display_name: validateString(inputValues.display_name, FormFieldTypes.login),
          first_name: validateString(
            inputValues.first_name,
            FormFieldTypes.first_name
          ),
          second_name: validateString(
            inputValues.second_name,
            FormFieldTypes.second_name
          ),
          phone: validateString(
              inputValues.phone,
              FormFieldTypes.phone
          )
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


        // TODO: decompose this logic duplication on every page issue
          this.setState({ editFields: nextInputFields })
          this.createUpdateRequest(inputValues).then(r => {
              // TODO: implement store logic
              console.log(r)
              this.router.go("/messenger")
          })
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
                {{{Avatar}}}
              </div>
              <div class="profile-info-name">{{name}}</div>
              <form action="">
                <ul class="profile-info-info-list">
                  {{#each editFields}}
                      {{{ input placeholder=placeholder id=id type=type errorMessage=errorMessage isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}}
                  {{/each}}
                </ul>
                {{{Button text="Сохранить" modifier="primary" onClick=onEdit}}}
              </form>
          </div>
        </section>
      </main>
       `
  }
}
