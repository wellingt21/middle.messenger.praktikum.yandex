interface IButton {
  text: string
  modificator: string
  tabIndex: number
  onClick?: () => void
}

interface ButtonProps {
  text: string
  modificator: string
  tabIndex: number
  events: BlockEvents
}
