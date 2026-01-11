export type EventType = {
  name: string
  date: string
  location: string
  mapEmbedUrl?: string // Google Maps embed URL or similar
  coordinates?: {
    lat: number
    lng: number
  }
  description?: string
  menuItems?: string[]
}
