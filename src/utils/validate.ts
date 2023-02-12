/* eslint-disable no-useless-escape */
export enum FormFieldTypes {
  login,
  password,
  first_name,
  second_name,
  email,
  password_repeat,
  phone = 6
}

const VALIDATORS_REG_EXP: Record<string, RegExp> = {
  login: /^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/,
  password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
  first_name: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
  second_name: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
  email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
  password_repeat: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
  phone: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
}
const VALIDATORS_MESSAGES: Record<string, string> = {
  login: 'Неверный формат логина',
  password: 'Неверный формат пароля (хардкор)',
  first_name: 'Неверный формат Имени',
  last_name: 'Неверный формат Фамилии',
  email: 'Неверный формат email',
  password_repeat: 'Пароли не совпадают',
  phone: 'Неверный формат телефона. 8 цифр'
}

const validateString = (
  value: string,
  type: FormFieldTypes
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value,
    message: ''
  }
  if (!value) {
    value = ''
  }
  const TYPE_KEY = FormFieldTypes[type]
  if (TYPE_KEY) {
    if (!VALIDATORS_REG_EXP[TYPE_KEY].test(value)) {
      result.isValid = false
      result.message = VALIDATORS_MESSAGES[TYPE_KEY]
    }
  }
  return result
}
export const validateIsSame = (
  validatedValue: string,
  comparableValue: string,
  type: FormFieldTypes
): ValidateOutput => {
  const result: ValidateOutput = {
    isValid: true,
    value: validatedValue,
    message: ''
  }
  const TYPE_KEY = FormFieldTypes[type]
  if (validatedValue !== comparableValue || validatedValue.length === 0) {
    result.isValid = false
    result.message = VALIDATORS_MESSAGES[TYPE_KEY]
  }
  return result
}
export default validateString
