"use client"

export function DotWaveLoader() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-wave"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-wave"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-wave"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  )
}
