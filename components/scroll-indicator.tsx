"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const fadeStart = 0
      const fadeEnd = windowHeight * 0.5

      if (scrolled <= fadeStart) {
        setOpacity(1)
      } else if (scrolled >= fadeEnd) {
        setOpacity(0)
      } else {
        const fadeProgress = scrolled / fadeEnd
        setOpacity(1 - fadeProgress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
        <ChevronDown
          className="w-6 h-6 text-muted-foreground/60 animate-bounce-slow"
          strokeWidth={1.5}
        />
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent" />
      </div>
    </div>
  )
}
