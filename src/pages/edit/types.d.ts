type EditFields = any

export default interface editFieldType {
  placeholder: string
  id: editFieldsId
  type: string
}

export interface EditProps {
  editFields: EditFields
  onEdit: () => void
}

export type editFieldsId = string // TODO: fixme
