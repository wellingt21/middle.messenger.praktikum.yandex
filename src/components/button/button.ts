
// @ts-expect-error
import hbs from 'handlebars'


import Block from "../../core/Block";

interface ButtonProps {
  text: string,
  onClick: () => void
}

export default class Button extends Block<BlockProps > {
  static _name = 'button'

  constructor({onClick, ...rest}: ButtonProps) {
    super( {
      ...rest,
      events: {
        click: onClick
      }});

  }

  render() {
    return `
      <form action="{{ action }}">
          <button 
            class="button  {{#if modification}}button_{{modification}}{{/if}}" 
            type="{{type}}" 
            formaction="{{ action }}">
              {{ text }}
          </button>
      </form>
    `
  }
}
