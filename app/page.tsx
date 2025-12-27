"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import ScrollGallery from "@/components/scroll-gallery"
import TimelineWithImages from "@/components/timeline-with-images"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { DaysTogetherCounter } from "@/components/days-together-counter"
import { PolaroidGallery } from "@/components/polaroid-gallery"
import { HeartsRain } from "@/components/hearts-rain"
import { LoadingAnimation } from "@/components/loading-animation"
import { MinimalistBackground } from "@/components/minimalist-background"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollIndicator } from "@/components/scroll-indicator"

export default function Home() {
  const [clickCount, setClickCount] = useState(0)
  const [showHearts, setShowHearts] = useState(false)

  const handleTitleClick = () => {
    setClickCount((prev) => prev + 1)
    if (clickCount + 1 === 3) {
      setShowHearts(true)
      setClickCount(0)
      setTimeout(() => setShowHearts(false), 5000)
    }
  }

  useEffect(() => {
    const resetTimer = setTimeout(() => setClickCount(0), 2000)
    return () => clearTimeout(resetTimer)
  }, [clickCount])

  const startDate = new Date("2024-08-27")

  return (
    <main className="min-h-screen relative">
      <SmoothScroll />
      <CustomCursor />
      <ScrollIndicator />
      <MinimalistBackground />
      <LoadingAnimation />
      <ThemeToggle />
      {showHearts && <HeartsRain />}
      <Hero onTitleClick={handleTitleClick} />

      <section className="py-20 px-4">
        <DaysTogetherCounter startDate={startDate} yourName="Lucas" partnerName="Maju" />
      </section>

      <ScrollGallery />
      <TimelineWithImages />
    </main>
  )
}
