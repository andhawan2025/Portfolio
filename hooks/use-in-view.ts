"use client"

import { useEffect, useRef, useState } from "react"

export type UseInViewOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  /** Stop observing after the first intersecting frame. Default true. */
  once?: boolean
}

/**
 * IntersectionObserver-based visibility for scroll-triggered UI.
 * Defaults tuned for portfolio cards entering from the bottom of the viewport.
 * With `once: false`, `inView` tracks `isIntersecting` until unmount.
 */
export function useInView<T extends HTMLElement>(options: UseInViewOptions = {}) {
  const {
    root = null,
    rootMargin = "0px 0px -10% 0px",
    threshold = 0.08,
    once = true,
  } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        if (!e) return
        if (once) {
          if (e.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        } else {
          setInView(e.isIntersecting)
        }
      },
      { root, rootMargin, threshold }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [root, rootMargin, threshold, once])

  return { ref, inView }
}
