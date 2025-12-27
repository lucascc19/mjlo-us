"use client"

import { useEffect, useRef, useState, memo } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FloatingDoodles } from "./ui/floating-doodles"
import { DotWaveLoader } from "./dot-wave-loader"
import type { MediaItemProps } from "@/types/timeline"
import { MEDIA_HEIGHTS, SCROLL_CONFIG } from "@/lib/constants"
import { timelineEvents } from "@/data/timeline-events"
import { GSAP_ANIMATIONS, GSAP_DURATION, GSAP_EASE, GSAP_STAGGER } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

const MediaItemComponent = memo(function MediaItemComponent({
  mediaItem,
  mediaIndex,
  eventId,
  eventTitle,
  isExpanded,
  totalMedia,
  onImageClick,
}: MediaItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (mediaItem.type === "video" && videoRef.current) {
      if (isExpanded) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isExpanded, mediaItem.type])

  const defaultAspectRatio = mediaItem.aspectRatio || "3/4"

  return (
    <div
      key={mediaIndex}
      data-image={`${eventId}-${mediaIndex}`}
      className="relative cursor-pointer rounded-2xl overflow-hidden group shadow-xl transition-all duration-500 ease-out mx-auto"
      style={{
        height: isExpanded
          ? mediaItem.type === "video"
            ? "auto"
            : MEDIA_HEIGHTS[defaultAspectRatio]
          : "80px",
        aspectRatio: isExpanded && mediaItem.type === "image" ? defaultAspectRatio : undefined,
        maxWidth: "400px",
        width: "100%",
      }}
      onClick={() => onImageClick(eventId, mediaIndex)}
    >
      {mediaItem.type === "image" ? (
        <Image
          src={mediaItem.src}
          alt={`${eventTitle} - Foto ${mediaIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          ref={videoRef}
          src={mediaItem.src}
          className={`w-full transition-transform duration-500 group-hover:scale-105 ${
            isExpanded ? "h-auto" : "h-full object-cover"
          }`}
          controls={isExpanded}
          autoPlay={isExpanded}
          loop
          muted
          playsInline
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
              {mediaItem.type === "video" && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              {mediaIndex + 1}/{totalMedia}
            </div>
            {!isExpanded && <span className="text-sm opacity-80">Clique para expandir</span>}
          </div>
          <div
            className="text-2xl transition-transform duration-300"
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ↓
          </div>
        </div>
      </div>

      {!isExpanded && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-none" />
      )}
    </div>
  )
})

export default function TimelineWithImages() {
  const [mounted, setMounted] = useState(false)
  const [expandedImages, setExpandedImages] = useState<Map<number, number>>(new Map())
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    setMounted(true)
    const initialExpanded = new Map<number, number>()
    timelineEvents.forEach((event) => {
      if (event.media.length > 1) {
        initialExpanded.set(event.id, 0)
      }
    })
    setExpandedImages(initialExpanded)
  }, [])

  useEffect(() => {
    if (!mounted || !sectionRef.current) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: SCROLL_CONFIG.TRIGGER_START_TIMELINE,
            toggleActions: "play none none none",
          },
          ...GSAP_ANIMATIONS.fadeInUp(),
          duration: GSAP_DURATION.SLOW,
        })
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: SCROLL_CONFIG.TRIGGER_START_TIMELINE,
            toggleActions: "play none none none",
          },
          ...GSAP_ANIMATIONS.fadeInUp(0.2),
          y: 30,
          duration: GSAP_DURATION.MEDIUM,
        })
      }

      const cards = sectionRef.current?.querySelectorAll(".timeline-card")
      cards?.forEach((card) => {
        const image = card.querySelector(".timeline-image")
        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: card,
              start: SCROLL_CONFIG.TRIGGER_START_CARDS,
              toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            duration: GSAP_DURATION.SLOW,
            ease: GSAP_EASE.POWER3_OUT,
          })
        }

        const content = card.querySelector(".timeline-content")
        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: card,
              start: SCROLL_CONFIG.TRIGGER_START_CARDS,
              toggleActions: "play none none none",
            },
            ...GSAP_ANIMATIONS.fadeInUp(0.2),
            duration: GSAP_DURATION.MEDIUM,
          })
        }

        const badge = card.querySelector(".timeline-badge")
        if (badge) {
          gsap.from(badge, {
            scrollTrigger: {
              trigger: card,
              start: SCROLL_CONFIG.TRIGGER_START_CARDS,
              toggleActions: "play none none none",
            },
            ...GSAP_ANIMATIONS.scaleIn(0.4),
            duration: GSAP_DURATION.NORMAL,
          })
        }

        const arrow = card.querySelector(".timeline-arrow")
        if (arrow) {
          const path = arrow.querySelector("path")
          if (path) {
            const length = (path as SVGPathElement).getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            })
            gsap.to(path, {
              scrollTrigger: {
                trigger: card,
                start: "bottom 60%",
                toggleActions: "play none none none",
              },
              strokeDashoffset: 0,
              duration: GSAP_DURATION.SLOW,
              ease: GSAP_EASE.SMOOTH_IN_OUT,
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [mounted])

  const handleImageClick = (eventId: number, imageIndex: number) => {
    setExpandedImages((prev) => {
      const newMap = new Map(prev)
      const currentExpanded = newMap.get(eventId)

      if (currentExpanded === imageIndex) {
        newMap.delete(eventId)
      } else {
        newMap.set(eventId, imageIndex)
      }

      return newMap
    })
  }

  if (!mounted) return null

  return (
    <section id="timeline" ref={sectionRef} className="py-20 px-4 relative">
      <FloatingDoodles />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-balance mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nossos Momentos
          </h2>
          <p
            ref={subtitleRef}
            className="text-muted-foreground text-lg md:text-xl text-pretty max-w-2xl mx-auto"
          >
            Uma jornada visual através dos nossos momentos mais especiais
          </p>
        </div>

        <div className="relative space-y-24">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="relative timeline-card">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="timeline-image w-full md:w-1/2 relative">
                  {event.media.length === 1 ? (
                    <div className="relative aspect-3/4 h-[500px] rounded-2xl overflow-hidden group shadow-2xl mx-auto max-w-[400px]">
                      {event.media[0].type === "image" ? (
                        <Image
                          src={event.media[0].src}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={event.media[0].src}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          controls
                          loop
                          muted
                          playsInline
                        />
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative space-y-3">
                      {event.media.map((mediaItem, mediaIndex) => (
                        <MediaItemComponent
                          key={mediaIndex}
                          mediaItem={mediaItem}
                          mediaIndex={mediaIndex}
                          eventId={event.id}
                          eventTitle={event.title}
                          isExpanded={expandedImages.get(event.id) === mediaIndex}
                          totalMedia={event.media.length}
                          onImageClick={handleImageClick}
                        />
                      ))}
                    </div>
                  )}

                  {index < timelineEvents.length - 1 && (
                    <svg
                      className="timeline-arrow absolute left-1/2 -translate-x-1/2 w-12 h-24 mt-12 opacity-30 pointer-events-none hidden md:block"
                      viewBox="0 0 48 128"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 24 0 Q 18 30 24 60 Q 30 90 24 110 L 24 120"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="text-muted-foreground"
                      />
                      <path
                        d="M 16 112 L 24 120 L 32 112"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="text-muted-foreground"
                      />
                    </svg>
                  )}
                </div>
                <div className="timeline-content w-full md:w-1/2 space-y-4">
                  <div className="timeline-badge inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {event.date}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-balance">{event.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center space-y-6">
          <DotWaveLoader />
          <p className="text-sm uppercase tracking-widest text-muted-foreground/60">
            Mais momentos virão
          </p>
        </div>
      </div>
    </section>
  )
}
