// import { IInput } from '../../components/input/types'
//
// import Block from '../../core/Block'
//
// /* eslint-disable no-useless-escape */
// export enum FormFieldTypes {
//   login,
//   password,
//   first_name,
//   last_name,
//   email,
//   password_repeat,
// }
//
// type SignupFields = any
//
// interface SignupProps {
//   fields: SignupFields
//   onSignup: () => void
// }
//
// type SignupFieldsId =
//   | 'login'
//   | 'email'
//   | 'password'
//   | 'password_repeat'
//   | 'first_name'
//   | 'last_name'
//
// const email =
//   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
//
// const VALIDATORS_REG_EXP: Record<string, RegExp> = {
//   email,
//   first_name: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
//   last_name: /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/,
//   login: /^(?=[a-zA-Z\-_\d]+[a-zA-Z\-_]+|[a-zA-Z\-_]+[a-zA-Z\-_\d]+)[a-zA-Z\-_\d]{3,20}$/,
//   password: /^(?=.*\d)(?=.*[A-Z]).{8,40}$/
// }
// const ERROR_MESSAGES: Record<string, string> = {
//   login: 'Неверный формат логина',
//   password: 'Неверный формат пароля',
//   first_name: 'Неверный формат Имени',
//   last_name: 'Неверный формат Фамилии',
//   email: 'Неверный формат email',
//   phone: 'Неверный формат телефона',
//   password_repeat: 'Пароли не совпадают'
// }
//
// interface ValidateOutput {
//   isValid: boolean
//   value: string
//   message: string
// }
//
// const validateString = (
//   value: string,
//   type: FormFieldTypes
// ): ValidateOutput => {
//   const result: ValidateOutput = {
//     isValid: true,
//     value,
//     message: ''
//   }
//   if (value === '') {
//     value = ''
//   }
//   const TYPE_KEY = FormFieldTypes[type]
//   if (TYPE_KEY !== '') {
//     if (!VALIDATORS_REG_EXP[TYPE_KEY].test(value)) {
//       result.isValid = false
//       result.message = ERROR_MESSAGES[TYPE_KEY]
//     }
//   }
//   return result
// }
// export const validateIsSame = (
//   validatedValue: string,
//   comparableValue: string,
//   type: FormFieldTypes
// ): ValidateOutput => {
//   const result: ValidateOutput = {
//     isValid: true,
//     value: validatedValue,
//     message: ''
//   }
//   const TYPE_KEY = FormFieldTypes[type]
//   if (validatedValue !== comparableValue || validatedValue.length === 0) {
//     result.isValid = false
//     result.message = ERROR_MESSAGES[TYPE_KEY]
//   }
//   return result
// }
//
// export default class SignUpOld extends Block<SignupProps> {
//   getStateFromProps (): void {
//     const onFocus = (event: Event): void => {
//       console.log('inside focus')
//       const template = (event?.target as HTMLElement).parentNode as HTMLElement
//       template.classList.remove('input_error')
//     }
//     const onBlur = (event: Event): void => {
//       console.log('inside blur')
//       console.log(event.target)
//       const id = (event?.target as HTMLInputElement).id as SignupFieldsId
//       const inputElement = this.refs?.[id].querySelector(
//         `#${id}`
//       ) as HTMLInputElement
//       const signupFields = { ...this.state }.signupFields
//       const currentField = signupFields.find(
//         (field: any) => field.id === id
//       ) as IInput
//       let validateField
//       if (id === 'password_repeat') {
//         const passwordInputValue = (
//           this.refs.password.querySelector('#password') as HTMLInputElement
//         ).value
//         validateField = validateIsSame(
//           inputElement.value,
//           passwordInputValue,
//           FormFieldTypes.password_repeat
//         )
//       } else {
//         validateField = validateString(inputElement.value, FormFieldTypes[id])
//       }
//       currentField.isError = !validateField.isValid
//       currentField.error = validateField.message
//       currentField.value = validateField.value
//       this.setState({ signupFields })
//     }
//     const state: SignupProps = {
//       fields: [
//         {
//           placeholder: 'Почта',
//           id: 'email',
//           type: 'text',
//           value: '',
//           isError: true,
//           error: '',
//           onFocus,
//           onBlur
//         },
//         {
//           placeholder: 'Логин',
//           id: 'login',
//           type: 'text',
//           value: '',
//           isError: false,
//           error: '',
//           onFocus,
//           onBlur
//         },
//         {
//           placeholder: 'Имя',
//           id: 'first_name',
//           type: 'text',
//           value: '',
//           isError: true,
//           error: '',
//           onFocus,
//           onBlur
//         },
//         {
//           placeholder: 'Фамилия',
//           id: 'last_name',
//           type: 'text',
//           value: '',
//           isError: false,
//           error: '',
//           onFocus,
//           onBlur
//         },
//         {
//           placeholder: 'Телефон',
//           id: 'phone',
//           type: 'number',
//           error: 'something',
//           isError: true,
//           onBlur,
//           onFocus
//         },
//         {
//           placeholder: 'Пароль',
//           id: 'password',
//           type: 'password',
//           value: '',
//           isError: false,
//           error: '',
//           onFocus,
//           onBlur
//         },
//         {
//           placeholder: 'повторите пароль',
//           id: 'password_repeat',
//           type: 'password',
//           value: '',
//           isError: false,
//           error: '',
//           onFocus,
//           onBlur
//         }
//       ],
//       onSignup: () => {
//         const inputValues = {
//           email: (this.refs.email.querySelector('#email') as HTMLInputElement)
//             ?.value,
//           login: (this.refs.login.querySelector('#login') as HTMLInputElement)
//             ?.value,
//           first_name: (
//             this.refs.login.querySelector('#first_name') as HTMLInputElement
//           )?.value,
//           last_name: (
//             this.refs.lastName.querySelector('#last_name') as HTMLInputElement
//           )?.value,
//           password: (
//             this.refs.password.querySelector('#password') as HTMLInputElement
//           )?.value,
//           password_repeat: (
//             this.refs.repeatPassword.querySelector(
//               '#password_repeat'
//             ) as HTMLInputElement
//           )?.value
//         }
//
//         const validatedFields: Record<string, ValidateOutput> = {
//           email: validateString(inputValues.email, FormFieldTypes.email),
//           login: validateString(inputValues.login, FormFieldTypes.login),
//           password: validateString(
//             inputValues.password,
//             FormFieldTypes.password
//           ),
//           firstName: validateString(
//             inputValues.first_name,
//             FormFieldTypes.first_name
//           ),
//           lastName: validateString(
//             inputValues.last_name,
//             FormFieldTypes.last_name
//           ),
//           repeatPassword: validateIsSame(
//             inputValues.password_repeat,
//             inputValues.password,
//             FormFieldTypes.password_repeat
//           )
//         }
//         const nextInputFields = state.fields.map((field: any) => {
//           if (field.id in validatedFields) {
//             const validatedField = validatedFields?.[field.id]
//             if (!validatedField.isValid) {
//               field.isError = true
//               field.errorMessage = validatedField.message
//             } else {
//               field.isError = false
//               field.errorMessage = ''
//             }
//             field.value = validatedField.value
//           }
//           return field
//         })
//         this.setState({ signupFields: nextInputFields })
//       }
//     }
//
//     this.state = state
//   }
//
//   // constructor () {
//   //   super({
//   //     template: SignUpTmpl,
//   //     // options: {
//   //     //   fields: [
//   //     //     {
//   //     //       placeholder: 'pochta fuck you',
//   //     //       id: 'email',
//   //     //       type: 'email',
//   //     //       error: 'something'
//   //     //     },
//   //     //     {
//   //     //       placeholder: 'Логин',
//   //     //       id: 'login',
//   //     //       type: 'text',
//   //     //       error: 'something'
//   //     //     },
//   //     //     {
//   //     //       placeholder: 'Имя',
//   //     //       id: 'first_name',
//   //     //       type: 'text',
//   //     //       error: 'something'
//   //     //     },
//   //     //     {
//   //     //       placeholder: 'Фамилия',
//   //     //       id: 'second_name',
//   //     //       type: 'text',
//   //     //       error: 'something'
//   //     //     },
//   //     //     {
//   //     //       placeholder: 'Телефон',
//   //     //       id: 'phone',
//   //     //       type: 'text',
//   //     //       error: 'something'
//   //     //     },
//   //     //     {
//   //     //       placeholder: 'Пароль',
//   //     //       id: 'password',
//   //     //       type: 'password',
//   //     //       error: 'something'
//   //     //     },
//   //     //     {
//   //     //       placeholder: 'Пароль (ещё раз)',
//   //     //       id: 'password_repeat',
//   //     //       type: 'password',
//   //     //       error: 'something'
//   //     //     }
//   //     //   ]
//   //     // },
//   //
//   //   })
//   // }
//
//   getContent (): HTMLElement | null {
//     return super.getContent()
//   }
//
//   protected render (): string {
//     return `
//       <main class="flex justify-around m-3">
//           <section class="w-340">
//               <form class="signup-form">
//                   <h1 class="signup-form-title">Регистрация</h1>
//                   {{#each fields}}
//                       {{> input placeholder=placeholder id=id type=type error=error isError=isError value=value ref=id onFocus=onFocus onBlur=onBlur}}
//                   {{/each}}
//                     {{> button text="Рега" modificator="primary" onClick=onSignup}}
//                   <a class="signup-form-registration-link flex justify-center mt-2" href="/login">выйssти</a>
//               </form>
//           </section>
//       </main>
//     `
//   }
// }
