/** Path prefix for all portfolio UI and static assets under this app. */
export const PORTFOLIO_BASE = "/portfolio"

/** Tabbed project grid (Products, Academics/Research, Imagination Labs). */
export const PORTFOLIO_DETAILS = `${PORTFOLIO_BASE}/details`

/** Static file or in-app path served under `/portfolio/...`. */
export function portfolioPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${PORTFOLIO_BASE}${normalized}`
}

/** Resume PDF in `public/portfolio/`. Opens in a new tab. */
export const RESUME_PDF_HREF = portfolioPath(
  `/${encodeURIComponent("Anubhav Dhawan Resume 2026.pdf")}`
)

/** Sample work page route. */
export const SAMPLE_WORK = `${PORTFOLIO_BASE}/samplework`

/** Embedded slide preview image for `/portfolio/samplework`. */
export const SAMPLE_WORK_SLIDE_SRC = portfolioPath(
  `/${encodeURIComponent("KPI Visualization and Computation.png")}`
)

/** Downloadable sample-work PowerPoint. */
export const SAMPLE_WORK_PPTX_HREF = portfolioPath(
  `/${encodeURIComponent("KPI Visualization and Computation.pptx")}`
)
