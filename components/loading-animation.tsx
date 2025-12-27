"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function LoadingAnimation() {
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const mjRef = useRef<HTMLSpanElement>(null)
  const infinityRef = useRef<HTMLSpanElement>(null)
  const loRef = useRef<HTMLSpanElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(infinityRef.current, { opacity: 0, scale: 0, rotation: -180 })
      gsap.set(loRef.current, { opacity: 0, x: 100, scale: 0.5 })
      gsap.set(mjRef.current, { opacity: 0, x: -100, scale: 0.5 })
      gsap.set(textContainerRef.current, { scale: 0.8 })

      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setIsComplete(true), 100)
        },
      })

      tl.to(mjRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      })

      tl.to(
        textContainerRef.current,
        {
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )

      tl.to(
        infinityRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(2)",
        },
        "-=0.3"
      )

      tl.to(
        [mjRef.current, infinityRef.current],
        {
          x: -30,
          duration: 0.6,
          ease: "power3.inOut",
        },
        "+=0.3"
      )

      tl.to(
        loRef.current,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.4"
      )

      tl.to(
        [mjRef.current, infinityRef.current, loRef.current],
        {
          x: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.3"
      )

      tl.to(textContainerRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      })

      tl.to(
        mjRef.current,
        {
          x: -200,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        },
        "+=0.2"
      )

      tl.to(
        infinityRef.current,
        {
          scale: 2,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.5"
      )

      tl.to(
        loRef.current,
        {
          x: 200,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in",
        },
        "-=0.6"
      )

      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
    })

    return () => ctx.revert()
  }, [])

  if (isComplete) return null

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
      >
        {/* Vinheta com cor primária */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 200px hsl(var(--primary) / 0.15)",
          }}
        />

        {/* Granulado intenso estilo Mars */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
          <defs>
            <filter id="loading-grain-intense">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.5"
                numOctaves="6"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#loading-grain-intense)" />
        </svg>

        {/* Card glassmorphism */}
        <div ref={textContainerRef} className="relative flex items-center justify-center gap-4">
          <span
            ref={mjRef}
            className="text-7xl md:text-8xl font-bold text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            mj
          </span>

          <span
            ref={infinityRef}
            className="text-7xl md:text-8xl font-bold text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ∞
          </span>

          <span
            ref={loRef}
            className="text-7xl md:text-8xl font-bold text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            lo
          </span>
        </div>
      </div>
    </>
  )
}
