import './modal.scss'
import Block from '../../core/block/Block'
import {ModalProps} from "./types";
import {changeAvatarModalProps} from "../avatar/types";

export default // @ts-ignore
class Modal extends Block<ModalProps> {
    static _name = 'Modal'

    onSubmit() {
        // event.preventDefault();
        console.log('submitted')
        if (this.props.uploadAvatar) {
            const data = new FormData();
            data.append('avatar', this.props.uploadAvatar);

            switch (this.props.type) {
                case 'profile':
                    console.log('case profile')


                    // TODO: update PROCESSING
                    // updateProfileAvatar(data);

                    break;
                case 'chat':
                    // const chatId = store.getState().chats.current.id;
                    console.log('id')
                    // if (chatId) {
                    //     data.append('chatId', chatId);
                    //     ChatController.changeAvatar(data);
                    // }
                    break;
            }

            this.setState({
                changeModalActive: false,
                imageName: null,
            });
        }
    }

    constructor(props: changeAvatarModalProps) {
        super({
            ...props,
            events: {
                change: () => this.onChange(),
                // submit: (event: Event) => this.onSubmit(event),
                click: (event: Event) => this.setChangeModalActive(event),
            },
            onSubmit: () => this.onSubmit()
        });

        console.log(this.state)
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

    onChange() {
        const avatarUpload = document.querySelector(
            '#avatar-upload',
        ) as HTMLInputElement;

        console.log(avatarUpload.files)
        if (avatarUpload.files) {
            this.setState({
                imageName: avatarUpload!.files![0].name,
                uploadAvatar: avatarUpload!.files![0],
            });
        }
    }

    render (): string {
        return `
             <div class="modal"  {{#unless changeModalActive}} style="display: none"  {{/unless}}>
                  <form class="modal-content" id="modal-container">
                    <p class="modal-title">
                      Загрузите файл
                    </p>
                    <div class="modal-text">
                      <input type="file" name="avatar" id="avatar-upload" accept="image/*">
                      {{#if imageName}}
                        <span class="modal-text__content-text">{{imageName}}</span>
                      {{else}}
                        <label class="modal-text__content-button" for="avatar-upload">Выбрать файл на компьютере</label>
                      {{/if}}
                    </div>
                    {{{Button text="Сохранить" modifier="primary" onClick=onSubmit}}}
                  </form>
            </div>
        `
    }
}
