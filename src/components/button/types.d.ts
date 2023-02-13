interface IButton {
  text: string
  modifier: string
  tabIndex: number
  onClick?: () => void
}

interface ButtonProps {
  text: string
  modifier: string
  tabIndex: number
  events: BlockEvents
}
