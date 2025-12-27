"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TimeElapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface DaysTogetherCounterProps {
  startDate: Date
  yourName?: string
  partnerName?: string
}

interface AnimatedNumberProps {
  value: number
  label: string
  index: number
}

function AnimatedNumber({ value, label, index }: AnimatedNumberProps) {
  const numberRef = useRef<HTMLDivElement>(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!numberRef.current) return

    gsap.to(
      { val: displayValue },
      {
        val: value,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function () {
          setDisplayValue(Math.round(this.targets()[0].val))
        },
      }
    )
  }, [value, displayValue])

  return (
    <div className="space-y-2 overflow-hidden counter-card" data-index={index}>
      <div className="relative h-12 md:h-16">
        <div
          ref={numberRef}
          className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-foreground/90 tabular-nums"
        >
          {displayValue}
        </div>
      </div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  )
}

export function DaysTogetherCounter({
  startDate,
  yourName = "Nós",
  partnerName,
}: DaysTogetherCounterProps) {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const borderRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    setMounted(true)

    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
      const years = Math.floor(totalDays / 365)
      const months = Math.floor((totalDays % 365) / 30)
      const days = Math.floor((totalDays % 365) % 30)
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeElapsed({ years, months, days, hours, minutes, seconds })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => setIsInView(true),
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
      }

      if (borderRef.current) {
        gsap.from(borderRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.2)",
          delay: 0.2,
        })
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
        })
      }

      const cards = containerRef.current?.querySelectorAll(".counter-card")
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
          delay: 0.6,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div ref={containerRef} className="text-center max-w-5xl mx-auto">
      <h3
        ref={titleRef}
        className="text-lg md:text-xl text-muted-foreground/60 mb-8 uppercase tracking-widest"
      >
        {partnerName ? `${yourName} & ${partnerName}` : yourName}
      </h3>

      <div className="relative p-8 md:p-12">
        <svg
          ref={borderRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
        >
          <rect
            x="2"
            y="2"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground/20"
            rx="24"
            style={{
              strokeDasharray: "5 3",
              strokeLinecap: "round",
            }}
          />
        </svg>

        <p
          ref={subtitleRef}
          className="text-sm text-muted-foreground mb-8 uppercase tracking-wider"
        >
          Estamos juntos há
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          <AnimatedNumber
            value={isInView ? timeElapsed.years : 0}
            label={timeElapsed.years === 1 ? "Ano" : "Anos"}
            index={0}
          />
          <AnimatedNumber
            value={isInView ? timeElapsed.months : 0}
            label={timeElapsed.months === 1 ? "Mês" : "Meses"}
            index={1}
          />
          <AnimatedNumber value={isInView ? timeElapsed.days : 0} label="Dias" index={2} />
          <AnimatedNumber value={isInView ? timeElapsed.hours : 0} label="Horas" index={3} />
          <AnimatedNumber value={isInView ? timeElapsed.minutes : 0} label="Minutos" index={4} />
          <AnimatedNumber value={isInView ? timeElapsed.seconds : 0} label="Segundos" index={5} />
        </div>
      </div>
    </div>
  )
}
