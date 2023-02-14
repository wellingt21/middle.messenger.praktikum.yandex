import Block from '../../core/block/Block'
import './chat.scss'
import {ChatController} from "../../core/controllers/ChatController";
import {AuthController} from "../../core/controllers/AuthController";
import userController from "../../core/controllers/UserController";

export default class ChatPage extends Block<any> {
    async createChatHandler(event: Event) {
        const element = event.target as HTMLElement;
        const {title, id} = element.dataset;

        // console.log(title, id);
        // console.log(this.props);

        await ChatController.createChat({title: `чат ${title} / ${this.props.user.login}`}).then((chat: any) => {
            this.updateChatListHandler();
            ChatController.addUserToChat({chatId: chat.id, users: [Number(id)]}).then((r: any) => console.log(r));
        });
    }

    openChatHandler(event: Event) {
        const element = event.target as HTMLElement;
        const { title, id, avatar } = element.dataset;

        ChatController.selectChat({
            title: title as string,
            avatar: avatar as string,
            id: Number(id),
        }).then(() => {
            // TODO: possible narrow moment
            (this.children.chatHistory as Block<any>).setState({
                userId: this.props.user.id,
                id: Number(id),
            });
            this.router.go(`/messenger#${id}`);
        });
    }

    searchUserHandler(event: InputEvent) {
        const searchQuery = (event.target as HTMLInputElement).value;
        if (searchQuery) {
            userController.searchUser({ login: searchQuery }).then((data) => {
                if (data) {
                    const result: any[] = [];

                    data?.map((user) => {
                        result.push({
                            id: user.id,
                            title: user.login,
                            avatar: user.avatar,
                        });
                    });

                    (this.children.chatList as Block<any>).setState({
                        chats: [...result],
                        events: {
                            click: (event: Event) => this.createChatHandler(event),
                        },
                    });
                }
            });
        } else {
            this.updateChatListHandler();
        }
    }

    // protected init() {
    //     this.children.changeAvatarModal = new changeAvatarModal({
    //         changeModalActive: false,
    //         type: 'chat',
    //     });
    //
    //     this.children.createChat = new ControlLink({
    //         text: 'Новый чат',
    //         class: 'profile__link',
    //         events: {
    //             click: () => {
    //                 const title = prompt('Введите название чата');
    //
    //                 ChatController.createChat({ title: title as string }).then(() => {
    //                     this.updateChatListHandler();
    //                 });
    //             },
    //         },
    //     });
    //
    //     this.children.profileLink = new Link({
    //         text: 'Профиль >',
    //         class: 'profile__link',
    //         href: Routes.Profile,
    //     });
    //
    //     // search input
    //     this.children.input = new LabeledInput({
    //         type: 'text',
    //         name: 'search',
    //         id: 'search',
    //         placeholder: 'Поиск',
    //         events: {
    //             input: (event: InputEvent) => this.searchUserHandler(event as InputEvent),
    //         },
    //     });
    //
    //     this.children.chatList = new ChatList({
    //         events: {
    //             click: (event: Event) => this.openChatHandler(event),
    //         },
    //     });
    //
    //     this.children.contextMunuChatSettings = new ContextMenu({
    //         items: [
    //             {
    //                 img: addUserSVG,
    //                 text: 'Добавить пользователя',
    //                 events: {
    //                     click: () => {
    //                         const userIdToAdd = prompt('Введите id пользователя');
    //
    //                         if (userIdToAdd) {
    //                             ChatController.addUserToChat({
    //                                 chatId: this.props.current.id,
    //                                 users: [Number(userIdToAdd)],
    //                             });
    //                         }
    //                     },
    //                 },
    //             },
    //             {
    //                 img: delUserSVG,
    //                 text: 'Удалить пользователя',
    //                 events: {
    //                     click: () => {
    //                         const userIdToDelete = prompt('Введите id пользователя');
    //
    //                         if (userIdToDelete) {
    //                             ChatController.addUserToChat({
    //                                 chatId: this.props.current.id,
    //                                 users: [Number(userIdToDelete)],
    //                             });
    //                         }
    //                     },
    //                 },
    //             },
    //             {
    //                 img: delChatSVG,
    //                 text: 'Удалить чат',
    //                 events: {
    //                     click: () => {
    //                         const confirmMsg = confirm('Вы действительно хотите удалить чат ?');
    //                         if (confirmMsg) {
    //                             ChatController.deleteChat({
    //                                 chatId: this.props.current.id,
    //                             });
    //                             this.updateChatListHandler();
    //                         }
    //                     },
    //                 },
    //             },
    //             {
    //                 img: photoVideoSVG,
    //                 text: 'Изменить изображение чата',
    //                 events: {
    //                     click: () => {
    //                         (this.children.changeAvatarModal as Block).setProps({
    //                             changeModalActive: true,
    //                         });
    //                     },
    //                 },
    //             },
    //         ],
    //     });
    //
    //     this.children.contextButtonMenu = new ContextButton({
    //         img: contextMenuSVG,
    //         class: 'chat-title__context-button',
    //
    //         events: {
    //             click: (event) => {
    //                 (this.children.contextMunuChatSettings as Block).setProps({
    //                     positionX: (event?.currentTarget as HTMLElement).getClientRects()[0].x - 200,
    //                     positionY: (event?.currentTarget as HTMLElement).getClientRects()[0].y + 25,
    //                     active: true,
    //                 });
    //             },
    //         },
    //     });
    //
    //     this.children.contextMunuMessage = new ContextMenu({
    //         items: [
    //             {
    //                 img: photoVideoSVG,
    //                 text: 'Фото или Видео',
    //                 events: {
    //                     click: () => {
    //                         console.log('Фото или Видео');
    //                     },
    //                 },
    //             },
    //             {
    //                 img: fileSVG,
    //                 text: 'Файл',
    //                 events: {
    //                     click: () => {
    //                         console.log('Файл');
    //                     },
    //                 },
    //             },
    //             {
    //                 img: locationSVG,
    //                 text: 'Локация',
    //                 events: {
    //                     click: () => {
    //                         console.log('Локация');
    //                     },
    //                 },
    //             },
    //         ],
    //     });
    //
    //     this.children.clipButton = new ContextButton({
    //         img: clipSVG,
    //         class: 'button clip-button',
    //
    //         events: {
    //             click: (event) => {
    //                 (this.children.contextMunuMessage as Block).setProps({
    //                     positionX: (event?.currentTarget as HTMLElement).getClientRects()[0].x,
    //                     positionY: (event?.currentTarget as HTMLElement).getClientRects()[0].y - 150,
    //                     active: true,
    //                 });
    //             },
    //         },
    //     });
    //
    //     this.children.sendMsgButton = new ContextButton({
    //         img: arrowSVG,
    //         class: 'button send-button',
    //
    //         events: {
    //             click: () => {
    //                 const message: HTMLTextAreaElement = document.querySelector('#message') as HTMLTextAreaElement;
    //
    //                 if (message.value) {
    //                     MessagesController.sendMessage(this.props.current.id, message.value);
    //                     message.value = '';
    //                 }
    //             },
    //         },
    //     });
    //
    //     this.children.chatHistory = new ChatHistory({});
    //
    //     this.children.messageInput = new MessageInput({
    //         name: 'message',
    //         id: 'message',
    //         placeholder: 'Сообщение',
    //         events: {
    //             input: (event: InputEvent) => autoSizeTextArea(event!),
    //         },
    //     });
    //
    //     this.updateChatListHandler();
    // }

    updateChatListHandler() {
        AuthController.fetchUser().then((r: void) => console.log('fetch done '+r));

        ChatController.fetchChats().then(() => {
            // refresh chatList
            (this.children.chatList as Block<any>).setState({
                chats: this.props.chats,
                events: {
                    click: (event: Event) => this.openChatHandler(event),
                },
            });

            // clear search input
            (this.children.input as Block<any>).setState({
                value: '',
            });
        });
    }


    protected render (): string {
    return `
        <main>
          <div class="messenger">
            <div class="messenger__left-column">
              <div class="profile">
                {{{createChat}}}
                {{{profileLink}}}
              </div>
              <div class="search-field">
                {{{input}}}
              </div>
              {{{chatList}}}
            </div>
            <div class="messenger__right-column">
              {{#if current}}
                <div class="chat">
                  <div class="chat__header">
                    <div class="chat-title">
                      {{#if current.avatar}}
                        <img src="https://ya-praktikum.tech/api/v2/resources{{current.avatar}}" 
                             class="chat-title__avatar" 
                             height="35" 
                             width="35"
                             alt="avatar">
                       {{/if}}
                      <h4 class="chat-title__name">{{current.title}}</h4>
                    </div>
                    {{{contextButtonMenu}}}
                    {{{contextMunuChatSettings}}}
                  </div>
                  {{{chatHistory}}}
                  <div class="chat__bottom-panel">
                    {{{clipButton}}}
                    {{{messageInput}}}
                    {{{sendMsgButton}}}
                  </div>
                </div>
              {{else}}
                <div class="empty-chat"><span>Выберите чат</span></div>
              {{/if}}
            </div>
            {{{changeAvatarModal}}}
          </div>
        </main>
    `
  }
}
