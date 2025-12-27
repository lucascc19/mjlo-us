"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  gradient = false 
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 relative",
        hover && "transition-all duration-300 hover:scale-105 hover:shadow-2xl hover-lift",
        gradient && "before:absolute before:inset-0 before:rounded-3xl before:bg-linear-to-br before:from-romantic-pink/10 before:to-romantic-purple/10 before:-z-10",
        className
      )}
    >
      {children}
    </div>
  )
}
