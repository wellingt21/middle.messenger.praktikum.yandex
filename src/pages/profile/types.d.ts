interface ProfileInfo {
  label: string
  value: string
  tag?: string
}

interface ProfilePageProps {
  // @ts-expect-error
  img: IImage
  name: string
  profileInfo: ProfileInfo[]
  onLogout: () => Promise<void>
}
