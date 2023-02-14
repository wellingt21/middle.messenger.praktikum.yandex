// base
import Block from '../../../core/Block';
import template from './changeAvatarModal.hbs';

// styles
import * as styles from './changeAvatarModal.scss';
import { Button } from '../../buttons/base/button';

// controllers
import UserController from '../../../core/api/controllers/UserController';
import store from '../../../core/Store';
import ChatController from '../../../core/api/controllers/ChatController';

type ChangeAvatarType = 'chat' | 'profile';

interface changeAvatarModalProps {
  imageName?: string;
  changeModalActive?: boolean;
  events?: {
    change?: () => void;
    submit?: (event: Event) => void;
    click?: (event: Event) => void;
  };
  type: ChangeAvatarType
}

export class changeAvatarModal extends Block {
  constructor(props: changeAvatarModalProps) {
    super({
      ...props,
      events: {
        change: () => this.onChange(),
        submit: (event: Event) => this.onSubmit(event),
        click: (event: Event) => this.setChangeModalActive(event),
      },
    });
  }

  setChangeModalActive(event: Event) {
    // закрытие модального окна
    if ((event.target as Element).className === 'modal') {
      this.setState({
        changeModalActive: false,
        imageName: null,
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.props.uploadAvatar) {
      const data = new FormData();
      data.append('avatar', this.props.uploadAvatar);

      switch (this.props.type) {
        case 'profile':
          UserController.updateProfileAvatar(data);
          break;
        case 'chat':
          const chatId = store.getState().chats.current.id;

          if (chatId) {
            data.append('chatId', chatId);
            ChatController.changeAvatar(data);
          }
          break;
      }

      this.setState({
        changeModalActive: false,
        imageName: null,
      });
    }
  }

  onChange() {
    const avatarUpload = document.querySelector(
      '#avatar-upload',
    ) as HTMLInputElement;

    if (avatarUpload) {
      this.setState({
        imageName: avatarUpload!.files![0].name,
        uploadAvatar: avatarUpload!.files![0],
      });
    }
  }

  protected init() {
    this.children.modalBtn = new Button({
      text: 'Поменять',
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}