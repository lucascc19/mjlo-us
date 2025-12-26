"use client"

import { useEffect, useState } from "react"

export default function LoveMessage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    const element = document.getElementById("love-message")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="love-message"
      className="py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-10 right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      />

      <div
        className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-8">
          <svg className="w-20 h-20 mx-auto text-accent animate-pulse-slow" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-balance mb-8 leading-tight">Para o Amor da Minha Vida</h2>

        <div className="bg-card/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-border">
          <p className="text-lg md:text-xl text-pretty leading-relaxed mb-6">
            Cada momento ao seu lado é uma bênção. Você ilumina meus dias, aquece meu coração e faz da vida uma aventura
            incrível.
          </p>
          <p className="text-lg md:text-xl text-pretty leading-relaxed mb-6">
            Obrigado por ser meu porto seguro, minha melhor amiga, minha parceira de vida. Com você, descobri o
            verdadeiro significado de amar e ser amado.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-primary">Te amo hoje, amanhã e para sempre ❤️</p>
        </div>

        <div className="mt-12 flex gap-3 justify-center flex-wrap">
          {["💕", "✨", "🌟", "💖", "🌹"].map((emoji, index) => (
            <div key={index} className="text-4xl animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
