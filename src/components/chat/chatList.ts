import {ChatListProps} from "./types";
import Block from "../../core/block/block2";


export default class ChatListBase extends Block<any> {
  constructor(props?: ChatListProps) {
    super(props);
  }

   render() {
    return `
            <ul class="chat-list">
            {{#each chats }}
            <li class="chat-list__item">
              <div class='selector' data-id="{{this.id}}" data-title="{{this.title}}" data-avatar="{{this.avatar}}"></div>
              <div class="image">
                {{#if this.avatar}}
                  <img class="image"
                        src="https://ya-praktikum.tech/api/v2/resources{{this.avatar}}"
                        alt="avatar"
                        width="47" 
                        height="47">
                {{/if}}
              </div>
              <div class="info">
                <div class="info__row">
                  <p class="title">{{this.title}}</p>
                </div>
                <div class="subtitle">
                  <p class="last-message">{{this.last_message.content}}</p>
                    <div
                      class="badge"
                      {{#unless this.unread_count}}
                        style='display: none'
                      {{/unless}}
                    >{{this.unread_count}}</div>
                </div>
              </div>
            </li>
          {{/each }}
        </ul>
    `
  }
}

// const withChats = withStore((state: any) => ({ ...state.chats })); // todo: with store

// export const ChatList = withChats(ChatListBase); // todo: idk
