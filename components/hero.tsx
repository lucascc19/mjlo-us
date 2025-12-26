"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { PremiumButton } from "./ui/premium-button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref, isVisible } = useScrollAnimation()
  const { scrollToSection } = useSmoothScroll()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 gradient-romantic animate-gradient opacity-30" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-40 animate-float-smooth"
          style={{
            background: "radial-gradient(circle, var(--romantic-pink) 0%, transparent 70%)",
            top: "10%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-40 animate-float-smooth"
          style={{
            background: "radial-gradient(circle, var(--romantic-purple) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
            animationDelay: "2s",
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-30 animate-float-smooth"
          style={{
            background: "radial-gradient(circle, var(--romantic-gold) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            animationDelay: "4s",
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      </div>

      <div
        ref={ref}
        className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-8 inline-block animate-scale-in-bounce">
          <div className="relative">
            <Heart className="w-20 h-20 md:w-28 md:h-28 text-romantic-pink fill-romantic-pink animate-glow" />
            <div className="absolute inset-0 blur-xl bg-romantic-pink opacity-50 animate-pulse" />
          </div>
        </div>

        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight animate-fade-in-down"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Nossa História
          <span className="block gradient-text mt-4">de Amor</span>
        </h1>

        <p 
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          Cada momento ao seu lado é uma página escrita no livro da nossa vida.
        </p>
        
        <p 
          className="text-lg md:text-xl gradient-text font-medium mb-12 animate-fade-in-up"
          style={{ 
            animationDelay: "0.4s", 
            opacity: 0, 
            animationFillMode: "forwards",
            fontFamily: "var(--font-cursive)"
          }}
        >
          Este é o nosso espaço especial para celebrar nosso amor
        </p>

        <div 
          className="flex gap-4 justify-center flex-wrap animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
        >
          <PremiumButton 
            variant="primary" 
            size="lg"
            glow
            onClick={() => scrollToSection("gallery")}
            icon={<Heart className="w-5 h-5" />}
          >
            Ver Nossas Fotos
          </PremiumButton>
          
          <PremiumButton 
            variant="glass" 
            size="lg"
            onClick={() => scrollToSection("timeline")}
          >
            Nossa Timeline
          </PremiumButton>
        </div>

        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-romantic-pink/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 rounded-full bg-romantic-pink animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
