// interface IButton {
//     text: string
//     modifier: string
//     tabIndex: number
//     onClick?: () => void
// }
//
// interface ButtonProps {
//     text: string
//     modifier: string
//     tabIndex: number
//     events: BlockEvents
// }

export interface AvatarProps {
    url: string
    changeModalActive?: boolean
    modifier?: string
    events?: BlockEvents
    onClick?: (e: Event) => void
}
