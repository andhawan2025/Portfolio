/** Stagger delays (ms) for the “case study unfolding” sequence inside a project card. */
export function cardRevealTiming(toolkitLen: number, hasBottomLine: boolean) {
  const capped = Math.min(toolkitLen, 12)
  const chipStagger = 36
  const afterLastChip = 218 + capped * chipStagger
  const bottomStart = hasBottomLine ? afterLastChip + 28 : afterLastChip
  const impactStart = bottomStart + (hasBottomLine ? 110 : 72)
  const footerStart = impactStart + 120
  return {
    title: 0,
    meta: 62,
    indexBadge: 78,
    goal: 128,
    toolkitLabel: 188,
    toolkitChip: (i: number) => 212 + Math.min(i, 11) * chipStagger,
    bottomLine: hasBottomLine ? afterLastChip + 8 : afterLastChip,
    impact: impactStart,
    impactStagger: (i: number) => impactStart + 20 + i * 52,
    footer: footerStart,
  }
}

export type PortfolioCardRevealTiming = ReturnType<typeof cardRevealTiming>
