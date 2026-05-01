"use client"

import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { PortfolioDetailsLeftNav } from "@/components/portfolio-details-left-nav"
import { PortfolioHeroTopBand } from "@/components/portfolio-hero-top-band"
import { ProjectsGrid } from "@/components/projects-grid"
import {
  CATEGORY_TO_PORTFOLIO_HASH,
  parsePortfolioHashToCategory,
  PORTFOLIO_RAIL_BOTTOM_INSET_PX,
} from "@/lib/portfolio-nav-config"
import type { ProjectCategory } from "@/lib/projects"

/** Matches `/portfolio` fixed header + left rail; tabbed grid synced with the rail. */
export function PortfolioDetailsLayout() {
  const heroMeasureRef = useRef<HTMLDivElement>(null)
  const [insets, setInsets] = useState({ top: 138, bottom: PORTFOLIO_RAIL_BOTTOM_INSET_PX })
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
      top: (h ?? 132) + 6,
      bottom: PORTFOLIO_RAIL_BOTTOM_INSET_PX,
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
      <header className="fixed left-0 right-0 top-0 z-50 -translate-y-2 border-b border-border bg-background/95 pb-1 pt-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 sm:pt-4">
        <div
          ref={heroMeasureRef}
          className="ml-52 box-border w-[calc(100%-13rem)] max-w-[min(1100px,calc(100vw-13rem))] px-3 sm:ml-60 sm:w-[calc(100%-15rem)] sm:max-w-[min(1100px,calc(100vw-15rem))] sm:px-5"
        >
          <PortfolioHeroTopBand />
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 z-40" style={{ top: insets.top, bottom: insets.bottom }}>
        <PortfolioDetailsLeftNav activeCategory={category} onSelectPortfolioCategory={onCategoryChange} />
      </div>

      <div
        className="relative min-h-screen bg-background"
        style={{ paddingTop: insets.top }}
      >
        <div className="ml-52 box-border w-[calc(100%-13rem)] max-w-[min(1100px,calc(100vw-13rem))] px-3 pb-16 pt-8 sm:ml-60 sm:w-[calc(100%-15rem)] sm:max-w-[min(1100px,calc(100vw-15rem))] sm:px-5 sm:pb-16">
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
