// @ts-expect-error
import fixingPage from './500.hbs'

import componentType from '../../types'

const component: componentType<string, null> = {
  template: fixingPage,
  options: {}
}

export default component
