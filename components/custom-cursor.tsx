"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(hasTouchScreen || isSmallScreen)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updatePosition)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isMobile])

  if (!isVisible || isMobile) return null

  return (
    <>
      <div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-9999 mix-blend-screen transition-transform duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(0, 102, 255, 0.4) 0%, rgba(56, 189, 248, 0.2) 50%, transparent 100%)",
        }}
      />
      <div
        className="fixed w-2 h-2 rounded-full pointer-events-none z-9999 bg-cyan-400"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}
