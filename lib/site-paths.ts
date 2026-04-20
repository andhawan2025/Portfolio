/** Path prefix for all portfolio UI and static assets under this app. */
export const PORTFOLIO_BASE = "/portfolio"

/** Static file or in-app path served under `/portfolio/...`. */
export function portfolioPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${PORTFOLIO_BASE}${normalized}`
}
