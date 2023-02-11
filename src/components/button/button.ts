import './button.scss'
import Block from '../../core/Block'

export default // @ts-expect-error
class Button extends Block<ButtonProps> {
  static _name = 'Button'

  constructor ({ onClick, ...restProps }: IButton) {
    super({ ...restProps, events: { click: onClick } })
  }

  render (): string {
    return `<div class="button {{#if modificator}}button_{{modificator}}{{/if}}">
              <button tabindex="{{tabIndex}}" class="button-button" type="button">{{text}}</button>
            </div>`
  }
}
