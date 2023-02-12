import Block from '../../core/block/Block'
import './photo.scss'

export default // @ts-expect-error
class Photo extends Block<PhotoProps> {
  static _name = 'Photo'

  constructor (props: IPhoto) {
    super({ ...props.img })
  }

  render (): string {
    return `<div class="photo-wrapper">
            {{#if src}}
              <img src="{{src}}" alt={{alt}}>
            {{else}}
              <img src="/static/img/svg/Profile.svg" alt={{alt}}>
            {{/if}}
              <div class="photo-change">Поменять аватар</div>
          </div>`
  }
}
