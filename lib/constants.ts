// Breakpoints
export const MOBILE_BREAKPOINT = 768

// Aspect Ratios para Media
export const ASPECT_RATIOS = {
  PORTRAIT: "3/4",
  LANDSCAPE: "16/9",
  STANDARD: "4/3",
  SQUARE: "1/1",
} as const

// Altura dos containers de media baseado no aspect ratio
export const MEDIA_HEIGHTS = {
  "3/4": "533px",
  "16/9": "225px",
  "4/3": "300px",
  "1/1": "400px",
} as const

// Configurações de animação
export const ANIMATION_DURATIONS = {
  FAST: 300,
  NORMAL: 500,
  SLOW: 800,
  VERY_SLOW: 1000,
} as const

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: -10,
  NORMAL: 0,
  OVERLAY: 1000,
  MODAL: 5000,
  CURSOR: 9999,
} as const

// Configurações do contador de dias
export const COUNTER_CONFIG = {
  UPDATE_INTERVAL: 1000, // 1 segundo
  ANIMATION_DURATION: 800,
} as const

// Configurações de scroll
export const SCROLL_CONFIG = {
  TRIGGER_START: "top 80%",
  TRIGGER_START_CARDS: "top 75%",
  TRIGGER_START_TIMELINE: "top 85%",
} as const

export type AspectRatio = (typeof ASPECT_RATIOS)[keyof typeof ASPECT_RATIOS]
