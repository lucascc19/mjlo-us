"use client"

import { useEffect, useRef, useState } from "react"

const timelineEvents = [
  {
    date: "Janeiro 2023",
    title: "Primeiro Encontro",
    description: "O dia em que nossos olhares se cruzaram pela primeira vez",
    icon: "✨",
  },
  {
    date: "Março 2023",
    title: "Primeira Viagem",
    description: "Nossa primeira aventura juntos, criando memórias inesquecíveis",
    icon: "✈️",
  },
  {
    date: "Junho 2023",
    title: "Aniversário de Namoro",
    description: "Celebrando nosso amor e tudo que construímos juntos",
    icon: "🎉",
  },
  {
    date: "Hoje",
    title: "Nossa História Continua",
    description: "Cada dia ao seu lado é um novo capítulo cheio de amor",
    icon: "💕",
  },
]

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])])
            }
          })
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <section className="py-24 px-4 bg-muted/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance mb-4">Nossa Linha do Tempo</h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Momentos especiais que marcaram nossa jornada juntos
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border hidden md:block" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                className={`relative transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 md:text-right" style={{ textAlign: index % 2 === 0 ? "left" : "right" }}>
                    <div className="bg-card p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
                      <div className="text-sm text-primary font-medium mb-2">{event.date}</div>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-pretty">{event.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl shadow-lg border-4 border-background">
                      {event.icon}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
