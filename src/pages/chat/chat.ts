import Block from '../../core/Block'
import './chat.scss'

export default class ChatPage extends Block<Record<string, never>> {
  protected render (): string {
    return `
      <main class="chats-page flex">
      <aside class="left-panel">
        <div class="search">
          <label>
            <input class="search-input" type="text" />
          </label>
        </div>
          <div class="users-list-container">
            <ul class="users-list">
              <li class="user">
                <div class="user-img"></div>
                <div class="user-user-info">
                  <div class="user-name">test</div>
                  <p class="user-last-message">test text boilerplate...coming soon...</p>
                </div>
                <div class="user-message-info">
                  <p class="user-last-time">12:34</p>
                  <p class="user-not-read-messages">99</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <div class="chat-window w-full">
          <div class="search flex justify-around">
            <label for="message">
              <input class="message-input search-input" type="text" placeholder="Сообщение" id="message"/>
            </label>
            <div class="send-message-button ">
              <button>send message</button>
            </div>
          </div>
        </div>
      </main>
    `
  }
}
