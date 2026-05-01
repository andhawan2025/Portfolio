"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PortfolioNavContactBlock } from "@/components/contact-section"
import {
  CATEGORY_TO_PORTFOLIO_HASH,
  PORTFOLIO_HASH_TO_CATEGORY,
  PORTFOLIO_NAV_ORDER,
  PORTFOLIO_NAV_TAB_CONFIG,
  portfolioNavKeyToDetailHash,
  projectTitlesForPortfolioHash,
} from "@/lib/portfolio-nav-config"
import type { ProjectCategory } from "@/lib/projects"
import { PORTFOLIO_BASE, PORTFOLIO_DETAILS } from "@/lib/site-paths"
import { cn } from "@/lib/utils"

type PortfolioDetailsLeftNavProps = {
  activeCategory: ProjectCategory
  onSelectPortfolioCategory: (category: ProjectCategory) => void
}

export function PortfolioDetailsLeftNav({
  activeCategory,
  onSelectPortfolioCategory,
}: PortfolioDetailsLeftNavProps) {
  const activeHash = CATEGORY_TO_PORTFOLIO_HASH[activeCategory]

  return (
    <nav
      className="pointer-events-auto absolute left-0 top-0 bottom-0 flex w-52 min-h-0 flex-col gap-1 overflow-hidden rounded-r-lg border-r border-border/70 bg-secondary/50 px-1.5 pl-2 pt-1.5 sm:w-60 sm:px-2 sm:pl-2.5 sm:pt-2"
      aria-label="Portfolio sections"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden overscroll-contain pr-0.5 [scrollbar-gutter:stable]">
        {PORTFOLIO_NAV_ORDER.map((key) => {
          const cfg = PORTFOLIO_NAV_TAB_CONFIG[key]
          const Icon = cfg.icon
          const detailHash = portfolioNavKeyToDetailHash(key)
          const isPortfolioRow = detailHash !== null
          const isActivePortfolio = isPortfolioRow && detailHash !== null && activeHash === detailHash
          const isActive = isPortfolioRow ? isActivePortfolio : false

          if (!isPortfolioRow) {
            return (
              <Link
                key={key}
                href={PORTFOLIO_BASE}
                className={cn(
                  "grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-1 rounded-md px-2 py-2 text-left text-[0.7875rem] font-medium leading-snug transition-all sm:gap-x-[0.45rem] sm:px-[0.675rem] sm:py-[0.675rem] sm:text-[0.9rem]",
                  "border-l-2 border-transparent text-muted-foreground hover:bg-card/50 hover:text-foreground"
                )}
              >
                <Icon
                  className="mt-0.5 size-[0.9rem] shrink-0 opacity-90 sm:mt-0.5 sm:size-[1.125rem]"
                  aria-hidden
                />
                <span className="min-w-0 break-words leading-snug">{cfg.label}</span>
              </Link>
            )
          }

          const hash = detailHash!
          const titles = projectTitlesForPortfolioHash(hash)

          return (
            <div key={key} className="min-w-0">
              <div
                className={cn(
                  "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-1 rounded-md px-2 py-2 text-left text-[0.7875rem] font-medium leading-snug transition-all sm:gap-x-[0.45rem] sm:px-[0.675rem] sm:py-[0.675rem] sm:text-[0.9rem]",
                  isActive
                    ? cn(
                        "bg-card border-l-2 shadow-sm",
                        cfg.activeClass,
                        "pl-[calc(0.5625rem-2px)] sm:pl-[calc(0.675rem-2px)]"
                      )
                    : "border-l-2 border-transparent text-muted-foreground hover:bg-card/50 hover:text-foreground"
                )}
              >
                <button
                  type="button"
                  className="col-span-2 -m-0 flex min-w-0 items-start gap-x-1 rounded-md bg-transparent py-0 pr-1 text-left text-inherit font-medium sm:gap-x-[0.45rem]"
                  onClick={() => onSelectPortfolioCategory(PORTFOLIO_HASH_TO_CATEGORY[hash])}
                  aria-expanded={isActive}
                  aria-controls={`portfolio-nav-sub-${key}`}
                >
                  <Icon
                    className="mt-0.5 size-[0.9rem] shrink-0 opacity-90 sm:mt-0.5 sm:size-[1.125rem]"
                    aria-hidden
                  />
                  <span className="min-w-0 break-words leading-snug">{cfg.label}</span>
                </button>
                <Link
                  href={`${PORTFOLIO_DETAILS}#${hash}`}
                  scroll={false}
                  onClick={() => onSelectPortfolioCategory(PORTFOLIO_HASH_TO_CATEGORY[hash])}
                  className={cn(
                    "mt-0.5 inline-flex shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-card/80 hover:text-foreground sm:p-[0.225rem]",
                    isActive && cfg.activeClass
                  )}
                  aria-label={`Open ${cfg.label} projects`}
                >
                  <ArrowUpRight className="size-[0.9rem] sm:size-[0.9rem]" aria-hidden />
                </Link>
              </div>
              {isActive ? (
                <ul
                  id={`portfolio-nav-sub-${key}`}
                  className="mb-1 ml-3.5 mt-1 list-disc space-y-0.5 pl-2.5 text-[0.585rem] leading-snug text-muted-foreground sm:ml-[1.125rem] sm:pl-2.5 sm:text-[0.675rem]"
                >
                  {titles.map((title) => (
                    <li key={title} className="pl-0.5 marker:text-muted-foreground/80">
                      {title}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )
        })}
      </div>
      <PortfolioNavContactBlock />
    </nav>
  )
}
