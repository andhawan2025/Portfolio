import { ProfileAvatar } from "@/components/profile-avatar"
import { portfolioPath } from "@/lib/site-paths"

/** Hero copy and layout; stat cards from `lib/hero-stats.ts`. */

export function HeroSection() {
  return (
    <header className="grid grid-cols-1 gap-6 border-b border-border pb-7 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <ProfileAvatar />
          <h1 className="m-0 min-w-0 flex-1 text-[clamp(1.75rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-foreground">
            Anubhav Dhawan
          </h1>
        </div>
        <p className="my-2 ml-[88px] text-[0.8rem] font-normal uppercase leading-normal tracking-[0.08em] text-primary lg:ml-[104px]">
          AI/ML Product Management & Consulting
        </p>
        <p className="mt-3 leading-[1.7] text-foreground">
          AI Product Leader with over 15 years across Amazon, Deloitte, and Startups. Building 0 → 1 products using LLMs, RAG, and ML to automate workflows, optimize decisions, and unlock value.
        </p>
      </div>

      <div className="flex h-full w-full items-start justify-end lg:pt-[62px]">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <img
            src={portfolioPath("/companylogos/Logos.png")}
            alt="Company and education logos"
            className="mx-auto h-auto w-[31rem] max-w-full rounded-xl object-contain"
          />
        </div>
      </div>

    </header>
  )
}
