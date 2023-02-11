interface BlockMeta<P> {
  tagName: string
  props: P
}

type BlockEvents = Record<string, () => void> | unknown

interface IBlock {
  getContent: () => HTMLElement
}

type BlockProps = Record<string, unknown>
