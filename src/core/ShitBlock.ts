interface IEvents {
  INIT: 'init'
  FLOW_CDM: 'flow:component-did-mount'
  FLOW_RENDER: 'flow:render'
  FLOW_UPDATE: 'flow:component-did-update'
}

export default abstract class ShitBlock {
  protected static events: IEvents
  protected element = ''
  protected template = ''
  protected options: {} | null = {}

  protected constructor (
    tagName: string = 'div',
    props: any // TODO: type this shit
  ) {

    this.element = tagName
    this.options = props.options
    this.template = props.template
  }

  // getContent (): HTMLElement | null {
  //   if (this.element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
  //     setTimeout(() => {
  //       if (
  //         this.element.parentNode.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
  //       ) {
  //         this.eventBus.emit(Block.EVENTS.FLOW_CDM)
  //       }
  //     }, 100)
  //   }
  //
  //   return this.element
  // }

  getContent() {
    console.log('inside fucking block')
  }
}
