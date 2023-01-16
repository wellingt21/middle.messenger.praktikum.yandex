// @ts-expect-error
import fixingPage from './500.hbs'

const component: componentType<string, null> = {
  template: fixingPage,
  options: {}
}

export default component
