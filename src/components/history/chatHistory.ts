
import './chatHistory.scss';
import store from '../../core/store/Store';

import Block from "../../core/block/block2";
import {Message} from "../message/Message";

interface MessageInfo {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: unknown | null;
}

interface ChatHistoryProps {
  messages: MessageInfo[];
  userId?: number;
  id?: number;
}

export default class ChatHistoryBase extends Block<any> {
  init() {
    this.children.items = this.createMessages(this.props);
  }

  protected componentDidUpdate(
    _oldProps: ChatHistoryProps,
    newProps: ChatHistoryProps,
  ): boolean {
    this.children.items = this.createMessages(newProps);
    return true;
  }

  render() {
    return `
        <div class="history">
            {{#each items}}
              {{{this}}}
            {{/each }}
        </div>
    `
  }

  private createMessages(props: ChatHistoryProps): any {

    console.log(store.getState())

    let userId = 0
        try {
        userId =  store.getState().user.id;
      } catch (e) {
        console.log(e)
      }
    return props.messages?.map((msg) => {
      if (msg.type === 'message') {
        const isMine = msg.user_id === userId;
        const timeStamp = new Date(msg.time);
        const time = timeStamp.toLocaleString();
        return new Message({
          isMine,
          content: msg.content,
          time,
        });
      }
      return new Message(({
        isMine: false,
        content: `user ${msg.content} connected`,
        time: `${new Date().toLocaleString()}`,
      }));
    });
  }
}

// const withSelectedChatMessages = withStore((state) => {
//   const selectedChatId = state.chats?.current?.id;
//   if (selectedChatId) {
//     return {
//       messages: (state.messages || {})[selectedChatId] || [],
//     };
//   }
//   return {
//     messages: [],
//   };
// });

// export const ChatHistory = withSelectedChatMessages(ChatHistoryBase);
