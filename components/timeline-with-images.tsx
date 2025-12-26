"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const timelineEvents = [
  {
    id: 1,
    date: "Janeiro 2023",
    title: "Nosso Primeiro Encontro",
    description:
      "Foi em uma tarde ensolarada que nossos caminhos se cruzaram. Seus olhos brilharam quando você sorriu, e naquele momento eu soube que havia algo especial acontecendo.",
    image: "/couple-first-date-romantic-restaurant.jpg",
  },
  {
    id: 2,
    date: "Março 2023",
    title: "Nossa Primeira Viagem",
    description:
      "Decidimos fugir da rotina e explorar novos horizontes juntos. Cada lugar visitado se tornou mais especial porque você estava ao meu lado, transformando momentos simples em memórias inesquecíveis.",
    image: "/couple-travel-adventure-beach-sunset.jpg",
  },
  {
    id: 3,
    date: "Maio 2023",
    title: "O Pedido de Namoro",
    description:
      "Sob um céu estrelado, com o coração batendo acelerado, eu perguntei se você queria oficializar nosso amor. Seu 'sim' foi a resposta mais linda que já ouvi.",
    image: "/romantic-proposal-night-stars-couple.jpg",
  },
  {
    id: 4,
    date: "Agosto 2023",
    title: "Nosso Aniversário de Namoro",
    description:
      "Celebramos meses incríveis juntos, cheios de risadas, aventuras e muito amor. Cada dia ao seu lado é um presente que eu valorizo profundamente.",
    image: "/couple-celebrating-anniversary-dinner-candles.jpg",
  },
  {
    id: 5,
    date: "Dezembro 2024",
    title: "Nossas Aventuras Continuam",
    description:
      "Nossa história está apenas começando. Com você, descobri que o amor verdadeiro existe e que cada dia pode ser uma nova página cheia de momentos especiais.",
    image: "/couple-happy-together-winter-cozy.jpg",
  },
]

export default function TimelineWithImages() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="timeline" ref={sectionRef} className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="text-5xl md:text-7xl font-bold text-balance mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nossos Momentos
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl text-pretty max-w-2xl mx-auto">
            Uma jornada visual através dos nossos momentos mais especiais
          </p>
        </div>

        {/* Side by side images with scroll indicator */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {timelineEvents.slice(0, 2).map((event) => (
            <div key={event.id} className="relative aspect-3/4 rounded-2xl overflow-hidden group">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1.5 rounded-full bg-white/90 text-black text-sm font-medium mb-3">
                  {event.date}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white text-balance">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center justify-center gap-4 py-4">
          <span className="text-sm text-muted-foreground">Role para explorar</span>
          <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Remaining timeline events */}
        <div className="mt-20 space-y-16">
          {timelineEvents.slice(2).map((event, index) => (
            <div
              key={event.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2 relative aspect-4/3 rounded-2xl overflow-hidden group">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {event.date}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-balance">{event.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed text-pretty">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
