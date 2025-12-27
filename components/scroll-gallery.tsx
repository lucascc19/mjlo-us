"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { GlassCard } from "./ui/glass-card"
import { FloatingDoodles } from "./ui/floating-doodles"

const images = [
  {
    id: 1,
    src: "/lo.jpg",
    alt: "Momento 1",
    title: "Primeiro Encontro",
    date: "Janeiro 2023",
  },
  {
    id: 2,
    src: "/couple-holding-hands-beach.jpg",
    alt: "Momento 2",
    title: "Praia ao Entardecer",
    date: "Março 2023",
  },
  {
    id: 3,
    src: "/couple-laughing-together-cafe.jpg",
    alt: "Momento 3",
    title: "Café da Manhã Especial",
    date: "Maio 2023",
  },
  {
    id: 4,
    src: "/couple-embrace-city-lights-night.jpg",
    alt: "Momento 4",
    title: "Noite na Cidade",
    date: "Julho 2023",
  },
  {
    id: 5,
    src: "/couple-adventure-hiking-mountain.jpg",
    alt: "Momento 5",
    title: "Aventura nas Montanhas",
    date: "Setembro 2023",
  },
   {
    id: 6,
    src: "/lo.jpg",
    alt: "Momento 6",
    title: "Momento 6",
    date: "Janeiro 2023",
  },
]

export default function ScrollGallery() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight

      const scrollStart = 0
      const scrollEnd = sectionHeight - windowHeight
      const currentScroll = -rect.top

      const progress = Math.max(0, Math.min(1, currentScroll / scrollEnd))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative"
      style={{
        height: typeof window !== "undefined" && window.innerWidth < 768 ? "200vh" : "300vh",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <FloatingDoodles />

        <div
          ref={containerRef}
          className="flex gap-4 md:gap-8 px-4 md:px-8 transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(-${scrollProgress * (images.length - 1) * (typeof window !== "undefined" && window.innerWidth < 768 ? 84 : 22)}vw)`,
          }}
        >
          {images.map((image, index) => {
            const activeIndex = Math.round(scrollProgress * (images.length - 1))
            const distanceFromActive = Math.abs(index - activeIndex)
            const opacity =
              distanceFromActive === 0 ? 1 : Math.max(0.3, 1 - distanceFromActive * 0.4)
            const scale =
              distanceFromActive === 0 ? 1 : Math.max(0.85, 1 - distanceFromActive * 0.1)

            const isHovered = hoveredId === image.id

            return (
              <div
                key={image.id}
                className="relative shrink-0"
                style={{
                  width: "80vw",
                  height: "80vw",
                  opacity: opacity,
                  transform: `scale(${scale}) ${isHovered ? "translateY(-10px)" : ""}`,
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                }}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <GlassCard className="h-full overflow-hidden group cursor-pointer p-0">
                  <div className="relative h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white z-10 transform transition-transform duration-300">
                      <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full glass mb-3 md:mb-4">
                        <p className="text-xs md:text-sm font-medium tracking-wider uppercase">
                          {image.date}
                        </p>
                      </div>

                      <h3
                        className="text-3xl md:text-5xl font-bold mb-3 md:mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {image.title}
                      </h3>

                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-12 md:w-16 h-0.5 bg-white/50" />
                        <span className="text-base md:text-lg opacity-80">
                          {index + 1} / {images.length}
                        </span>
                      </div>
                    </div>

                    {isHovered && (
                      <div className="absolute inset-0 bg-linear-to-t from-romantic-pink/20 to-romantic-purple/20 pointer-events-none" />
                    )}
                  </div>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .shrink-0 {
            width: 30vw !important;
            height: 30vw !important;
          }
        }
      `}</style>
    </section>
  )
}
