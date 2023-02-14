import './avatar.scss'
import Block from '../../core/block/Block'
import {AvatarProps} from "./types";

// @ts-ignore
import defaultAvatar from "../../../static/images/"
// import changeAvatarModal from "./changeAvatarModal";

export default // @ts-ignore
class Avatar extends Block<AvatarProps> {
    static _name = 'Avatar'

    public isActive = false

    // constructor ({ ...restProps }: IButton) {
    //
    //     const test = () => {
    //         console.log(this.isActive)
    //         console.log(this.state)
    //         this.setState({...this.state, isActive: !this.state.isActive })
    //         console.log(this.state)
    //     }
    //
    //     super({ ...restProps, isActive: false, events: { click:  () => test()  }})
    // }


    constructor(props: AvatarProps) {
        super({
            ...props,
            changeModalActive: false,
            events: {
                click: (event: Event) => this.setChangeModalActive(event),
            },
        });
    }

    // protected init() {
    //     this.children.changeAvatarModal = new changeAvatarModal({
    //         changeModalActive: false,
    //         type: 'profile',
    //     });
    // }

    setChangeModalActive(event: Event) {
        // console.log(Object.values(this.children)[0].setState)

        // открытие модального окна изменения аватара
        if ((event.target as Element).className === 'avatar-mask'
            || (event.target as Element).className === 'avatar-mask__text') {

            // @ts-ignore
            (Object.values(this.children)[0] as Block).setState({
                changeModalActive: true,
            });
        }
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
                {{{Modal}}}
                
            </div>
        `
    }
}