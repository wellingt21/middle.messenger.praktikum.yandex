// import Block from './Block';

export default function renderDOM (block: any): void {
  const root = document.querySelector('#app')

  if (root !== null) {
    root.innerHTML = ''
    root.appendChild(block.getContent())
  }
}
