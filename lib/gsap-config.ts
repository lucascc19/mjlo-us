// Configurações de easing comuns
export const GSAP_EASE = {
  SMOOTH: "power2.out",
  SMOOTH_IN: "power2.in",
  SMOOTH_IN_OUT: "power2.inOut",
  ELASTIC: "elastic.out(1, 0.5)",
  BACK: "back.out(1.7)",
  BACK_STRONG: "back.out(2)",
  POWER3_OUT: "power3.out",
  POWER3_IN: "power3.in",
  POWER3_IN_OUT: "power3.inOut",
} as const

// Durações de animação (em segundos)
export const GSAP_DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  MEDIUM: 0.8,
  SLOW: 1,
  VERY_SLOW: 1.2,
} as const

// Configurações de ScrollTrigger reutilizáveis
export const SCROLL_TRIGGER_PRESETS = {
  fadeInUp: {
    start: "top 80%",
    toggleActions: "play none none none",
  },
  fadeInCards: {
    start: "top 75%",
    toggleActions: "play none none none",
  },
  fadeInTimeline: {
    start: "top 85%",
    toggleActions: "play none none none",
  },
} as const

// Animações pré-configuradas comuns
export const GSAP_ANIMATIONS = {
  fadeInUp: (delay: number = 0) => ({
    y: 40,
    opacity: 0,
    duration: GSAP_DURATION.MEDIUM,
    ease: GSAP_EASE.SMOOTH,
    delay,
  }),

  fadeInDown: (delay: number = 0) => ({
    y: -40,
    opacity: 0,
    duration: GSAP_DURATION.MEDIUM,
    ease: GSAP_EASE.SMOOTH,
    delay,
  }),

  fadeIn: (delay: number = 0) => ({
    opacity: 0,
    duration: GSAP_DURATION.NORMAL,
    ease: GSAP_EASE.SMOOTH,
    delay,
  }),

  scaleIn: (delay: number = 0) => ({
    scale: 0,
    opacity: 0,
    duration: GSAP_DURATION.NORMAL,
    ease: GSAP_EASE.BACK,
    delay,
  }),

  slideInLeft: (distance: number = 50, delay: number = 0) => ({
    x: -distance,
    opacity: 0,
    duration: GSAP_DURATION.MEDIUM,
    ease: GSAP_EASE.BACK_STRONG,
    delay,
  }),

  slideInRight: (distance: number = 50, delay: number = 0) => ({
    x: distance,
    opacity: 0,
    duration: GSAP_DURATION.MEDIUM,
    ease: GSAP_EASE.BACK_STRONG,
    delay,
  }),
} as const

// Configuração de stagger para animações em sequência
export const GSAP_STAGGER = {
  FAST: 0.05,
  NORMAL: 0.1,
  SLOW: 0.15,
  VERY_SLOW: 0.2,
} as const
