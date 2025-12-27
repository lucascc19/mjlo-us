"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function FloatingDoodles() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const strokeColor = resolvedTheme === "dark" 
    ? "rgba(139, 92, 246, 0.3)" 
    : "rgba(236, 72, 153, 0.3)"
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="absolute top-[15%] right-[10%] animate-float-smooth opacity-30"
        style={{ animationDelay: "0s", animationDuration: "8s" }}
      >
        <path
          d="M20 5L25 15L35 20L25 25L20 35L15 25L5 20L15 15L20 5Z"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        className="absolute top-[25%] left-[8%] animate-float opacity-25"
        style={{ animationDelay: "1s", animationDuration: "10s" }}
      >
        <circle cx="25" cy="25" r="20" stroke={strokeColor} strokeWidth="2" fill="none" strokeDasharray="3 3" />
      </svg>

      <svg
        width="60"
        height="30"
        viewBox="0 0 60 30"
        className="absolute top-[40%] right-[15%] animate-float-smooth opacity-20"
        style={{ animationDelay: "2s", animationDuration: "12s" }}
      >
        <path
          d="M5 15C15 10 25 20 35 15C45 10 55 15 55 15"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        className="absolute bottom-[30%] left-[12%] animate-float opacity-30"
        style={{ animationDelay: "3s", animationDuration: "9s" }}
      >
        <rect x="5" y="5" width="25" height="25" stroke={strokeColor} strokeWidth="2" fill="none" rx="5" />
      </svg>

      <svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        className="absolute bottom-[20%] right-[20%] animate-float-smooth opacity-25"
        style={{ animationDelay: "1.5s", animationDuration: "11s" }}
      >
        <polygon
          points="22.5,5 30,18 45,22.5 30,27 22.5,40 15,27 0,22.5 15,18"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        className="absolute top-[60%] left-[5%] animate-float opacity-20"
        style={{ animationDelay: "2.5s", animationDuration: "10s" }}
      >
        <path
          d="M15 5L20 12L28 15L20 18L15 25L10 18L2 15L10 12L15 5Z"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="absolute top-[70%] right-[8%] animate-float-smooth opacity-25"
        style={{ animationDelay: "0.5s", animationDuration: "13s" }}
      >
        <path
          d="M20 5C20 5 10 10 10 20C10 30 20 35 20 35C20 35 30 30 30 20C30 10 20 5 20 5Z"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        width="50"
        height="25"
        viewBox="0 0 50 25"
        className="absolute bottom-[40%] right-[5%] animate-float opacity-20"
        style={{ animationDelay: "3.5s", animationDuration: "14s" }}
      >
        <path
          d="M5 12C10 8 15 16 20 12C25 8 30 16 35 12C40 8 45 12 45 12M40 8L45 12L40 16"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        className="absolute top-[50%] right-[25%] animate-float-smooth opacity-30"
        style={{ animationDelay: "4s", animationDuration: "15s" }}
      >
        <circle cx="17.5" cy="17.5" r="12" stroke={strokeColor} strokeWidth="2" fill="none" />
        <circle cx="17.5" cy="17.5" r="5" stroke={strokeColor} strokeWidth="2" fill="none" />
      </svg>

      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        className="absolute bottom-[50%] left-[20%] animate-float opacity-25"
        style={{ animationDelay: "1.2s", animationDuration: "11s" }}
      >
        <path
          d="M5 15L15 5L25 15L15 25L5 15Z"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  )
}
