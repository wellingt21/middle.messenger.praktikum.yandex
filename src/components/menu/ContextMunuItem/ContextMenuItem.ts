import './ContextMenuItem.scss';
import Block from "../../../core/block/block2";

export interface ContextMenuItemProps {
  img: any,
  text: string

  events?: {
    click?: (event: Event) => void;
  }
}

export default class ContextMenuItem extends Block<any> {
  constructor(props: ContextMenuItemProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class='context-menu__item'>
          <img class='menu-img' src="{{img}}" alt='menu-item'>
          <span class='menu-text'>{{text}}</span>
        </div>
    `
  }
}
