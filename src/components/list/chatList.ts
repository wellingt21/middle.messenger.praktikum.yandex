// base
import Block from '../../core/Block';
import template from './chatList.hbs';

// styles
import * as styles from './chatList.scss';

import { withStore } from '../../core/Store';

interface LastMessage {
  user: UserInfo;
  time: string;
  content: string;
}

export interface ChatListProp {
  id?: number;
  title?: string;
  avatar?: string | null;
  unread_count?: number;
  last_message?: LastMessage | null;
}

export interface ChatListProps {
  chats?: ChatListProp[];
  events?: {
    click: (event: Event) => void;
  }
}

export class ChatListBase extends Block {
  constructor(props?: ChatListProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ ...state.chats }));

export const ChatList = withChats(ChatListBase);