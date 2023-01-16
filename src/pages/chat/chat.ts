// @ts-expect-error
import chat from './chat.hbs'

const component: componentType<string, {}> = {
  template: chat,
  options: {
    fields: [
      {},
      {}
    ]
  }
}

export default component
