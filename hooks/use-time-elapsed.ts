import { useState, useEffect } from "react"
import type { TimeElapsed } from "@/types/time"
import { COUNTER_CONFIG } from "@/lib/constants"

/**
 * Hook para calcular o tempo decorrido desde uma data inicial
 * Atualiza automaticamente a cada segundo
 *
 * @param startDate - Data inicial para calcular o tempo decorrido
 * @param isActive - Se false, pausa o cálculo (útil para performance quando não visível)
 * @returns TimeElapsed object com anos, meses, dias, horas, minutos e segundos
 */

export function useTimeElapsed(startDate: Date, isActive: boolean = true): TimeElapsed {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!isActive) return

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
    const interval = setInterval(calculateTime, COUNTER_CONFIG.UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [startDate, isActive])

  return timeElapsed
}
