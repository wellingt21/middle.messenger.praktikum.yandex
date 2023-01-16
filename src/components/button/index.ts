import Block from '../../modules/TestBlock'

// @ts-expect-error
import hbs from 'handlebars'

// @ts-expect-error
import button from '../button.hbs'

export default class Button extends Block {
  // render (): HandlebarsTemplateDelegate<string> {
  //   return Handlebars.compile(template)
  // }

  // #render (): void {
  //   hbs.registerPartial('button', button)
  //   return button
  // }
}
