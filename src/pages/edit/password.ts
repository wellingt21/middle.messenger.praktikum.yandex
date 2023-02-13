import Block from '../../core/block/Block'
import '../../components/photo/photo'
import {IInput} from '../../components/input/types'
import validateString, {FormFieldTypes, validateIsSame} from '../../utils/validate'
import {EditProps} from './types'
import {User} from "../../core/api/types";
import {AuthAPI} from "../../core/api/auth";

export default // @ts-expect-error
class EditPasswordPage extends Block<ProfilePageProps> {
  // getStateFromProps (): void {
  //   this.state = state
  // }

    // TODO: duplication
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

                // TODO: display name fix empty field
            })
        }).then(() => {
            this.setState(this.state.editFields)
            console.log(this.state.editFields)
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
      editFields: [
        {
          placeholder: 'Пароль',
          id: 'password',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        },
        {
          placeholder: 'password again',
          id: 'password_repeat',
          type: 'password',
          value: '',
          isError: false,
          errorMessage: '',
          onFocus,
          onBlur
        }
      ],
      onEdit: () => {
        const inputValues = {
          password: (
            this.refs.password.querySelector('#password') as HTMLInputElement
          )?.value,
          password_repeat: (
            this.refs.password_repeat.querySelector(
              '#password_repeat'
            ) as HTMLInputElement
          )?.value
        }

        const validatedFields: Record<string, ValidateOutput> = {
          password: validateString(
            inputValues.password,
            FormFieldTypes.password
          ),
          password_repeat: validateIsSame(
            inputValues.password_repeat,
            inputValues.password,
            FormFieldTypes.password_repeat
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
