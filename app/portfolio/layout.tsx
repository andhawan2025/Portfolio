import type { Metadata } from "next"
import { portfolioPath } from "@/lib/site-paths"

export const metadata: Metadata = {
  title: "Anubhav Dhawan Portfolio",
  description:
    "AI/ML product leadership.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: portfolioPath("/icon-light-32x32.png"),
        media: "(prefers-color-scheme: light)",
      },
      {
        url: portfolioPath("/icon-dark-32x32.png"),
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: portfolioPath("/icon.svg"),
        type: "image/svg+xml",
      },
    ],
    apple: portfolioPath("/apple-icon.png"),
  },
}

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
