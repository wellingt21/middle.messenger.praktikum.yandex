import './avatar.scss'
import Block from '../../core/block/Block'
import {AvatarProps} from "./types";

// @ts-ignore
import defaultAvatar from "../../../static/images/"

export default // @ts-ignore
class Avatar extends Block<AvatarProps> {
    static _name = 'Avatar'

    public isActive = false

    constructor ({ ...restProps }: IButton) {

        const test = () => {
            console.log(this.isActive)
            console.log(this.state)
            this.setState({...this.state, isActive: !this.state.isActive })
            console.log(this.state)
        }

        super({ ...restProps, isActive: false, events: { click:  () => test()  }})

    }


    render (): string {
        // noinspection HtmlUnknownTarget
        return `
            <div>
                <div class="profile-avatar">
                    <div class="avatar-mask">
                        <span class="avatar-mask-text">Поменять аватар</span>
                    </div>
                    
                    {{#if url}}
                    <img class="avatar-image" src="https://ya-praktikum.tech/api/v2/resources{{url}}" alt="avatar">
                    {{else}}
                    <img src="{{defaultAvatar}}" alt="avatar-template">
                    {{/if}}
                </div>

                 <div>
                    {{#if isActive}}
                         <div
                            onclick="this.test()"
                          class="modal"                                    
                        >
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
            </div>
        `
    }
}