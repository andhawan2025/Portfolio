import Link from "next/link"
import { portfolioPath } from "@/lib/site-paths"

export default function TMYSArchitecturePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <div className="border-b border-[#30363d] px-4 py-3">
        <Link
          href={portfolioPath("/")}
          className="text-sm font-medium text-[#58a6ff] hover:underline"
        >
          ← Back to portfolio
        </Link>
      </div>
      <iframe
        title="TMYS Agentic Production Architecture"
        src={portfolioPath("/tmys-architecture.html")}
        className="min-h-[calc(100vh-52px)] w-full flex-1 border-0 bg-[#0d1117]"
      />
    </div>
  )
}
