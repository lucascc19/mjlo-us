"use client"

import { useEffect, useState, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTimeElapsed } from "@/hooks/use-time-elapsed"
import { GSAP_ANIMATIONS, GSAP_DURATION, GSAP_EASE, SCROLL_TRIGGER_PRESETS } from "@/lib/gsap-config"
import { COUNTER_CONFIG, SCROLL_CONFIG } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

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
        duration: COUNTER_CONFIG.ANIMATION_DURATION / 1000,
        ease: GSAP_EASE.SMOOTH,
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
  const [mounted, setMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const borderRef = useRef<SVGSVGElement>(null)
  
  // Usa hook customizado - só calcula quando está visível para otimizar performance
  const timeElapsed = useTimeElapsed(startDate, isInView)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            ...SCROLL_TRIGGER_PRESETS.fadeInUp,
            onEnter: () => setIsInView(true),
          },
          ...GSAP_ANIMATIONS.fadeInUp(0),
          y: 30,
          duration: GSAP_DURATION.MEDIUM,
        })
      }

      if (borderRef.current) {
        gsap.from(borderRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            ...SCROLL_TRIGGER_PRESETS.fadeInUp,
          },
          scale: 0.95,
          opacity: 0,
          duration: GSAP_DURATION.SLOW,
          ease: "back.out(1.2)",
          delay: 0.2,
        })
      }

      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            ...SCROLL_TRIGGER_PRESETS.fadeInUp,
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: GSAP_EASE.SMOOTH,
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
          ...GSAP_ANIMATIONS.slideInLeft(50, 0.6),
          stagger: 0.1,
          ease: "back.out(1.4)",
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
