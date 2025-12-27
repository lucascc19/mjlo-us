"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { FloatingDoodles } from "./ui/floating-doodles"
import { DotWaveLoader } from "./dot-wave-loader"

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    id: 1,
    date: "Janeiro 2023",
    title: "Nosso Primeiro Encontro",
    description:
      "Foi em uma tarde ensolarada que nossos caminhos se cruzaram. Seus olhos brilharam quando você sorriu, e naquele momento eu soube que havia algo especial acontecendo.",
    images: ["/couple-first-date-romantic-restaurant.jpg", "/lo.jpg"],
  },
  {
    id: 2,
    date: "Março 2023",
    title: "Nossa Primeira Viagem",
    description:
      "Decidimos fugir da rotina e explorar novos horizontes juntos. Cada lugar visitado se tornou mais especial porque você estava ao meu lado, transformando momentos simples em memórias inesquecíveis.",
    images: ["/couple-travel-adventure-beach-sunset.jpg", "/couple-holding-hands-beach.jpg"],
  },
  {
    id: 3,
    date: "Maio 2023",
    title: "O Pedido de Namoro",
    description:
      "Sob um céu estrelado, com o coração batendo acelerado, eu perguntei se você queria oficializar nosso amor. Seu 'sim' foi a resposta mais linda que já ouvi.",
    images: ["/romantic-proposal-night-stars-couple.jpg"],
  },
]

export default function TimelineWithImages() {
  const [mounted, setMounted] = useState(false)
  const [expandedImages, setExpandedImages] = useState<Map<number, number>>(new Map())
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    setMounted(true)
    const initialExpanded = new Map<number, number>()
    events.forEach((event) => {
      if (event.images.length > 1) {
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
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        })
      }

      const cards = sectionRef.current?.querySelectorAll(".timeline-card")
      cards?.forEach((card) => {
        const image = card.querySelector(".timeline-image")
        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          })
        }

        const content = card.querySelector(".timeline-content")
        if (content) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          })
        }

        const badge = card.querySelector(".timeline-badge")
        if (badge) {
          gsap.from(badge, {
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: 0.4,
            ease: "back.out(1.7)",
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
              duration: 1,
              ease: "power2.inOut",
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
          {events.map((event, index) => (
            <div key={event.id} className="relative timeline-card">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 items-center`}
              >
                <div className="timeline-image w-full md:w-1/2 relative">
                  {event.images.length === 1 ? (
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden group shadow-2xl">
                      <Image
                        src={event.images[0]}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    </div>
                  ) : (
                    <div className="relative space-y-3">
                      {event.images.map((imageSrc, imageIndex) => {
                        const isExpanded = expandedImages.get(event.id) === imageIndex
                        const totalImages = event.images.length

                        return (
                          <div
                            key={imageIndex}
                            data-image={`${event.id}-${imageIndex}`}
                            className="relative cursor-pointer rounded-2xl overflow-hidden group shadow-xl transition-all duration-500 ease-out"
                            style={{
                              height: isExpanded ? "400px" : "80px",
                            }}
                            onClick={() => handleImageClick(event.id, imageIndex)}
                          >
                            <Image
                              src={imageSrc}
                              alt={`${event.title} - Foto ${imageIndex + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                                    {imageIndex + 1}/{totalImages}
                                  </div>
                                  {!isExpanded && (
                                    <span className="text-sm opacity-80">Clique para expandir</span>
                                  )}
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
                              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {index < events.length - 1 && (
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
