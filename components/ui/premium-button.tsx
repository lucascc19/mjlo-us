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
  const baseStyles = "relative overflow-hidden font-medium transition-all duration-300 rounded-full group disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-romantic-pink to-romantic-purple text-white hover:shadow-2xl hover:scale-105 active:scale-95",
    secondary: "bg-romantic-lavender/20 text-romantic-purple border-2 border-romantic-purple/30 hover:bg-romantic-lavender/30 hover:scale-105 active:scale-95",
    glass: "glass text-foreground hover:bg-white/20 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
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
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute inset-0 animate-shimmer" />
      </span>
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="transition-transform group-hover:scale-110 duration-300">{icon}</span>}
        {children}
      </span>
      
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-xl bg-linear-to-r from-romantic-pink to-romantic-purple transition-opacity duration-500 -z-10" />
      )}
    </button>
  )
}
