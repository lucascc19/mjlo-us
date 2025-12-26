import ScrollGallery from "@/components/scroll-gallery"
import TimelineWithImages from "@/components/timeline-with-images"
import Hero from "@/components/hero"
import FloatingHearts from "@/components/floating-hearts"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ThemeToggle />
      <Hero />
      <ScrollGallery />
      <TimelineWithImages />
    </main>
  )
}
