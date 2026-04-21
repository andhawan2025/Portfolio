/** Portfolio project data and category copy. */
export type ProjectCategory = "Products" | "Academics/Research" | "Passion Projects"

export type ArtifactLink =
  | { kind: "external"; label: string; url: string }
  | { kind: "tmysMap"; label: string }

/** Impact grouped as a heading with nested bullets (optional). */
export type ImpactSection = {
  heading: string
  bullets: string[]
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  goal: string
  role: string
  toolkit: string[]
  /** Single impact paragraph (most projects). */
  impact?: string
  /** Bullet list instead of impact (e.g. TMYS). */
  impactBullets?: string[]
  /** Grouped impact with sub-bullets; when set, used instead of `impactBullets` / `impact`. */
  impactSections?: ImpactSection[]
  /** Optional; shown in artifact modal footer. */
  skills?: string[]
  /** Artifact titles / image galleries for the modal. */
  artifacts: { title: string; description: string; images: string[] }[]
  /** Extra links for Passion Projects (TMYS demo + architecture). */
  artifactLinks?: ArtifactLink[]
  /** When true, artifact modal is not offered; show undisclosed copy instead of a working control. */
  artifactModalUndisclosed?: boolean
  /**
   * Optional links beside “View Artifacts”: each opens the modal with only `artifacts[artifactIndex]` (subset slides).
   * Use with a full `artifacts` list; “View Artifacts” still opens all slides.
   */
  artifactModalGroups?: { label: string; artifactIndex: number }[]
}

function artifactEntry(title: string, description = "", images: string[] = []) {
  return { title, description, images }
}

/** Static assets for Loan Campaign research artifacts (served from `public/portfolio/...`). */
const LOAN_CAMPAIGN_ARTIFACTS = "/portfolio/ResearchProjects/LoanCampaign"

export const projects: Project[] = [
  {
    id: "pricing-engine",
    title: "Pricing Automation Engine",
    category: "Products",
    goal:
      "Stabilize and scale pricing operations by replacing manual, excel-based workflows with an AI-powered pricing engine, restoring speed and consistency without requiring a replacement hire after the departure of the company's sole pricing expert.",
    impactBullets: [
      "Restored pricing velocity and eliminated quote backlogs following disruption in pricing operations",
      "Reduced reliance on manual, Excel-based workflows, improving efficiency and analyst productivity (~90% effort reduction)",
      "Maintained continuity without additional headcount, avoiding the need for a specialized pricing hire",
      "Improved pricing consistency and margin reliability through standardized, model-driven decisioning",
    ],
    role: "Product Lead & Builder",
    toolkit: [
      "TF-IDF",
      "Logistic Regression",
      "XGBoost",
      "Decision Trees + Bagging",
      "Scikit-learn",
      "Vibe Coding",
    ],
    artifacts: [],
    artifactModalUndisclosed: true,
  },
  {
    id: "nl2sql-reporting",
    title: "On-Demand Reporting & Analytics (NL2SQL)",
    category: "Products",
    goal:
      "Design and deploy an AI-powered NL2SQL solution to handle high volumes of custom reporting requests across 45+ B2B customers, enabling fully user-driven report generation with minimal to no human intervention.",
    impactBullets: [
      "Reduced software engineering workload by ~20% by automating custom report generation through natural language queries",
      "Shortened turnaround time for reporting requests from 2–4 weeks to ~5 minutes",
      "Enabled end users to define report requirements directly, eliminating most back-and-forth and manual SQL translation",
      "Introduced reusable saved reports, allowing users to build personalized, continuously updated dashboards",
      "Scaled analytics support across 45+ customers without proportional increase in engineering effort",
    ],
    role: "Product Lead",
    toolkit: [
      "NL2SQL",
      "Retrieval-Augmented Generation (RAG)",
      "Advanced prompt engineering (context injection, structured prompting, failure handling)",
      "Sophisticated Guardrails",
      "LLM as Judge",
      "Observability framework",
      "KPI instrumentation",
      "User Feedback loop",
      "Reusable report layer",
      "End-to-end security framework",
    ],
    artifacts: [],
    artifactModalUndisclosed: true,
  },
  {
    id: "conversational-knowledge-platform",
    title: "Conversational Knowledge Platform",
    category: "Products",
    goal:
      "Design and deploy a conversational AI platform to serve two critical functions: enable B2B customers to get instant answers to operational questions, and accelerate onboarding and training of new associates through guided, context-aware assistance.",
    impactSections: [
      {
        heading: "Customer-facing (B2B support)",
        bullets: [
          "Reduced customer support load through self-serve query resolution",
          "Improved response time and consistency across interactions via always-available support",
        ],
      },
      {
        heading: "Internal (training & onboarding)",
        bullets: [
          "Accelerated onboarding of new associates with real-time, contextual guidance",
          "Reduced dependency on trainers and documentation-heavy processes",
        ],
      },
      {
        heading: "Platform-level",
        bullets: [
          "Created a unified knowledge layer powering multiple workflows",
          "Scaled support and training without a proportional increase in headcount",
        ],
      },
    ],
    role: "Product Lead",
    toolkit: [
      "Retrieval-Augmented Generation (RAG)",
      "Vector Database",
      "Contextual and Multi-Turn Conversation",
      "Hallucination prevention",
      "LLM as Judge",
      "Defense against prompt injection attacks",
      "Observability framework (conversation tracking, failure analysis, usage patterns)",
      "Feedback loops",
      "Role-based permissions",
    ],
    artifacts: [],
    artifactModalUndisclosed: true,
  },
  {
    id: "customer-targeting-revenue",
    title: "AI-Driven Customer Targeting & Revenue Optimization Platform",
    category: "Academics/Research",
    goal:
      "Design and deploy a predictive AI system to improve customer conversion by identifying high-propensity segments for personal loan campaigns, enabling more efficient and revenue-driven targeting.",
    impactBullets: [
      "Improved campaign effectiveness by identifying high-conversion customer segments based on income, education, and family attributes",
      "Increased revenue potential by prioritizing high-propensity customers and reducing wasted outreach",
      "Established recall as the primary optimization metric to maximize capture of potential converters",
      "Enabled scalable, repeatable targeting strategy for future campaigns and new customer onboarding",
      "Provided clear, data-driven insights into key drivers of customer conversion to inform business strategy",
    ],
    role: "Researcher / Builder",
    toolkit: [
      "Predictive propensity modeling (customer conversion likelihood)",
      "Pruning Strategies",
      "Feature Engineering and transformation",
      "Model Evaluation Framework",
      "Confusion Matrix",
      "Hyperparameter tuning and model selection",
      "Customer segmentation and targeting",
      "Business KPI alignment",
    ],
    artifacts: [
      artifactEntry("Key Results", "Executive summary and key outcomes.", [
        `${LOAN_CAMPAIGN_ARTIFACTS}/ExecutiveSummary.png`,
      ]),
      artifactEntry("Research Approach", "Business problem overview and solution methodology.", [
        `${LOAN_CAMPAIGN_ARTIFACTS}/Approach.png`,
      ]),
      artifactEntry(
        "Model Performance",
        "Decision tree models, pruning, and KPI evaluation.",
        [1, 2, 3, 4, 5, 6, 7].map((n) => `${LOAN_CAMPAIGN_ARTIFACTS}/ModelPerformance${n}.png`)
      ),
      artifactEntry(
        "Data Analysis",
        "Exploratory data analysis and feature views.",
        Array.from({ length: 14 }, (_, i) => `${LOAN_CAMPAIGN_ARTIFACTS}/EDA${i + 1}.png`)
      ),
    ],
    artifactModalGroups: [
      { label: "Executive Summary", artifactIndex: 0 },
      { label: "Research Approach", artifactIndex: 1 },
      { label: "Model Performance", artifactIndex: 2 },
      { label: "Data Analysis", artifactIndex: 3 },
    ],
  },
  {
    id: "tmys",
    title: "Tell Me Your Story (TMYS)",
    category: "Passion Projects",
    role: "Experimenter / AI Product Builder",
    goal:
      "Build an AI-native content platform that transforms user prompts into fully generated video stories with character consistency — automating the end-to-end pipeline from screenplay creation to final video production and distribution.",
    impactBullets: [
      "Designed and prototyped a multi-agent AI pipeline for automated storytelling",
      "Validated feasibility of generating consistent characters, scenes, and narrative flow using GenAI",
      "Reduced manual video production effort by ~80 –90%",
      "Established foundation for a scalable AI content platform (YouTube-first distribution, SaaS potential)",
    ],
    toolkit: [
      "Text-To-Image",
      "Image-To-Video",
      "Agentic Architecture",
      "GPT-4o",
      "Google Veo-3",
      "Nano Banana",
      "Agentic Evaluation",
      "YouTube Publishing",
    ],
    artifacts: [],
    artifactLinks: [
      { kind: "external", label: "Demo Video", url: "https://www.youtube.com/watch?v=YveTm6DmPWM" },
      { kind: "tmysMap", label: "TMYS Agentic Map" },
    ],
  },
]

export const categoryDescriptions: Record<ProjectCategory, string> = {
  Products: "Commercial AI/ML products led from concept to launch.",
  "Academics/Research": "Academic collaborations and research initiatives.",
  "Passion Projects": "Self learning and AI experimentation initiatives.",
}
