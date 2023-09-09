import noImage from '~/assets/images/noImage.jpg'

export const checkImage = async (imageUrl: string): Promise<string> => {
  const config = useRuntimeConfig()
  const baseURL = config.public.baseURL

  try {
    if (!imageUrl) { return noImage }
    const data: any = await fetch(`${baseURL}static/image/${imageUrl}`)

    if (data.status !== 200) {
      return noImage
    }

    return `${baseURL}static/image/${imageUrl}`
  } catch {
    return noImage
  }
}
