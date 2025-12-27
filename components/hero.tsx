"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface HeroProps {
  onTitleClick?: () => void
}

export default function Hero({ onTitleClick }: HeroProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div
        ref={ref}
        className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight animate-fade-in-down cursor-pointer select-none"
          style={{ fontFamily: "var(--font-heading)" }}
          onClick={onTitleClick}
        >
          Nossa História
        </h1>

        <p
          className="text-base md:text-lg text-muted-foreground/60 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          Cada momento ao seu lado é uma página escrita no livro da nossa vida.
        </p>
      </div>
    </section>
  )
}
