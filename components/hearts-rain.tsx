"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FallingHeart {
  id: number
  left: number
  animationDuration: number
  size: number
  delay: number
}

export function HeartsRain() {
  const [hearts, setHearts] = useState<FallingHeart[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return

    const newHearts: FallingHeart[] = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 3,
      size: 20 + Math.random() * 30,
      delay: Math.random() * 0.5,
    }))

    setHearts(newHearts)

    const timeout = setTimeout(() => {
      setIsActive(false)
      setHearts([])
    }, 5000)

    return () => clearTimeout(timeout)
  }, [isActive])

  const triggerRain = () => {
    setIsActive(true)
  }

  useEffect(() => {
    const handleKeySequence = (e: KeyboardEvent) => {
      if (e.key === "h" && e.ctrlKey && e.shiftKey) {
        triggerRain()
      }
    }

    window.addEventListener("keydown", handleKeySequence)
    return () => window.removeEventListener("keydown", handleKeySequence)
  }, [])

  return (
    <>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute animate-fall"
              style={{
                left: `${heart.left}%`,
                top: "-50px",
                animationDuration: `${heart.animationDuration}s`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              <Heart
                className="text-romantic-pink fill-romantic-pink opacity-80"
                style={{
                  width: `${heart.size}px`,
                  height: `${heart.size}px`,
                  filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.5))",
                }}
              />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </>
  )
}

export function useHeartsRain() {
  const [trigger, setTrigger] = useState(0)

  const triggerHeartsRain = () => {
    setTrigger((prev) => prev + 1)
  }

  return { trigger, triggerHeartsRain }
}
