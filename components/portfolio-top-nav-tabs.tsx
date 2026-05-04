"use client"

import Link from "next/link"
import {
  PORTFOLIO_NAV_ORDER,
  PORTFOLIO_NAV_TAB_CONFIG,
  portfolioNavKeyToDetailHash,
  type PortfolioNavRailKey,
} from "@/lib/portfolio-nav-config"
import { PORTFOLIO_BASE, PORTFOLIO_DETAILS } from "@/lib/site-paths"
import { cn } from "@/lib/utils"

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x))
}

export type PortfolioTopNavTabsProps = {
  className?: string
  navHighlight: Record<PortfolioNavRailKey, number>
}

const tabShell =
  "flex min-h-[2.75rem] min-w-0 flex-1 basis-0 items-center justify-center gap-1.5 rounded-md border-2 border-transparent px-1.5 py-2 text-center transition-colors sm:min-h-[3rem] sm:gap-2 sm:px-2 sm:py-2.5"

/**
 * Home scroll story only: section labels as full-width tabs; highlight follows `navHighlight`.
 */
export function PortfolioTopNavTabs({ className, navHighlight }: PortfolioTopNavTabsProps) {
  return (
    <nav
      className={cn(
        "flex w-full min-w-0 flex-nowrap items-stretch gap-1.5 rounded-lg border border-border/60 bg-secondary/50 p-1.5 sm:gap-2 sm:p-2",
        className
      )}
      aria-label="Portfolio story sections"
    >
      {PORTFOLIO_NAV_ORDER.map((key) => {
        const cfg = PORTFOLIO_NAV_TAB_CONFIG[key]
        const Icon = cfg.icon
        const detailHash = portfolioNavKeyToDetailHash(key)
        const glow = clamp01(navHighlight[key])
        const dim = 0.28
        const labelOpacity = dim + (1 - dim) * glow
        const isActive = glow > 0.12

        const inner = (
          <>
            <Icon className="size-3.5 shrink-0 opacity-90 sm:size-4" aria-hidden />
            <span className="min-w-0 truncate text-[0.65rem] font-medium leading-tight sm:text-sm">{cfg.label}</span>
          </>
        )

        const activeChrome = cn("bg-card border-b-2 shadow-sm", cfg.activeClass)

        if (!detailHash) {
          return (
            <Link
              key={key}
              href={PORTFOLIO_BASE}
              className={cn(
                tabShell,
                isActive
                  ? activeChrome
                  : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
              )}
              style={{ opacity: labelOpacity }}
            >
              {inner}
            </Link>
          )
        }

        return (
          <Link
            key={key}
            href={`${PORTFOLIO_DETAILS}#${detailHash}`}
            className={cn(
              tabShell,
              isActive ? activeChrome : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
            )}
            style={{ opacity: labelOpacity }}
          >
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
