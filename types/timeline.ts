import type { AspectRatio } from "@/lib/constants"

export interface MediaItem {
  src: string
  type: "image" | "video"
  alt?: string
  aspectRatio?: AspectRatio
}

export interface TimelineEvent {
  id: number
  date: string
  title: string
  description: string
  media: MediaItem[]
}

export interface MediaItemProps {
  mediaItem: MediaItem
  mediaIndex: number
  eventId: number
  eventTitle: string
  isExpanded: boolean
  totalMedia: number
  onImageClick: (eventId: number, mediaIndex: number) => void
}
