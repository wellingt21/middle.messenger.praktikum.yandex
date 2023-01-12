import signupFieldType from './pages/signup/types'
import profileInfoFieldType from './pages/profile/types'
import editFieldType from './pages/edit/types'
import loginFieldType from './pages/login/types'

export interface componentType<T, C> {
  template: (options: any) => T
  options: {
    fields?: C[]
    name?: string
    img?: string
  }
}

export type pagesArray = Record<string, componentType<string, fieldTypes>>

export type fieldTypes = signupFieldType | loginFieldType | profileInfoFieldType | editFieldType | null | {}
