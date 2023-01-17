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
    console.log('input rendered')
    return `<div class="input {{#if isError}}input_error{{/if}}">
              <input
                class="input_input"
                type="{{type}}"
                id="{{id}}"
                value="{{value}}"
                placeholder="фывфыв "
              />
              <label class="input_label" for="{{id}}">
                {{placeholder}}
              </label>
              <span class="blablabla">{{error}}</span>
            </div>`
  }
}
