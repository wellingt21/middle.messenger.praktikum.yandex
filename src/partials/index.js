import handlebars from "handlebars";

import button from './button/button.hbs'
import input from './input/input.hbs'

export default (() => {
    handlebars.registerPartial('input', input)
    handlebars.registerPartial('button', button)
})
