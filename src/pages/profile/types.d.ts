interface ProfileInfo {
  label: string
  value: string
}

interface ProfilePageProps {
  // @ts-expect-error
  img: IImage
  name: string
  profileInfo: ProfileInfo[]
}
