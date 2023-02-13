import './modal.scss'
import Block from '../../core/block/Block'
import {ModalProps} from "./types";

export default // @ts-ignore
class Modal extends Block<ModalProps> {
    static _name = 'Modal'



    constructor ({ onClick, ...restProps }: any) {
        super({ ...restProps, events: { click: () => this.onClose()} })
        console.log(this.state)
    }

    onClose = () => {
        console.log('on close')
        this.state.isActive = false
        this.setState({ isActive: false})
    }



    render (): string {
        return `
            <div>
                {{#if isActive}}
                     <divclass="modal">
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
                        {{{Button text="Закрыть" modifier="primary" onClick=onClick}}}
                      </form>
                    </div>
                {{/if}}
             </div>
        `
    }
}
