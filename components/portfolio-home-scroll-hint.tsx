"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type PortfolioHomeScrollHintProps = {
  /** Normalized scroll progress through the home track (0 = top). */
  scrollProgress: number
  reduceMotion?: boolean
}

/**
 * Fixed bottom control on the portfolio home scroll experience: encourages scrolling
 * with a short opacity blink on load, then stays static until the user scrolls away.
 */
export function PortfolioHomeScrollHint({ scrollProgress, reduceMotion: reduceMotionProp }: PortfolioHomeScrollHintProps) {
  const reduceMotionPref = useReducedMotion()
  const reduceMotion = reduceMotionProp === true || reduceMotionPref
  const visible = scrollProgress < 0.055
  const [hintCycle, setHintCycle] = useState(0)
  const prevPRef = useRef<number | null>(null)

  useEffect(() => {
    const prev = prevPRef.current
    prevPRef.current = scrollProgress
    if (prev === null) return
    if (visible && prev >= 0.055) {
      setHintCycle((c) => c + 1)
    }
  }, [scrollProgress, visible])

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-[48] flex justify-center transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0px))" }}
    >
      <Button
        key={hintCycle}
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "pointer-events-auto h-11 w-11 rounded-full border-primary/45 bg-background/90 shadow-md backdrop-blur-sm hover:bg-background",
          visible && !reduceMotion && "animate-portfolio-scroll-hint-blink"
        )}
        aria-label="Scroll down for more"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          window.scrollBy({
            top: Math.min(window.innerHeight * 0.45, 520),
            behavior: reduceMotion ? "auto" : "smooth",
          })
        }}
      >
        <ChevronDown className="h-6 w-6 text-primary" aria-hidden />
      </Button>
    </div>
  )
}
