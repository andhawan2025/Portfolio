import Link from "next/link"
import type { Metadata } from "next"
import {
  PORTFOLIO_BASE,
  SAMPLE_WORK_PPTX_HREF,
  SAMPLE_WORK_SLIDE_SRC,
} from "@/lib/site-paths"

export const metadata: Metadata = {
  title: "Sample Work | Anubhav Dhawan Portfolio",
  description: "KPI Visualization and Computation — sample work slide.",
}

export default function SampleWorkPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30363d] px-4 py-3">
        <Link
          href={PORTFOLIO_BASE}
          className="text-sm font-medium text-[#58a6ff] hover:underline"
        >
          ← Back to portfolio
        </Link>
        <a
          href={SAMPLE_WORK_PPTX_HREF}
          download
          className="inline-flex h-9 items-center justify-center rounded-lg border border-[#30363d] bg-[#21262d] px-4 text-sm font-medium text-[#e6edf3] transition-colors hover:bg-[#30363d]"
        >
          Download slide
        </a>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-6 sm:px-6 sm:py-8">
        <figure className="m-0 w-full max-w-6xl">
          <img
            src={SAMPLE_WORK_SLIDE_SRC}
            alt="KPI Visualization and Computation sample work slide"
            className="h-auto w-full rounded-lg border border-[#30363d] bg-black shadow-lg"
          />
          <figcaption className="sr-only">
            KPI Visualization and Computation
          </figcaption>
        </figure>
      </main>
    </div>
  )
}
