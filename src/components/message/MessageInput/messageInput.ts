
import './messageInput.scss';
import Block from "../../../core/block/Block";

interface MessageInputProps {
  name: string,
  id: string,
  placeholder?: string,
  value?: string
  events?: {
    input: (event?: InputEvent & { target: HTMLTextAreaElement }) => void
  }
}

export class MessageInput extends Block<any> {
  constructor(props: MessageInputProps) {
    super(props);
  }

  render() {
    return `
        <div class="message-input">
          <textarea
            name={{name}}
            id={{id}}
            {{#if placeholder}}
            placeholder={{placeholder}}
            {{/if}}
            {{#if value}}
            value={{value}}
            {{/if}}
          ></textarea>
        </div>
    `
  }
}
