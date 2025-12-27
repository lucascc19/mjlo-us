"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { CoupleAssets } from "./couple-assets"

export function MinimalistBackground() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-[#030917]" : "bg-linear-to-br from-purple-50 via-pink-50 to-purple-100"
        }`}
      />

      {isDark && (
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 200px rgba(0, 102, 255, 0.15)",
          }}
        />
      )}

      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        <defs>
          <filter id="grain-intense">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.5"
              numOctaves="6"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#grain-intense)" />
      </svg>

      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-30 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(0, 102, 255, 0.6) 0%, rgba(56, 189, 248, 0.4) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.5) 0%, rgba(168, 85, 247, 0.3) 40%, transparent 70%)",
          top: "10%",
          left: "5%",
          animation: "float-diagonal 15s ease-in-out infinite",
        }}
      />

      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(0, 102, 255, 0.3) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(236, 72, 153, 0.25) 40%, transparent 70%)",
          bottom: "10%",
          right: "10%",
          animation: "float-diagonal-reverse 18s ease-in-out infinite",
        }}
      />

      <svg className="absolute inset-0 w-full h-full" style={{ opacity: isDark ? 0.06 : 0.12 }}>
        <line
          x1="10%"
          y1="15%"
          x2="15%"
          y2="18%"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="15%"
          y1="18%"
          x2="12%"
          y2="22%"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <circle
          cx="85%"
          cy="12%"
          r="15"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="3 3"
        />

        <path
          d="M 20% 80% Q 22% 78%, 24% 80%"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        <line
          x1="75%"
          y1="85%"
          x2="80%"
          y2="82%"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="80%"
          y1="82%"
          x2="78%"
          y2="88%"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <rect
          x="45%"
          y="8%"
          width="25"
          height="25"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          fill="none"
          transform="rotate(15 45 8)"
        />

        <circle
          cx="15%"
          cy="45%"
          r="12"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          fill="none"
        />

        <path
          d="M 88% 50% L 92% 48% L 90% 52% L 94% 51%"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line
          x1="50%"
          y1="92%"
          x2="52%"
          y2="95%"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <circle
          cx="30%"
          cy="25%"
          r="8"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="2 2"
        />

        <path
          d="M 65% 70% Q 67% 72%, 69% 70% T 73% 70%"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        <line
          x1="8%"
          y1="65%"
          x2="12%"
          y2="68%"
          stroke={isDark ? "#0066FF" : "#ec4899"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <rect
          x="92%"
          y="75%"
          width="18"
          height="18"
          stroke={isDark ? "#38BDF8" : "#f472b6"}
          strokeWidth="1.5"
          fill="none"
          rx="3"
        />
      </svg>

      <CoupleAssets />
    </div>
  )
}
