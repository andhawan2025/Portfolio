import { portfolioPath } from "@/lib/site-paths"

/** WhimsyWorks pair slides at end of home scroll (image + blurb side by side). */
export type PortfolioImaginationScrollPair = {
  id: string
  imagePath: string
  imageAlt: string
  heading: string
  blurb: string
}

export const PORTFOLIO_IMAGINATION_SCROLL_PAIRS: PortfolioImaginationScrollPair[] = [
  {
    id: "dolma-doggie",
    imagePath: portfolioPath("/DolmaDoggieStage.png"),
    imageAlt: "Dolma Doggie character",
    heading: "Dolma Doggie",
    blurb: "A dog who's sole purpose is to tell us cheesy dad jokes. Beware!",
  },
  {
    id: "kit-cat",
    imagePath: portfolioPath("/KitCatStage.png"),
    imageAlt: "Kit Cat character",
    heading: "Kit Cat",
    blurb: "A transcendental cat who will lead all of us to salvation. All bow to thee!",
  },
]
