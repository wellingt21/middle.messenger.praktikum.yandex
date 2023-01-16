// import Block from './Block';

export default function renderDOM (node: ChildNode): void {
  const root = document.querySelector('#app')

  if (root !== null) {
    root.innerHTML = ''
    root.appendChild(node)
  }
}
