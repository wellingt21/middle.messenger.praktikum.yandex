// @ts-expect-error
import pageNotFound from './404.hbs'
import { componentType } from '../../types'

const component: componentType<'404.hbs', null> = {
  template: pageNotFound,
  options: {}
}

export default component
