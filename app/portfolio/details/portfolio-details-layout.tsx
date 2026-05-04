"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { PortfolioHeroTopBand } from "@/components/portfolio-hero-top-band"
import { ProjectsGrid } from "@/components/projects-grid"
import { CATEGORY_TO_PORTFOLIO_HASH, parsePortfolioHashToCategory } from "@/lib/portfolio-nav-config"
import type { ProjectCategory } from "@/lib/projects"

/** Fixed header + tabbed project grid (category switcher in content). */
export function PortfolioDetailsLayout() {
  const heroMeasureRef = useRef<HTMLDivElement>(null)
  const [insets, setInsets] = useState({ top: 180 })
  const [category, setCategory] = useState<ProjectCategory>(() => {
    if (typeof window === "undefined") return "Products"
    return parsePortfolioHashToCategory(window.location.hash.slice(1)) ?? "Products"
  })

  const applyHashToCategory = useCallback(() => {
    const cat = parsePortfolioHashToCategory(window.location.hash.slice(1))
    if (cat) setCategory(cat)
  }, [])

  useLayoutEffect(() => {
    applyHashToCategory()
    window.addEventListener("hashchange", applyHashToCategory)
    return () => window.removeEventListener("hashchange", applyHashToCategory)
  }, [applyHashToCategory])

  const onCategoryChange = useCallback((c: ProjectCategory) => {
    setCategory(c)
    if (typeof window === "undefined") return
    const path = `${window.location.pathname}${window.location.search}`
    const h = CATEGORY_TO_PORTFOLIO_HASH[c]
    window.history.replaceState(null, "", `${path}#${h}`)
  }, [])

  const measureInsets = useCallback(() => {
    const h = heroMeasureRef.current?.offsetHeight
    setInsets({
      top: (h ?? 132) + 2,
    })
  }, [])

  useLayoutEffect(() => {
    measureInsets()
    const ro = new ResizeObserver(() => measureInsets())
    if (heroMeasureRef.current) ro.observe(heroMeasureRef.current)
    window.addEventListener("resize", measureInsets)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measureInsets)
    }
  }, [measureInsets])

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85">
        <div
          ref={heroMeasureRef}
          className="box-border w-full max-w-none px-[0.5in] pt-[0.3in] pb-1 sm:pb-1.5"
        >
          <PortfolioHeroTopBand />
        </div>
      </header>

      <div className="relative min-h-screen bg-background" style={{ paddingTop: insets.top }}>
        <div className="mx-auto box-border w-full max-w-[min(1100px,calc(100vw-1.5rem))] px-3 pb-16 pt-8 sm:max-w-[min(1100px,calc(100vw-2.5rem))] sm:px-5 sm:pb-16">
          <ProjectsGrid
            showPortfolioHeading={false}
            activeCategory={category}
            onActiveCategoryChange={onCategoryChange}
          />
        </div>
      </div>
    </>
  )
}
