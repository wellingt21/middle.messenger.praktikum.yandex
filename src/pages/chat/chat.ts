// base
import Block from '../../core/Block'
import template from './chat.hbs'

import * as styles from './chat.scss'

import arrowSVG from '../../../static/arrow.svg'
import clipSVG from '../../../static/grayClip.svg'
import contextMenuSVG from '../../../static/contextMenu.svg'

import photoVideoSVG from '../../../static/menuSvg/fotoVideo.svg'
import locationSVG from '../../../static/menuSvg/location.svg'
import fileSVG from '../../../static/menuSvg/file.svg'

import addUserSVG from '../../../static/menuSvg/addUser.svg'
import delUserSVG from '../../../static/menuSvg/delUser.svg'
import delChatSVG from '../../../static/menuSvg/delChat.svg'

import { ChatList, ChatListProp } from '../../components/list/chatList'
import { MessageInput } from '../../components/inputs/MessageInput/messageInput'
import { LabeledInput } from '../../components/inputs/Input/LabeledInput/labeledInput'
import { ChatHistory } from '../../components/history/chatHistory'
import { Link } from '../../components/buttons/link/link'

import { Routes } from '../../utils/routes'
import { autoSizeTextArea } from '../../core/helpers/autoSizeTextArea'

import ChatController from '../../core/api/controllers/ChatController'
import userController from '../../core/api/controllers/UserController'
import AuthController from '../../core/api/controllers/AuthController'

import { withStore } from '../../core/Store'
import router from '../../core/Router'
import { ContextButton } from '../../components/buttons/context/ContextButton'
import { ContextMenu } from '../../components/menu/ContextMenu'
import MessagesController from '../../core/api/controllers/MessagesController'
import { ControlLink } from '../../components/buttons/link/ControlLink/ControlLink'
import { changeAvatarModal } from '../../components/avatar/changeAvatarModal/changeAvatarModal'

export class ChatPageBase extends Block {
  createChatHandler (event: Event) {
    const element = event.target as HTMLElement
    const { title, id } = element.dataset

    // console.log(title, id);
    // console.log(this.props);

    ChatController.createChat({ title: `чат ${title} / ${this.props.user.login}` }).then((chat) => {
      this.updateChatListHandler()
      ChatController.addUserToChat({ chatId: chat.id, users: [Number(id)] })
        .then(r => console.log(r + ' user added'))
    })
  }

  openChatHandler (event: Event) {
    const element = event.target as HTMLElement
    const { title, id, avatar } = element.dataset
    if (!title) return
    ChatController.selectChat({
      title,
      avatar,
      id: Number(id)
    }).then(() => {
      (this.children.chatHistory as Block).setState({
        userId: this.props.user.id,
        id: Number(id)
      })
      router.go(`${Routes.Messenger}#${id}`)
    })
  }

  searchUserHandler (event: InputEvent) {
    const searchQuery = (event.target as HTMLInputElement).value
    if (searchQuery) {
      userController.searchUser({ login: searchQuery }).then((data) => {
        if (data != null) {
          const result: ChatListProp[] = []

          data?.map((user) => {
            result.push({
              id: user.id,
              title: user.login,
              avatar: user.avatar
            })
          });

          (this.children.chatList as Block).setState({
            chats: [...result],
            events: {
              click: (event: Event) => this.createChatHandler(event)
            }
          })
        }
      })
    } else {
      this.updateChatListHandler()
    }
  }

  protected init () {
    this.children.changeAvatarModal = new changeAvatarModal({
      changeModalActive: false,
      type: 'chat'
    })

    this.children.createChat = new ControlLink({
      text: 'Новый чат',
      class: 'profile__link',
      events: {
        click: () => {
          const title = prompt('Введите название чата')
            if (!title) return
          ChatController.createChat({ title }).then(() => {
            this.updateChatListHandler()
          })
        }
      }
    })

    this.children.profileLink = new Link({
      text: 'Профиль >',
      class: 'profile__link',
      href: Routes.Profile
    })

    // search input
    this.children.input = new LabeledInput({
      type: 'text',
      name: 'search',
      id: 'search',
      placeholder: 'Поиск',
      events: {
        input: (event) => this.searchUserHandler(event as InputEvent)
      }
    })

    this.children.chatList = new ChatList({
      events: {
        click: (event: Event) => this.openChatHandler(event)
      }
    })

    this.children.contextMunuChatSettings = new ContextMenu({
      items: [
        {
          img: addUserSVG,
          text: 'Добавить пользователя',
          events: {
            click: () => {
              const userIdToAdd = prompt('Введите id пользователя')

              if (userIdToAdd) {
                ChatController.addUserToChat({
                  chatId: this.props.current.id,
                  users: [Number(userIdToAdd)]
                }).then(r => console.log(r + ' user added'))
              }
            }
          }
        },
        {
          img: delUserSVG,
          text: 'Удалить пользователя',
          events: {
            click: () => {
              const userIdToDelete = prompt('Введите id пользователя')

              if (userIdToDelete) {
                ChatController.addUserToChat({
                  chatId: this.props.current.id,
                  users: [Number(userIdToDelete)]
                }).then(r => console.log(r + ' user added'))
              }
            }
          }
        },
        {
          img: delChatSVG,
          text: 'Удалить чат',
          events: {
            click: () => {
              const confirmMsg = confirm('Вы действительно хотите удалить чат ?')
              if (confirmMsg) {
                ChatController.deleteChat({
                  chatId: this.props.current.id
                }).then(() => console.log('chat deleted'))
                this.updateChatListHandler()
              }
            }
          }
        },
        {
          img: photoVideoSVG,
          text: 'Изменить изображение чата',
          events: {
            click: () => {
              (this.children.changeAvatarModal as Block).setState({
                changeModalActive: true
              })
            }
          }
        }
      ]
    })

    this.children.contextButtonMenu = new ContextButton({
      img: contextMenuSVG,
      class: 'chat-title__context-button',

      events: {
        click: (event) => {
          (this.children.contextMunuChatSettings as Block).setState({
            positionX: (event?.currentTarget as HTMLElement).getClientRects()[0].x - 200,
            positionY: (event?.currentTarget as HTMLElement).getClientRects()[0].y + 25,
            active: true
          })
        }
      }
    })

    this.children.contextMunuMessage = new ContextMenu({
      items: [
        {
          img: photoVideoSVG,
          text: 'Фото или Видео',
          events: {
            click: () => {
              console.log('Фото или Видео')
            }
          }
        },
        {
          img: fileSVG,
          text: 'Файл',
          events: {
            click: () => {
              console.log('Файл')
            }
          }
        },
        {
          img: locationSVG,
          text: 'Локация',
          events: {
            click: () => {
              console.log('Локация')
            }
          }
        }
      ]
    })

    this.children.clipButton = new ContextButton({
      img: clipSVG,
      class: 'button clip-button',

      events: {
        click: (event) => {
          (this.children.contextMunuMessage as Block).setState({
            positionX: (event?.currentTarget as HTMLElement).getClientRects()[0].x,
            positionY: (event?.currentTarget as HTMLElement).getClientRects()[0].y - 150,
            active: true
          })
        }
      }
    })

    this.children.sendMsgButton = new ContextButton({
      img: arrowSVG,
      class: 'button send-button',

      events: {
        click: () => {
          const message: Nullable< HTMLTextAreaElement> = document.querySelector('#message')
            if (!message) return
          if (message.value) {
            MessagesController.sendMessage(this.props.current.id, message.value)
            message.value = ''
          }
        }
      }
    })

    this.children.chatHistory = new ChatHistory({})

    this.children.messageInput = new MessageInput({
      name: 'message',
      id: 'message',
      placeholder: 'Сообщение',
      events: {
        input: (event) => {
            if (event) autoSizeTextArea(event)
        }
      }
    })

    this.updateChatListHandler()
  }

  updateChatListHandler () {
    AuthController.fetchUser().then(() => console.log('user fetched'))

    ChatController.fetchChats().then(() => {
      // refresh chatList
      (this.children.chatList as Block).setState({
        chats: this.props.chats,
        events: {
          click: (event: Event) => this.openChatHandler(event)
        }
      });

      // clear search input
      (this.children.input as Block).setState({
        value: ''
      })
    })
  }

  protected render (): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      styles,
      arrowSVG,
      clipSVG,
      contextMenuSVG
    })
  }
}

const withChats = withStore((state) => ({ ...state.chats, user: { ...state.user } }))

export const ChatPage = withChats(ChatPageBase)
