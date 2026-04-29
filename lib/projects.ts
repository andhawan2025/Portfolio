/** Portfolio project data and category copy. */
export type ProjectCategory = "Products" | "Academics/Research" | "Imagination Labs"

export type ArtifactLink =
  | { kind: "external"; label: string; url: string }
  | { kind: "tmysMap"; label: string }

/** Two columns (Dolma / Kit Cat) for `layout: "inspirational-cartoons"`. */
export type InspirationalCartoonsColumn = {
  /** Display name above the character image (e.g. Dolma Doggie, Kit Cat). */
  characterName: string
  image: string
  description: string
  quotes: string[]
  youtubeUrl: string
}

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
  /** Optional extra row shown on standard project cards (e.g. featured characters). */
  additionalRow?: string[]
  /** Artifact titles / image galleries for the modal. */
  artifacts: { title: string; description: string; images: string[] }[]
  /** Extra links for Imagination Labs (TMYS demo + architecture). */
  artifactLinks?: ArtifactLink[]
  /** When true, artifact modal is not offered; show undisclosed copy instead of a working control. */
  artifactModalUndisclosed?: boolean
  /**
   * Optional links beside “View Artifacts”: each opens the modal with only `artifacts[artifactIndex]` (subset slides).
   * Use with a full `artifacts` list; “View Artifacts” still opens all slides.
   */
  artifactModalGroups?: { label: string; artifactIndex: number }[]
  /** Custom two-column card with rotating quotes (Imagination Labs). */
  layout?: "inspirational-cartoons"
  /** Required when `layout` is `inspirational-cartoons` (typically two entries). */
  inspirationalCartoonsColumns?: InspirationalCartoonsColumn[]
}

function artifactEntry(title: string, description = "", images: string[] = []) {
  return { title, description, images }
}

/** Static assets for Loan Campaign research artifacts (served from `public/portfolio/...`). */
const LOAN_CAMPAIGN_ARTIFACTS = "/portfolio/ResearchProjects/LoanCampaign"

/** Credit card churn / retention research artifacts (served from `public/portfolio/...`). */
const CREDIT_CARD_CHURN_ARTIFACTS = "/portfolio/ResearchProjects/CreditCardChurn"

/** Stock sentiment / market analysis research artifacts (served from `public/portfolio/...`). */
const STOCK_SENTIMENT_ARTIFACTS = "/portfolio/ResearchProjects/StockSentimentAnalysis"
const HUMAN_AI_COLLAB_TRANSFORMATION_ARTIFACTS = "/portfolio/Products"
const INSPIRATIONAL_CARTOONS_PORTFOLIO = "/portfolio"

export const projects: Project[] = [
  {
    id: "pricing-engine",
    title: "Predictive Pricing Engine",
    category: "Products",
    goal:
      "Stabilize and scale pricing operations by augmenting current pricing processes with an ML-powered pricing engine, restoring speed and consistency without requiring a replacement hire after the departure of the company's sole pricing expert.",
    impactBullets: [
      "Restored pricing velocity and eliminated quote backlogs following disruption in pricing operations",
      "Reduced reliance on manual workflows, improving efficiency and analyst productivity (~90% effort reduction)",
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
      "Reduced software engineering workload by ~60% by automating custom report generation through natural language queries",
      "Shortened turnaround time for reporting requests from 2–4 weeks to ~15 minutes",
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
          "Created a unified knowledge layer powering multiple workflows, saving business $0.5M annually",
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
    id: "human-ai-collaboration-transformation",
    title: "Human-AI Collaboration Transformation",
    category: "Products",
    goal:
      "Lead an organization-wide transformation to adopt AI-native ways of working by repositioning AI from a perceived threat to an enabler, focusing on augmenting human capability, accelerating delivery, and empowering teams to build faster and smarter without reducing workforce value.",
    role: "Transformation Lead",
    toolkit: [
      "Operating Model Redesign",
      "Change Management",
      "Stakeholder Alignment",
      "Narrative and Perception (AI as augmentation vs. replacement)",
      "Executive and team-level enablement workshops",
      "AI-assisted development environments (Cursor, GitHub Copilot)",
      "Structured prompt engineering playbooks",
    ],
    impactSections: [
      {
        heading: "Organizational Adoption & Culture Shift",
        bullets: [
          "Successfully convinced a traditionally skeptical organization to adopt AI, even when initial sentiment viewed it as a threat to jobs",
          "Reframed AI as a tool for acceleration, not replacement, leading to general acceptance and engagement",
        ],
      },
      {
        heading: "Delivery Acceleration",
        bullets: [
          "Improved the speed of execution by 50% by embedding AI into day-to-day workflows",
          "Reduced dependency on linear development cycles by enabling rapid prototyping and iteration, fully driven by business teams",
        ],
      },
      {
        heading: "Sustainable Operating Model",
        bullets: [
          "Established a repeatable, organization-wide framework for adopting AI responsibly and effectively",
          "Built long-term trust in AI systems through guardrails, transparency, and continuous feedback mechanisms",
        ],
      },
    ],
    artifacts: [
      artifactEntry(
        "AI Reshapes the Digital Product Team Structure",
        "Traditional delivery pod vs. AI-native outcome pod transformation view.",
        [`${HUMAN_AI_COLLAB_TRANSFORMATION_ARTIFACTS}/HumanAICollaborationTransformation.png`]
      ),
    ],
  },
  {
    id: "customer-targeting-revenue",
    title: "ML Driven Customer Targeting & Revenue Optimization Platform",
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
    id: "customer-retention-churn-intelligence",
    title: "Customer Retention & Revenue Protection Intelligence",
    category: "Academics/Research",
    goal:
      "Design and optimize a predictive AI system to identify customers at high risk of churn, enabling proactive retention strategies to protect revenue.",
    impactBullets: [
      "Built and evaluated 18+ models across multiple sampling strategies to identify the most robust, production-ready solution",
      "Identified key behavioral drivers of churn (transaction volume, spend patterns, balance trends), enabling targeted retention strategies",
      "Improved model generalization and reduced overfitting by applying under-sampling techniques to address class imbalance",
      "Achieved high recall (~98%) and strong accuracy (~85%) on validation data, ensuring maximum identification of at-risk customers",
      "Established recall as the primary optimization metric to maximize revenue protection by minimizing missed churn cases",
    ],
    role: "Researcher / Builder",
    toolkit: [
      "Predictive churn modeling",
      "Gradient Boost",
      "AdaBoost",
      "XGBoost",
      "Over and Under Sampling",
      "SMOTE",
      "Hyperparameter tuning (Randomized Search, Cross-validation)",
      "Overfitting Detection",
      "Business KPI alignment",
    ],
    artifacts: [
      artifactEntry("Key Results", "Executive summary and key outcomes.", [
        `${CREDIT_CARD_CHURN_ARTIFACTS}/ExecutiveSummary.png`,
      ]),
      artifactEntry("Research Approach", "Business problem overview and solution methodology.", [
        `${CREDIT_CARD_CHURN_ARTIFACTS}/ModellingApproach.png`,
      ]),
      artifactEntry(
        "Model Performance",
        "Decision tree models, pruning, and KPI evaluation.",
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
          (n) => `${CREDIT_CARD_CHURN_ARTIFACTS}/PerformanceAnalysis${n}.png`
        )
      ),
      artifactEntry(
        "Data Analysis",
        "Exploratory data analysis and feature views.",
        Array.from(
          { length: 12 },
          (_, i) => `${CREDIT_CARD_CHURN_ARTIFACTS}/DataExploration${i + 1}.png`
        )
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
    id: "market-sentiment-investment-analysis",
    title: "Market Sentiment & Investment Analysis",
    category: "Academics/Research",
    goal:
      "Design an AI-driven system to analyze market sentiment from news data and generate actionable insights to support investment decision-making.",
    impactBullets: [
      "Built and evaluated multiple NLP pipelines (Word2Vec, GloVe, Sentence Transformers) to model sentiment and assess correlation with stock performance",
      "Identified critical limitations in model generalization (overfitting, class bias), preventing premature deployment and avoiding misleading investment signals",
      "Established F1 score as the primary metric to balance precision and recall for high-stakes financial decisions",
      "Developed an LLM-powered summarization layer to extract top positive and negative market events on a weekly basis",
      "Delivered structured, decision-ready insights (top sentiment drivers) instead of raw text, improving usability for business stakeholders",
    ],
    role: "Researcher / Builder",
    toolkit: [
      "NLP pipelines for sentiment analysis (multi-class classification: positive, negative, neutral)",
      "Word embeddings (Word2Vec, GloVe, Sentence Transformers)",
      "Model evaluation and bias detection (overfitting analysis, class imbalance handling)",
      "Hyperparameter tuning framework (Randomized Search, validation pipelines)",
      "Advanced prompt engineering (role, task, instruction, structured output design)",
      "Structured output parsing (JSON extraction, post-processing pipelines)",
      "Temporal aggregation framework (weekly sentiment analysis)",
      "Business KPI alignment (F1 optimization, decision accuracy for investment use cases)",
    ],
    artifacts: [
      artifactEntry("Key Results", "Executive summary and key outcomes.", [
        `${STOCK_SENTIMENT_ARTIFACTS}/ExecutiveSummary.png`,
      ]),
      artifactEntry("Research Approach", "Business problem overview and solution methodology.", [
        `${STOCK_SENTIMENT_ARTIFACTS}/AnalysisApproach.png`,
      ]),
      artifactEntry(
        "Word Embeddings",
        "Embedding models and representation learning for news text.",
        [1, 2, 3].map((n) => `${STOCK_SENTIMENT_ARTIFACTS}/WordEmbeddings${n}.png`)
      ),
      artifactEntry(
        "Sentiment Analysis",
        "Classification pipelines, evaluation, and correlation with market signals.",
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
          (n) => `${STOCK_SENTIMENT_ARTIFACTS}/SentimentAnalysis${n}.png`
        )
      ),
      artifactEntry(
        "Prompt Engineering",
        "LLM prompting design and structured outputs for summarization.",
        [1, 2, 3, 4, 5, 6].map((n) => `${STOCK_SENTIMENT_ARTIFACTS}/PromptEngineering${n}.png`)
      ),
    ],
    artifactModalGroups: [
      { label: "Executive Summary", artifactIndex: 0 },
      { label: "Research Approach", artifactIndex: 1 },
      { label: "Word Embeddings", artifactIndex: 2 },
      { label: "Sentiment Analysis", artifactIndex: 3 },
      { label: "Prompt Engineering", artifactIndex: 4 },
    ],
  },
  {
    id: "tmys",
    title: "Tell Me Your Story (TMYS)",
    category: "Imagination Labs",
    role: "Experimenter / AI Product Builder",
    goal:
      "Build an AI-native content platform that transforms user prompts into fully generated long form videos with character, voice and scene continuity — automating the end-to-end pipeline from screenplay creation to final video production and distribution. Build the right harness to overcome the limitations of the current diffusion models.",
    impactBullets: [
      "Designed and prototyped a multi-agent AI pipeline for automated storytelling",
      "Validated feasibility of generating consistent characters, scenes, and narrative flow using GenAI",
      "Reduced manual video production effort by ~80 –90%",
      "Established foundation for a scalable AI content platform (YouTube-first distribution, SaaS potential)",
    ],
    toolkit: [
      "Intelligent Situation and Screenplay Generation",
      "Character Management & Persistance",
      "Dialogue, Video & Background Music Syncing",
      "Text-To-Image",
      "Image-To-Video",
      "Agentic Architecture",
      "GPT-4o",
      "Google Veo-3",
      "Nano Banana",
      "Elevenlabs Audio Generation",
      "Agentic Evaluation",
      "YouTube Publishing",
    ],
    artifacts: [],
    artifactLinks: [
      { kind: "external", label: "Demo Video", url: "https://www.youtube.com/watch?v=YveTm6DmPWM" },
      { kind: "tmysMap", label: "TMYS Agentic Map" },
    ],
  },
  {
    id: "inspirational-cartoons",
    title: "WhimsyWorks Toon Studios",
    category: "Imagination Labs",
    role: "Chief Joy Arrchitect",
    goal: "Create delightful, emotionally engaging content experiences powered by Tell Me Your Story",
    impact: "Built a repeatable system that engaged audience on a regular basis",
    toolkit: ["Tell Me Your Story"],
    artifacts: [],
    layout: "inspirational-cartoons",
    inspirationalCartoonsColumns: [
      {
        characterName: "Dolma Doggie",
        image: `${INSPIRATIONAL_CARTOONS_PORTFOLIO}/DolmaDoggieStage.png`,
        description:
          "A dog who's sole purpose is to tell us cheesy dad jokes. Beware!",
        youtubeUrl: "https://www.youtube.com/@DolmaDoggieJokes/shorts",
        quotes: [
          "Why did the math book look so stressed? Because it had too many problems.",
          "Why do Cows wear bells? Because their horns don't work.",
          "Did you hear about the guy who invented lifesavers? He made a mint!",
          "Why don't scientists trust atoms? Because they make up everything.",
          "The Black Eyed Peas can sing us a tune. But chickpeas can only Hummus one!",
          "I told my wife I was building a model of the Everest mountain range. She asked: Is it to scale? I replied: No, it is just to look at.",
          "I am on a seafood diet. Whenever I see food, I eat it.",
          "I ordered a chicken and an egg online. I will let you know!",
          "Which cats go to bowling? Alley Cats.",
          "Which phones do turtles use? Shell-phones.",
          "I started a band called '999 Megabytes'. We haven't gotten a gig yet.",
        ],
      },
      {
        characterName: "Kit Cat",
        image: `${INSPIRATIONAL_CARTOONS_PORTFOLIO}/KitCatStage.png`,
        description:
          "A transcendental cat who will lead all of us to salvation. All bow to thee!",
        youtubeUrl: "https://www.youtube.com/@KitCatSpiritual/shorts",
        quotes: [
          "You don't have a soul. You are the soul. You have a body",
          "A gem can't be polished without friction, nor man perfected without trial",
          "Sometimes, just a change of perspective is all it takes to solve a problem",
          "The only way to get the best of an argument is to avoid it",
          "We are here in this world not to change our destiny, but to fulfil it",
          "Some succeed because they are destined to, but most succeed because they are determined to",
          "Don't depend too much on anyone in the world because even your shadow leaves you when you are in darkness",
          "If God causes you to suffer much, He certainly intends to make you a saint",
          "Tact is the art of making a point without making an enemy",
          "For those who believe, no proof is necessary; For those who disbelieve, no proof is sufficient",
          "Rest for mind is as necessary as for the body, because the body will rest only when the mind is in rest",
        ],
      },
    ],
  },
]

export const categoryDescriptions: Record<ProjectCategory, string> = {
  Products: "Commercial AI/ML products led from concept to launch.",
  "Academics/Research": "Academic collaborations and research initiatives.",
  "Imagination Labs": "Self learning and AI experimentation initiatives.",
}
