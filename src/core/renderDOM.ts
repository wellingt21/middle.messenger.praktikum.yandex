// import Block from './Block';

export default function renderDOM (block: any): void {
  const root = document.querySelector('#app')
  // console.log(block)
  if (root !== null) {
    root.innerHTML = ''
    root.appendChild(block.getContent())
  }
}
