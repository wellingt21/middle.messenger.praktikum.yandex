type EditFields = any

export default interface editFieldType {
    placeholder: string
    id: editFieldsId
    type: string
}

export interface EditProps {
    avatar?: AvatarProps
    editFields: EditFields
    onEdit: () => void,
    onClick?: () => void
}

interface AvatarProps {
    src: string
    onClick: () => void
}

export type editFieldsId = string // TODO: fixme
