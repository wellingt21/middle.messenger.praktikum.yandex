declare global {
  export type Nullable<T> = T | null
  export type Keys<T extends Record<string, unknown>> = keyof T
  export type Values<T extends Record<string, unknown>> = T[Keys<T>]

  interface componentType<T, C> {
    template: (options: any) => T
    options: {
      fields?: C[]
      name?: string
      img?: string
    }
  }
}

export {}
