interface ProfileInfo {
  label: string
  value: string
  tag?: string
}

interface ProfilePageProps {
    avatar: string;
    img: { src: string, alt: string }
    name: string
    profileInfo: ProfileInfo[]
    onLogout: () => Promise<void>
}
