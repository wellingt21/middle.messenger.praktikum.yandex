import Block from '../../core/block/block2'
import './chat.scss'
import {ChatController} from "../../core/controllers/ChatController";
import {AuthController} from "../../core/controllers/AuthController";
import userController from "../../core/controllers/UserController";
import Modal from "../../components/modal/modal";
import ControlLink from "../../components/links/controlLink";
import BaseLink from "../../components/links/link";
import LabeledInput from "../../components/input/labaled/labeledInput";
import ChatListBase from "../../components/chat/chatList";
import ContextMenu from "../../components/menu/ContextMenu";

// @ts-ignore
import addUserSVG from '../../../static/images/addUser.svg'
// @ts-ignore
import arrowSVG from '../../../static/images/arrow.svg';
// @ts-ignore
import clipSVG from '../../../static/images/grayClip.svg';
// @ts-ignore
import contextMenuSVG from '../../../static/images/contextMenu.svg';
// @ts-ignore
import photoVideoSVG from '../../../static/images/fotoVideo.svg';
// @ts-ignore
import locationSVG from '../../../static/images/location.svg';
// @ts-ignore
import fileSVG from '../../../static/images/file.svg';
// @ts-ignore
import delUserSVG from '../../../static/images/delUser.svg';
// @ts-ignore
import delChatSVG from '../../../static/images/delChat.svg';
import MessagesController from "../../core/controllers/MessagesController";
import ContextButton from "../../components/button/ContextButton/ContextButton";
import ChatHistoryBase from "../../components/history/chatHistory";
import {MessageInput} from "../../components/message/MessageInput/messageInput";
// import Block from "../../core/block/block2";
// import store from "../../core/store/Store";

export default class ChatPage extends Block {
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
            (this.children.chatHistory as Block).setState({
                userId: this.props.user.id,
                id: Number(id),
            });
            // this.router.go(`/messenger#${id}`);
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

                    (this.children.chatList as Block).setState({
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

     init() {
        super.init()
        this.children.changeAvatarModal = new Modal({
            changeModalActive: false,
            type: 'chat',
        }) as unknown as Block;

        this.children.createChat = new ControlLink({
            text: 'Новый чат',
            class: 'profile__link',
            events: {
                click: () => {
                    const title = prompt('Введите название чата');

                    ChatController.createChat({title: title as string}).then(() => {
                        this.updateChatListHandler();
                    });
                },
            },
        }) as unknown as Block;

        this.children.profileLink = new BaseLink({
            text: 'Профиль >',
            class: 'profile__link',
            href: '/profile',
        }) as unknown as Block;

        // search input
        this.children.input = new LabeledInput({
            type: 'text',
            name: 'search',
            id: 'search',
            placeholder: 'Поиск',
            events: {
                input: (event: Event) => this.searchUserHandler(event as InputEvent),
            },
        }) as unknown as Block;

        this.children.chatList = new ChatListBase({
            events: {
                click: (event: Event) => this.openChatHandler(event),
            },
        }) as unknown as Block;

        this.children.contextMenuChatSettings = new ContextMenu({
            items: [
                {
                    img: addUserSVG,
                    text: 'Добавить пользователя',
                    events: {
                        click: () => {
                            const userIdToAdd = prompt('Введите id пользователя');

                            if (userIdToAdd) {
                                ChatController.addUserToChat({
                                    chatId: this.props.current.id,
                                    users: [Number(userIdToAdd)],
                                });
                            }
                        },
                    },
                },
                {
                    img: delUserSVG,
                    text: 'Удалить пользователя',
                    events: {
                        click: () => {
                            const userIdToDelete = prompt('Введите id пользователя');

                            if (userIdToDelete) {
                                ChatController.addUserToChat({
                                    chatId: this.props.current.id,
                                    users: [Number(userIdToDelete)],
                                });
                            }
                        },
                    },
                },
                {
                    img: delChatSVG,
                    text: 'Удалить чат',
                    events: {
                        click: async () => {
                            const confirmMsg = confirm('Вы действительно хотите удалить чат ?');
                            if (confirmMsg) {
                                await ChatController.deleteChat({
                                    chatId: this.props.current.id,
                                }).then((r: any) => console.log(r));
                                this.updateChatListHandler();
                            }
                        },
                    },
                },
                {
                    img: photoVideoSVG,
                    text: 'Изменить изображение чата',
                    events: {
                        click: () => {
                            (this.children.changeAvatarModal as Block<any>).setState({
                                changeModalActive: true,
                            });
                        },
                    },
                },
            ],
        }) as unknown as Block;

        this.children.contextButtonMenu = new ContextButton({
            img: contextMenuSVG,
            class: 'links-title__context-button',

            events: {
                click: (event: any) => {
                    (this.children.contextMenuChatSettings as Block<any>).setState({
                        positionX: (event?.currentTarget as HTMLElement).getClientRects()[0].x - 200,
                        positionY: (event?.currentTarget as HTMLElement).getClientRects()[0].y + 25,
                        active: true,
                    });
                },
            },
        }) as unknown as Block;

        this.children.contextMenuMessage = new ContextMenu({
            items: [
                {
                    img: photoVideoSVG,
                    text: 'Фото или Видео',
                    events: {
                        click: () => {
                            console.log('Фото или Видео');
                        },
                    },
                },
                {
                    img: fileSVG,
                    text: 'Файл',
                    events: {
                        click: () => {
                            console.log('Файл');
                        },
                    },
                },
                {
                    img: locationSVG,
                    text: 'Локация',
                    events: {
                        click: () => {
                            console.log('Локация');
                        },
                    },
                },
            ],
        }) as unknown as Block;

        this.children.clipButton = new ContextButton({
            img: clipSVG,
            class: 'button clip-button',

            events: {
                click: (event: any) => {
                    (this.children.contextMenuMessage as Block<any>).setState({
                        positionX: (event?.currentTarget as HTMLElement).getClientRects()[0].x,
                        positionY: (event?.currentTarget as HTMLElement).getClientRects()[0].y - 150,
                        active: true,
                    });
                },
            },
        }) as unknown as Block;

        this.children.sendMsgButton = new ContextButton({
            img: arrowSVG,
            class: 'button send-button',

            events: {
                click: () => {
                    const message: HTMLTextAreaElement = document.querySelector('#message') as HTMLTextAreaElement;

                    if (message.value) {
                        MessagesController.sendMessage(this.props.current.id, message.value);
                        message.value = '';
                    }
                },
            },
        }) as unknown as Block    ;

        // @ts-ignore
         this.children.chatHistory = new ChatHistoryBase({}) as unknown as Block;

        this.children.messageInput = new MessageInput({
            name: 'message',
            id: 'message',
            placeholder: 'Сообщение',
            events: {
                input: (event: any) => this.autoSizeTextArea(event!),
            },
        }) as unknown as Block;

        this.updateChatListHandler();
    }

    autoSizeTextArea(event: InputEvent & { target: HTMLTextAreaElement }) {
        const { target } = event!;
        const maxHeight = 200;
        const defaultHeight = 35;

        if (target) {
            if (target.value === '') {
                target.style.height = `${defaultHeight}px`;
                return;
            }
            if (target.scrollHeight > maxHeight) {
                target.style.height = `${maxHeight}px`;
            } else {
                target.style.height = `${target.scrollHeight}px`;
            }
        }
    }

    updateChatListHandler() {
        new AuthController().fetchUser().then((r: void) => console.log('fetch done '+r));

        new ChatController().fetchChats().then(() => {
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


    render (): string {
        console.log(this)
    return `
        <main>
          <div class="messenger">
            <div class="messenger__left-column">
              <div class="profile">
                {{{ControlLink}}}
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
                    {{{contextMenuChatSettings}}}
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
            {{{Modal}}}
          </div>
        </main>
    `
  }
}
