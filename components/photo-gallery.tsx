"use client"

import { useState } from "react"
import Image from "next/image"

const photos = [
  {
    id: 1,
    src: "/romantic-couple.png",
    alt: "Foto 1",
  },
  {
    id: 2,
    src: "/couple-selfie-outdoor.jpg",
    alt: "Foto 2",
  },
  {
    id: 3,
    src: "/couple-holding-hands.png",
    alt: "Foto 3",
  },
  {
    id: 4,
    src: "/couple-sunset.png",
    alt: "Foto 4",
  },
  {
    id: 5,
    src: "/couple-laughing.png",
    alt: "Foto 5",
  },
  {
    id: 6,
    src: "/couple-adventure-travel.jpg",
    alt: "Foto 6",
  },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">Nossos Momentos</h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Memórias congeladas no tempo, amor eternizado em imagens
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer animate-scale-in shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <Image
                src={photo.src || "/placeholder.svg"}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full aspect-square">
            <Image
              src={photos.find((p) => p.id === selectedPhoto)?.src || ""}
              alt={photos.find((p) => p.id === selectedPhoto)?.alt || ""}
              fill
              className="object-contain rounded-3xl"
            />
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
