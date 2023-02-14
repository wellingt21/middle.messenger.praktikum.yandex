import Block from './Block'

export function renderDOM (rootSelector: string, component: Block) {
  const root = document.querySelector(rootSelector)

  if (root == null) {
    throw new Error('Root not found')
  }
  root.innerHTML = ''

  root.append(component.getContent()!)
}
