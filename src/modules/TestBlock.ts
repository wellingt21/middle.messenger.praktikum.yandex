// @ts-expect-error
import hbs from 'handlebars'

import input from '../components/input.hbs'
import button from '../components/button.hbs'
import photo from '../components/photo.hbs'

hbs.registerPartial('button', button)
hbs.registerPartial('input', input)
hbs.registerPartial('photo', photo)

interface IEvents {
  INIT: 'init'
  FLOW_CDM: 'flow:component-did-mount'
  FLOW_RENDER: 'flow:render'
  FLOW_UPDATE: 'flow:component-did-update'
}

hbs.registerPartial('input', input)

export default abstract class TestBlock {
  protected static events: IEvents
  protected element = ''
  protected meta: {
    tagName?: string | undefined
    props: {
      path: ''
      template: any // TODO: type me
      options?: {} // TODO: type this shit
    }
  } | null = null

  protected constructor (
    tagName: string = 'div',
    props: any // TODO: type this shit
  ) {
    this.meta = {
      tagName, props
    }

    this.element = 'div'
  }

  getContent (): Nullable<ChildNode> {
    const template = document.createElement('template')
    console.log('check2')
    const compiled = hbs.compile(this.meta?.props.template)(this.meta?.props.options)

    if (this.meta !== null) {
      template.innerHTML =
        this.meta.props.options !== null
          ? compiled
          : this.meta.props.template.trim()
    }

    return template.content.firstChild
  }

  // render (): string {
  //   return hbs.compile(this.meta?.props?.template)()
  // }

  // private compile() {
  //   return
  // }
}
