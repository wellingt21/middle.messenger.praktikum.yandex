import { validationValue } from '../../utils/validation'

function blurOrSubmitValidate (name: string, value: string): string {
  const { regExp, errMessage } = validationValue[name]
  if (regExp != null) {
    if (regExp.test(value)) {
      return ''
    }
    return errMessage
  }
  return ''
}

function focusValidate (name: string): string {
  const { message } = validationValue[name]
  return message
}

export function validateInput (event: Event, inputName?: string, inputValue?: string): boolean {
  let name: string
  let value: string

  if (inputName !== undefined && inputValue !== undefined) {
    name = inputName
    value = inputValue
  } else {
    name = (event.target as HTMLInputElement).name
    value = (event.target as HTMLInputElement).value
  }

  const errorMessage = document.querySelector(`#validate_${name}`)
  const tipMessage = document.querySelector(`#tip_${name}`)

  let result = ''

  if (!(validationValue as object).hasOwnProperty(name)) {
    return false
  }

  switch (event.type) {
    case 'focus':
        // @ts-ignore
        errorMessage.style.display = 'none'
        // @ts-ignore
        tipMessage.style.display = 'block'

      if (name === 'repeatPassword') {
        // @ts-ignore
          tipMessage.textContent = validationValue[name].message
        return true
      }

      result = focusValidate(name)
        // @ts-ignore
        tipMessage.textContent = result
      return true
    default:
        // @ts-ignore
        errorMessage.style.display = 'block'
        // @ts-ignore
        tipMessage.style.display = 'none'

      if (name === 'repeatPassword') {
        const passwordInput = document.querySelector('#password')
        if (passwordInput == null) {
          const newPassword = document.querySelector('#newPassword')
          // @ts-ignore
            if (value !== newPassword.value) {
            result = validationValue[name].errMessage
          }
        } else { // @ts-ignore
            if (value !== passwordInput.value) {
                      result = validationValue[name].errMessage
                    }
        }
        if (errorMessage) errorMessage.textContent = result
        return !(result)
      }

      result = blurOrSubmitValidate(name, value)
        if (errorMessage) errorMessage.innerHTML = result
      return !(result)
  }
}
