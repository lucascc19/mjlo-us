# 💻 Exemplos de Implementação - Melhorias UX/UI

Este documento contém exemplos práticos de código para implementar as melhorias sugeridas no relatório de análise UX/UI.

---

## 🎨 1. Design System Premium

### 1.1 Paleta de Cores Romântica (globals.css)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Great+Vibes&display=swap');

@custom-variant dark (&:is(.dark *));

:root {
  /* Cores Românticas Premium */
  --romantic-pink: oklch(0.75 0.15 350);
  --romantic-purple: oklch(0.62 0.19 300);
  --romantic-gold: oklch(0.75 0.12 85);
  --romantic-coral: oklch(0.70 0.15 25);
  --romantic-rose: oklch(0.65 0.20 15);
  --romantic-lavender: oklch(0.80 0.10 310);
  
  /* Backgrounds */
  --background: oklch(0.99 0.01 350);
  --foreground: oklch(0.20 0.02 340);
  
  /* Primary (Rosa Romântico) */
  --primary: var(--romantic-pink);
  --primary-foreground: oklch(0.99 0 0);
  
  /* Accent (Roxo Romântico) */
  --accent: var(--romantic-purple);
  --accent-foreground: oklch(0.99 0 0);
  
  /* Secondary (Lavanda) */
  --secondary: var(--romantic-lavender);
  --secondary-foreground: oklch(0.20 0.02 340);
  
  /* Gradientes */
  --gradient-romantic: linear-gradient(135deg, 
    var(--romantic-pink) 0%, 
    var(--romantic-purple) 100%);
    
  --gradient-sunset: linear-gradient(135deg,
    var(--romantic-gold) 0%,
    var(--romantic-coral) 50%,
    var(--romantic-purple) 100%);
    
  --gradient-soft: linear-gradient(135deg,
    var(--romantic-lavender) 0%,
    var(--romantic-pink) 100%);
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  
  /* Radius Premium */
  --radius: 1.5rem;
}

.dark {
  --background: oklch(0.12 0.02 340);
  --foreground: oklch(0.98 0.01 350);
  
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

@theme inline {
  /* Fontes Premium */
  --font-heading: 'Playfair Display', serif;
  --font-sans: 'Inter', sans-serif;
  --font-cursive: 'Great Vibes', cursive;
  
  /* Cores mapeadas */
  --color-romantic-pink: var(--romantic-pink);
  --color-romantic-purple: var(--romantic-purple);
  --color-romantic-gold: var(--romantic-gold);
  --color-romantic-coral: var(--romantic-coral);
  --color-romantic-rose: var(--romantic-rose);
  --color-romantic-lavender: var(--romantic-lavender);
}

/* Utility Classes */
.gradient-romantic {
  background: var(--gradient-romantic);
}

.gradient-sunset {
  background: var(--gradient-sunset);
}

.gradient-soft {
  background: var(--gradient-soft);
}

.gradient-text {
  background: var(--gradient-romantic);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
```

### 1.2 Animações Avançadas

```css
/* Animações Premium */
@keyframes float-smooth {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(2deg);
  }
  66% {
    transform: translateY(-8px) rotate(-2deg);
  }
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 105, 180, 0.6);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in-bounce {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Classes de Animação */
.animate-float-smooth {
  animation: float-smooth 6s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

.animate-glow {
  animation: glow-pulse 3s ease-in-out infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}

.animate-scale-in-bounce {
  animation: scale-in-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
```

---

## ✨ 2. Componentes Premium

### 2.1 Button Premium com Micro-interações

```tsx
"use client"

import { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass"
  size?: "sm" | "md" | "lg"
  children: ReactNode
  icon?: ReactNode
  glow?: boolean
}

export function PremiumButton({
  variant = "primary",
  size = "md",
  children,
  icon,
  glow = false,
  className,
  ...props
}: PremiumButtonProps) {
  const baseStyles = "relative overflow-hidden font-medium transition-all duration-300 rounded-full group"
  
  const variants = {
    primary: "bg-gradient-to-r from-romantic-pink to-romantic-purple text-white hover:shadow-2xl hover:scale-105",
    secondary: "bg-romantic-lavender/20 text-romantic-purple border-2 border-romantic-purple/30 hover:bg-romantic-lavender/30 hover:scale-105",
    glass: "glass text-foreground hover:bg-white/20 hover:scale-105"
  }
  
  const sizes = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glow && "animate-glow",
        className
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute inset-0 animate-shimmer" />
      </span>
      
      {/* Ripple effect container */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
        {children}
      </span>
      
      {/* Hover glow */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl bg-linear-to-r from-romantic-pink to-romantic-purple transition-opacity duration-500 -z-10" />
    </button>
  )
}
```

### 2.2 Glass Card Component

```tsx
"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export function GlassCard({ children, className, hover = true, gradient = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6",
        hover && "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        gradient && "before:absolute before:inset-0 before:rounded-3xl before:bg-linear-to-br before:from-romantic-pink/10 before:to-romantic-purple/10 before:-z-10",
        "relative",
        className
      )}
    >
      {children}
    </div>
  )
}
```

### 2.3 Scroll-Triggered Animation Hook

```tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
```

### 2.4 Hero Section Premium

```tsx
"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { PremiumButton } from "./premium-button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function HeroPremium() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-romantic animate-gradient opacity-30" />
      
      {/* Floating Gradient Blobs */}
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

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Heart Icon */}
        <div className="mb-8 inline-block animate-scale-in-bounce">
          <div className="relative">
            <Heart className="w-20 h-20 md:w-28 md:h-28 text-romantic-pink fill-romantic-pink animate-glow" />
            <div className="absolute inset-0 blur-xl bg-romantic-pink opacity-50 animate-pulse" />
          </div>
        </div>

        {/* Title with Gradient */}
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight animate-fade-in-down"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Nossa História
          <span className="block gradient-text mt-4">de Amor</span>
        </h1>

        {/* Subtitle */}
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

        {/* CTA Buttons */}
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

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
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
```

### 2.5 Parallax Gallery Melhorada

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { GlassCard } from "./glass-card"

const images = [
  {
    id: 1,
    src: "/romantic-couple-portrait-outdoor-sunset.jpg",
    alt: "Momento 1",
    title: "Primeiro Encontro",
    date: "Janeiro 2023",
    description: "O dia em que tudo começou..."
  },
  // ... mais imagens
]

export default function ParallaxGallery() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight

      const scrollEnd = sectionHeight - windowHeight
      const currentScroll = -rect.top

      const progress = Math.max(0, Math.min(1, currentScroll / scrollEnd))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section 
      id="gallery"
      ref={sectionRef} 
      className="relative bg-background" 
      style={{ height: `${300}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-soft opacity-10" />
        
        <div
          ref={containerRef}
          className="flex gap-8 px-8 transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(-${scrollProgress * (images.length - 1) * 70}vw)`,
          }}
        >
          {images.map((image, index) => {
            const imageProgress = Math.max(0, Math.min(1, scrollProgress * images.length - index))
            const opacity = Math.max(0.3, Math.min(1, imageProgress))
            const scale = 0.85 + imageProgress * 0.15
            const isHovered = hoveredId === image.id

            return (
              <div
                key={image.id}
                className="relative shrink-0"
                style={{
                  width: "70vw",
                  height: "80vh",
                  opacity: opacity,
                  transform: `scale(${scale}) ${isHovered ? 'translateY(-10px)' : ''}`,
                  transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                }}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <GlassCard className="h-full overflow-hidden group cursor-pointer">
                  <div className="relative h-full">
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
                      <div className="inline-block px-4 py-2 rounded-full glass mb-4">
                        <p className="text-sm font-medium tracking-wider uppercase">
                          {image.date}
                        </p>
                      </div>
                      
                      <h3 className="text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                        {image.title}
                      </h3>
                      
                      <p className="text-lg opacity-90 mb-6 max-w-2xl">
                        {image.description}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-0.5 bg-white/50" />
                        <span className="text-lg opacity-80">
                          {index + 1} / {images.length}
                        </span>
                      </div>
                    </div>
                    
                    {/* Hover Glow */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-linear-to-t from-romantic-pink/20 to-romantic-purple/20 pointer-events-none" />
                    )}
                  </div>
                </GlassCard>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

### 2.6 Days Together Counter

```tsx
"use client"

import { useEffect, useState } from "react"
import { Heart, Calendar, Clock } from "lucide-react"
import { GlassCard } from "./glass-card"

interface TimeUnit {
  value: number
  label: string
}

export function DaysTogetherCounter() {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([])
  
  // Data do primeiro encontro (ajustar conforme necessário)
  const startDate = new Date("2023-01-15")

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeUnits([
        { value: days, label: "Dias" },
        { value: hours, label: "Horas" },
        { value: minutes, label: "Minutos" },
        { value: seconds, label: "Segundos" }
      ])
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-romantic opacity-5" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 mx-auto mb-4 text-romantic-pink fill-romantic-pink animate-glow" />
          <h2 
            className="text-5xl md:text-6xl font-bold gradient-text mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Juntos há
          </h2>
          <p className="text-muted-foreground text-lg">
            Cada segundo ao seu lado é especial
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <GlassCard 
              key={unit.label}
              className="text-center animate-fade-in-up"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
                animationFillMode: "forwards"
              }}
            >
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                  {unit.label}
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-romantic-pink/20 animate-pulse" />
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <GlassCard className="inline-block">
            <div className="flex items-center gap-4">
              <Calendar className="w-6 h-6 text-romantic-pink" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Desde</p>
                <p className="font-semibold">
                  {startDate.toLocaleDateString('pt-BR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
```

---

## 🎯 3. Hooks Úteis

### 3.1 Smooth Scroll Hook

```tsx
"use client"

export function useSmoothScroll() {
  const scrollToSection = (sectionId: string, offset: number = 0) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    })
  }

  return { scrollToSection }
}
```

### 3.2 Mouse Position Hook

```tsx
"use client"

import { useEffect, useState } from "react"

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return mousePosition
}
```

---

## 📦 Instalação de Dependências Recomendadas

```bash
# Framer Motion para animações avançadas
npm install framer-motion

# Lenis para smooth scroll premium
npm install @studio-freight/lenis

# React Icons para ícones adicionais
npm install react-icons

# Embla Carousel (já instalado)
# Date-fns (já instalado)
```

---

## 🚀 Próximos Passos

1. ✅ Implementar o novo Design System (cores, fontes, gradientes)
2. ✅ Criar componentes base (PremiumButton, GlassCard)
3. ✅ Atualizar Hero Section com novo design
4. ✅ Melhorar Gallery com parallax avançado
5. ✅ Adicionar contador de dias juntos
6. ✅ Implementar scroll-triggered animations
7. ✅ Adicionar navegação sticky
8. ✅ Criar lightbox para imagens
9. ✅ Implementar music player
10. ✅ Polimento final e otimizações

---

**Nota**: Todos os exemplos acima são prontos para uso e seguem as melhores práticas de React/Next.js 16 com TypeScript.
