"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface PolaroidPhoto {
  id: number
  src: string
  caption: string
  rotation: number
}

interface PolaroidGalleryProps {
  photos: Array<{
    src: string
    caption: string
  }>
}

export function PolaroidGallery({ photos }: PolaroidGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  const polaroidPhotos: PolaroidPhoto[] = photos.map((photo, index) => ({
    id: index,
    src: photo.src,
    caption: photo.caption,
    rotation: (Math.random() - 0.5) * 10,
  }))

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 p-4">
        {polaroidPhotos.map((photo) => (
          <div
            key={photo.id}
            className="polaroid-container cursor-pointer"
            style={{
              transform: `rotate(${photo.rotation}deg)`,
            }}
            onClick={() => setSelectedPhoto(photo.id)}
          >
            <div className="polaroid bg-white dark:bg-gray-100 p-4 pb-16 shadow-2xl hover:shadow-romantic-pink/30 transition-all duration-300 hover:scale-105 hover:rotate-0">
              <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="mt-4 text-center">
                <p
                  className="text-gray-800 text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-cursive)" }}
                >
                  {photo.caption}
                </p>
              </div>

              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-amber-100/80 to-amber-200/60 rounded-sm shadow-sm" />
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in-up"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-romantic-pink transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="polaroid-expanded bg-white dark:bg-gray-100 p-6 pb-20 shadow-2xl max-w-3xl w-full animate-scale-in-bounce"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square bg-gray-200 overflow-hidden rounded-sm">
              <Image
                src={polaroidPhotos[selectedPhoto].src}
                alt={polaroidPhotos[selectedPhoto].caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="mt-6 text-center">
              <p
                className="text-gray-800 text-2xl md:text-3xl"
                style={{ fontFamily: "var(--font-cursive)" }}
              >
                {polaroidPhotos[selectedPhoto].caption}
              </p>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-gradient-to-b from-amber-100/80 to-amber-200/60 rounded-sm shadow-md" />
          </div>
        </div>
      )}

      <style jsx>{`
        .polaroid-container {
          transition: all 0.3s ease;
        }

        .polaroid {
          position: relative;
          border-radius: 2px;
        }

        .polaroid::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.05) 100%
          );
          pointer-events: none;
          border-radius: 2px;
        }

        .polaroid-expanded {
          border-radius: 4px;
          position: relative;
        }
      `}</style>
    </>
  )
}
