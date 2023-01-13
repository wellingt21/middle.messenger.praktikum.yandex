import Block from '../../modules/TotalBlock/Block'
import './input.css'
import { IInput, InputProps } from './types'

// @ts-expect-error
export default class Input extends Block<InputProps> {
  static _name = 'Input'

  constructor ({ focus, blur, ...restProps }: IInput) {
    super({
      ...restProps,
      events: { focusin: focus, focusout: blur }
    } as unknown as InputProps)
  }

  render (): string {
    return `<div class="p-input {{#if isError}}p-input_error{{/if}}">
              <input
                class="p-input__input"
                type="{{type}}"
                id="{{id}}"
                value="{{value}}"
                placeholder=" "
              />
              <label class="p-input__label" for="{{id}}">
                {{placeholder}}
              </label>
              <span class="p-input__error-message">{{errorMessage}}</span>
            </div>`
  }
}