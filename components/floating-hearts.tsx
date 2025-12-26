"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  color: string
}

const romanticColors = [
  "var(--romantic-pink)",
  "var(--romantic-purple)",
  "var(--romantic-coral)",
  "var(--romantic-rose)",
  "var(--romantic-lavender)",
]

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const newHearts: Heart[] = []
    for (let i = 0; i < 15; i++) {
      newHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        size: 20 + Math.random() * 20,
        color: romanticColors[Math.floor(Math.random() * romanticColors.length)],
      })
    }
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 opacity-30"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            animation: "float-up linear infinite",
          }}
        >
          <svg 
            width={heart.size} 
            height={heart.size} 
            fill={heart.color}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
