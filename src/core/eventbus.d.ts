type EventBusListener = (...args: unknown[]) => unknown

interface IEventBus {
  on: (event: string, listener: EventBusListener) => any
  off: (event: string, listener: EventBusListener) => any
  emit: (event: string,
    ...args: Array<unknown[] | null | undefined>) => any
}
