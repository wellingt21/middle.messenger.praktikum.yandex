
import  './ContextMenu.scss';
import ContextMenuItem, { ContextMenuItemProps } from './ContextMunuItem/ContextMenuItem';
import Block from "../../core/block/Block";

interface ContextMenuProps {
  items: ContextMenuItemProps[];
  positionX?: number;
  positionY?: number;
  active?: boolean;

  events?: {
    mouseleave?: (event: Event) => void;
  }
}

export default class ContextMenu extends Block<any> {
  constructor(props: ContextMenuProps) {
      super({
          ...props,
          // items: this.createMenuItems(this.props),
          events: {
              mouseleave: () => this.setState({
                  active: false,
              }),
          },
      });
  }

  init() {
    this.children.items = this.createMenuItems(this.props);
  }

  // todo: check carefully
  private createMenuItems(props: ContextMenuProps): any {
    return props.items.map((item) => new ContextMenuItem({
      img: item.img,
      text: item.text,
      events: item.events,
    }));
  }

  render(): string {
    return `
        <div class='context-menu' 
            style="left: {{positionX}}px; top: {{positionY}}px; {{#if active}} 
                display: flex {{else}} display: none {{/if}}">
            {{#each items}}
              {{{this}}}
            {{/each}}
        </div>
    `
  }
}
