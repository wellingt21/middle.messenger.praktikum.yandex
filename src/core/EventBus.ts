export class EventBus implements IEventBus {
  protected listeners: Record<string, EventBusListener[]>

  constructor () {
    this.listeners = {}
  }

  on (event: string, listener: EventBusListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(listener)
  }

  off (event: string, listener: EventBusListener): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет такого события "${event}"`)
    }
    this.listeners[event] = this.listeners[event].filter(
      (EventListener) => EventListener !== listener
    )
  }

  emit (event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет такого события "${event}"`)
    }
    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}

type EventBusListener = (...args: unknown[]) => unknown

interface IEventBus {
  on: (event: string, listener: EventBusListener) => any
  off: (event: string, listener: EventBusListener) => any
  emit: (event: string, ...args: unknown[]) => any
}
