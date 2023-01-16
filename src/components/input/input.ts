import Block from '../../core/Block'

import { IInput, InputProps } from './types'

// @ts-expect-error
export default class Input extends Block<InputProps> {
  static _name = 'input'

  constructor ({ focus, blur, ...restProps }: IInput) {
    super({
      ...restProps,
      events: { focusin: focus, focusout: blur }
    } as unknown as InputProps)
  }

  render (): string {
    return `<div class="input {{#if isError}}p-input_error{{/if}}">
              <input
                class="input__input"
                type="{{type}}"
                id="{{id}}"
                value="{{value}}"
                placeholder=" "
              />
              <label class="input_label" for="{{id}}">
                {{placeholder}}
              </label>
              <span class="blablabla">{{error}}</span>
            </div>`
  }
}
