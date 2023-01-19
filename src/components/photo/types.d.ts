interface IPhoto {
  img: PhotoProps
}

interface PhotoProps {
  src: Nullable<string>
  alt: string
}
