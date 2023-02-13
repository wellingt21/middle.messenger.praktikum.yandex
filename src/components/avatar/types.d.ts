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

type ChangeAvatarType = 'chat' | 'profile';

export interface AvatarProps {
    url: string
    changeModalActive?: boolean
    modifier?: string
    events?: BlockEvents
    onClick?: (e: Event) => void
}

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