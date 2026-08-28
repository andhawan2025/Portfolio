/** Next.js `basePath` — the app is served under this prefix. */
export const APP_BASE_PATH = "/portfolio"

/**
 * In-app routes (no prefix). `next/link` prepends `APP_BASE_PATH`, so
 * `/` is `http://localhost:3000/portfolio`.
 */
export const PORTFOLIO_HOME = "/"

/** Tabbed project grid (Products, Academics/Research, Imagination Labs). */
export const PORTFOLIO_DETAILS = "/details"

/** Sample work page route. */
export const SAMPLE_WORK = "/samplework"

/**
 * Files in `public/portfolio/...`.
 * Raw `<img>` / `<a>` / `<iframe>` do not get `basePath` automatically.
 */
export function portfolioPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${APP_BASE_PATH}/portfolio${normalized}`
}

/** Resume PDF in `public/portfolio/`. Opens in a new tab. */
export const RESUME_PDF_HREF = portfolioPath(
  `/${encodeURIComponent("Anubhav Dhawan Resume 2026.pdf")}`
)

/** Embedded slide preview image for `/portfolio/samplework`. */
export const SAMPLE_WORK_SLIDE_SRC = portfolioPath(
  `/${encodeURIComponent("KPI Visualization and Computation.png")}`
)

/** Downloadable sample-work PowerPoint. */
export const SAMPLE_WORK_PPTX_HREF = portfolioPath(
  `/${encodeURIComponent("KPI Visualization and Computation.pptx")}`
)
