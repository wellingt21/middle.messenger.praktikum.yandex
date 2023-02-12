// @ts-expect-error
import Handlebars from 'handlebars'
import {EventBus} from '../event/EventBus'

const enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_RENDER = 'flow:render',
  FLOW_UPDATE = 'flow:component-did-update'
}

export default abstract class Block<P extends BlockProps> {
  readonly eventBus: IEventBus
  id: string
  protected readonly _meta: BlockMeta<P>
  protected readonly props: P
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  protected state: any
  protected refs: Record<string, HTMLElement> = {}

  protected children: Record<string, Block<P>> = {}
  protected template = ''
  protected options: {} | null = {}

  protected constructor (props: any = {}) {
    this._meta = {
      props,
      tagName: 'div'
    }

    this.eventBus = new EventBus()
    this.getStateFromProps(props)

    this.props = this._makePropsProxy(props)
    this.state = this._makePropsProxy(this.state)
    this._element = null
    this.id = Math.random().toString()
    this._registerEvents()
    this.eventBus.emit(EVENTS.INIT)
  }

  private _element: HTMLElement | null

  get element (): any {
    return this._element
  }

  setState = (nextState: unknown): void => {
    if (!nextState) {
      return
    }

    Object.assign(this.state, nextState)
  }

  _registerEvents (): void {
    this.eventBus.on(EVENTS.INIT, this.init.bind(this))
    this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this))
    this.eventBus.on(
      EVENTS.FLOW_UPDATE,
      this._componentDidUpdate.bind(this)
    )
    this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  _componentDidMount () {

  }

  init (): void {
    const { eventBus: eventBus1, props, _meta } = this
    this._element = document.createElement(_meta.tagName)
    // @ts-expect-error TODO
    eventBus1.emit(EVENTS.FLOW_RENDER, props)
  }

  getContent (): HTMLElement | null {
    if (this.element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element.parentNode.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus.emit(EVENTS.FLOW_CDM)
        }
      }, 100)
    }

    return this.element
  }

  protected getStateFromProps (props?: P): void {
    if (props != null) {
      this.state = props
    }
  }

  protected _componentDidUpdate (): void {
    this._render()
  }

  protected render (): string {
    return ''
  }

  private _render (): void {
    const fragment = this._compile()
    this._removeEvents()
    const newElement = fragment.firstElementChild
    if (newElement instanceof HTMLElement) {
      this._element?.replaceWith(newElement)
    }
    this._element = newElement as HTMLElement
    this._addEvents()
  }

  private _compile (): DocumentFragment {
    const fragment = document.createElement('template')
    const template = Handlebars.compile(this.render())

    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs
    })
    Object.entries(this.children).forEach(([id, component]) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const stub = fragment.content.querySelector(`[data-id="${id}"]`)

      if (stub == null) {
        return
      }
      const content = component.getContent()
      if (content !== null) {
        stub.replaceWith(content)
      }
    })

    return fragment.content
  }

  private _addEvents (): void {
    const events: BlockEvents = this.props.events

    if (!events) {
      return
    }

    if (this.element !== null) {
      Object.entries(events).forEach(([event, listener]) => {
        if (this._element !== null) {
          this._element.addEventListener(event, listener)
        }
      })
    }
  }

  private _removeEvents (): void {
    const events = this.props.events

    if (events === null || this._element === null) {
      return
    }

    Object.entries((events != null) || {}).forEach(([event, listener]) => {
      this._element?.removeEventListener(event, listener)
    })
  }

  private _makePropsProxy (props: P): P {
    return new Proxy(props, {
      get (target: P, name: string) {
        const value = target[name as keyof P]
        return typeof value === 'function' ? value.bind(target) : value
      },

      set: (target: P, name: string, value: typeof target[keyof P]) => {
        target[name as keyof P] = value
        this.eventBus.emit(EVENTS.FLOW_UPDATE)
        return true
      },
      deleteProperty () {
        throw new Error('Отказано в доступе')
      }
    })
  }
}
