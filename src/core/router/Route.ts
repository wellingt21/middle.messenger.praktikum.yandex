import Block from '../Block';
import {BlockType} from './router';

export default class Route {
  private block: Nullable<Block<any>> = null;

  constructor(
    private readonly pathname: string,
    private readonly BlockClass: BlockType,
    private readonly query: string) {
  }

  leave(): void {
    this.block = null;
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  render(props = {}): void {
    if (!this.block) {
      // @ts-ignore
      this.block = new this.BlockClass(props);

      if (this.block != null) {
        render(this.query, this.block);
        this.block._componentDidMount();
      }
    }
  }
}

function render(query: string, block: Block<any>): Element | null {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}
