
import './ContextButton.scss';
import Block from "../../../core/block/block2";

interface ContextButtonProps {
  img: any;
  class?: string;
  events?:{
    click?: (event?: Event) => void;
  }
}

export default class ContextButton extends Block {
  constructor(props?: ContextButtonProps) {
    super({
      ...props,
    });
  }

  init() {
    super.init();
  }

   render() {
    return `
        <button id="{{id}}" class="{{class}}"><img src="{{img}}" alt="context-menu-button"></button>
    `
  }
}
