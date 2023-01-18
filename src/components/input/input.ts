// import Block from '../../core/Block'
import './input.scss'
//
// export default class input extends Block<InputProps> {
//   static _name = 'input'
//
//   constructor ({ onFocus, onBlur, ...restProps }: IInput) {
//     super({
//       ...restProps,
//       events: { focusin: onFocus, focusout: onBlur }
//     } as InputProps)
//   }
//
//   render (): string {
//     return `<div class="p-input {{#if isError}}p-input_error{{/if}}">
//               <input
//                 class="p-input__input"
//                 type="{{type}}"
//                 id="{{id}}"
//                 value="{{value}}"
//                 placeholder=" "
//               />
//               <label class="p-input__label" for="{{id}}">
//                 {{placeholder}}
//               </label>
//               <span class="p-input__error-message">{{errorMessage}}</span>
//             </div>`
//   }
// }
import Block from '../../core/Block'

import { IInput, InputProps } from './types'

// @ts-expect-error
export default class Input extends Block<InputProps> {
  static _name = 'input'

  constructor ({ onFocus, onBlur, ...restProps }: IInput) {
    super({
      ...restProps,
      events: { focusin: onFocus, focusout: onBlur }
    } as unknown as InputProps)
  }

  render (): string {
    return `<div class="input {{#if isError}}input-error{{/if}}">
              <input
                class="input-input"
                type="{{type}}"
                id="{{id}}"
                value="{{value}}"
                placeholder=""
              />
              <label class="input-label" for="{{id}}">
                {{placeholder}}
              </label>
              <span class="input-error-message">{{error}}</span>
            </div>`
  }
}
