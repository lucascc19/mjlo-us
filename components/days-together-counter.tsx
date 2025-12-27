"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
}

function AnimatedNumber({ value, label }: AnimatedNumberProps) {
  return (
    <div className="space-y-2 overflow-hidden">
      <div className="relative h-12 md:h-16">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-bold text-foreground/90 tabular-nums"
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-xs text-muted-foreground/50 uppercase tracking-wider">{label}</div>
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

  if (!mounted) {
    return null
  }

  return (
    <div className="text-center max-w-5xl mx-auto">
      <h3 className="text-lg md:text-xl text-muted-foreground/60 mb-8 uppercase tracking-widest">
        {partnerName ? `${yourName} & ${partnerName}` : yourName}
      </h3>

      <div className="relative p-8 md:p-12">
        <svg
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

        <p className="text-sm text-muted-foreground/50 mb-8 uppercase tracking-wider">
          Estamos juntos há
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          <AnimatedNumber
            value={timeElapsed.years}
            label={timeElapsed.years === 1 ? "Ano" : "Anos"}
          />
          <AnimatedNumber
            value={timeElapsed.months}
            label={timeElapsed.months === 1 ? "Mês" : "Meses"}
          />
          <AnimatedNumber value={timeElapsed.days} label="Dias" />
          <AnimatedNumber value={timeElapsed.hours} label="Horas" />
          <AnimatedNumber value={timeElapsed.minutes} label="Minutos" />
          <AnimatedNumber value={timeElapsed.seconds} label="Segundos" />
        </div>
      </div>
    </div>
  )
}
