import { portfolioPath } from "@/lib/site-paths"

const socialLinkClass =
  "inline-flex shrink-0 items-center justify-center rounded-md text-primary no-underline ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

/** Icon hit target: 16px base +25% → 20px; sm 18px +25% → 22.5px. */
const logoBoxClass =
  "flex h-5 w-5 shrink-0 items-center justify-center sm:h-[22.5px] sm:w-[22.5px]"

const logoImgClass = "max-h-full max-w-full object-contain"

/** Contact links (email, LinkedIn, GitHub). */
export function ContactSection() {
  return (
    <section className="mt-[42px] border-t border-border pt-[18px]">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Contact</h2>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-foreground">
        <p className="m-0 min-w-0 text-muted-foreground text-sm leading-relaxed sm:text-base">
          Interested in working together or discussing any AI/ML projects? Let's talk!
        </p>
        <a
          href="mailto:andhawan@tmys.ai"
          aria-label="Email andhawan@tmys.ai"
          className={socialLinkClass}
        >
          <span className={logoBoxClass}>
            <img
              src={portfolioPath("/email-logo.png")}
              alt=""
              width={20}
              height={20}
              className={logoImgClass}
            />
          </span>
        </a>
        <span className="px-0.5 text-muted-foreground select-none" aria-hidden>
          |
        </span>
        <a
          href="https://www.linkedin.com/in/anubhav-dhawan-74537617/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className={socialLinkClass}
        >
          <span className={logoBoxClass}>
            <img
              src={portfolioPath("/linkedin-logo.png")}
              alt=""
              width={20}
              height={20}
              className={logoImgClass}
            />
          </span>
        </a>
        <span className="px-0.5 text-muted-foreground select-none" aria-hidden>
          |
        </span>
        <a
          href="https://github.com/andhawan2025"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className={socialLinkClass}
        >
          <span className={`${logoBoxClass} rounded-sm border border-white p-px`}>
            <img
              src={portfolioPath("/github-logo.png")}
              alt=""
              width={20}
              height={20}
              className={logoImgClass}
            />
          </span>
        </a>
      </div>
    </section>
  )
}
