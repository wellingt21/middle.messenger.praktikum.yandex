// @ts-ignore
import Handlebars, {HelperOptions} from 'handlebars'


// interface IComponent {
//   name: string
//   props: any // TODO: temporary any
// }

export default function registerComponent<Props extends any>(Component: any) {
  const {name} = Component

  Handlebars.registerHelper(
    name,
    function (this: any, {hash: {ref, ...hash}, data, fn}: HelperOptions) {

      if (!data.root.children) {
        data.root.children = {}
      }

      if (!data.root.refs) {
        data.root.refs = {}
      }

      const {children, refs} = data.root;


        // TODO: WTF?
        (Object.keys(hash) as any).forEach((key: keyof Props) => {
          if (this[key] && typeof this[key] === "string") {
            hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key])
          }
        })


      const component = new Component(hash)

      children[component.id] = component

      if (ref) {
        refs[ref] = component.getContent()
      }

      const contents = fn ? fn(this) : ''
        return `
          <div data-id="${component.id}">
              ${contents}
          </div>
         `

    })


}
