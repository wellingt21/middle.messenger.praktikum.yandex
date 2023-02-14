import './Message.scss';
import Block from "../../core/block/Block";

interface MessageProps {
  content: string;
  isMine: boolean;
  time: string;
}

export class Message extends Block<any> {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return `
        <div {{#if isMine}} class="message__send" {{else}} class="message__received" {{/if}}>
          <p class="message__text">{{content}}<span class="message__time">{{time}}</span></p>
        </div>
    `
  }
}
