/** Portfolio project data and category copy. */
export type ProjectCategory = "Products" | "Academics/Research" | "Imagination Labs"

export type ArtifactLink =
  | { kind: "external"; label: string; url: string }
  | { kind: "disabled"; label: string }
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
  /** Optional summary after toolkit (e.g. business outcome one-liner). */
  bottomLine?: string
  /** Overrides the default "Impact" heading for the impact / bullets block. */
  impactSectionLabel?: string
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
  /** Custom character showcase card (Imagination Labs). */
  layout?: "inspirational-cartoons"
  /** Required when `layout` is `inspirational-cartoons` (two or three entries). */
  inspirationalCartoonsColumns?: InspirationalCartoonsColumn[]
  /** Optional overrides for inspirational-cartoons layout (e.g. CPTVerse trio). */
  inspirationalCartoonsOptions?: {
    circularImages?: boolean
    hideQuotes?: boolean
    hideDescriptions?: boolean
    /** Single channel link below all characters (instead of per-column Subscribe). */
    sharedYoutubeUrl?: string
    /** Auto-cycling stills shown under the character row (e.g. CPTVerse scenes). */
    revolvingSceneImages?: string[]
  }
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

/** Plant / weed detection CV research artifacts (`public/portfolio/ResearchProjects/WeedDetection/`). */
const WEED_DETECTION_ARTIFACTS = "/portfolio/ResearchProjects/WeedDetection"
const HUMAN_AI_COLLAB_TRANSFORMATION_ARTIFACTS = "/portfolio/Products"
const INSPIRATIONAL_CARTOONS_PORTFOLIO = "/portfolio"
const CPTVERSE_SCENES_PORTFOLIO = `${INSPIRATIONAL_CARTOONS_PORTFOLIO}/cptverse-scenes`

export const projects: Project[] = [
  {
    id: "pricing-engine",
    title: "Predictive Pricing Engine",
    category: "Products",
    goal:
      "Stabilize and scale pricing operations by augmenting current pricing processes with an ML-powered pricing engine, restoring speed and consistency without requiring a replacement hire after the departure of the company's sole pricing expert.",
    impactSectionLabel: "Accomplishments",
    impactBullets: [
      "Reduced reliance on manual workflows, improving efficiency and analyst productivity (~90% effort reduction)",
      "Restored pricing velocity and eliminated quote backlogs following disruption in pricing operations",
      "Maintained continuity without additional headcount, empowering business analysts to run pricing workflows, avoiding the need for a specialized pricing hire",
      "Improved pricing consistency and margin reliability through standardized, model-driven decisioning",
    ],
    bottomLine:
      "90% reduction in manual effort for pricing and eliminated the need to setup a new pricing team in a cash strapped start up.",
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
    impactSectionLabel: "Accomplishments",
    impactBullets: [
      "Reduced software engineering workload by ~60% by automating custom report generation through natural language queries",
      "Shortened turnaround time for reporting requests from 2–4 weeks to ~15 minutes",
      "Enabled end users to define report requirements directly, eliminating most back-and-forth and manual SQL translation",
      "Introduced reusable saved reports, allowing users to build personalized, continuously updated dashboards",
      "Scaled analytics support across 45+ customers without proportional increase in engineering effort",
    ],
    bottomLine:
      "Drastically reduced the time for custom requests, from weeks to minutes, and removed more than half of the engineering effort needed for these reports.",
    role: "Product Lead",
    toolkit: [
      "Agentic AI",
      "NL2SQL",
      "RAG",
      "Advanced Prompt Engineering",
      "LLM Harness / Guardrails",
      "LLM as Judge",
      "Observability framework",
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
    impactSectionLabel: "Accomplishments",
    impactSections: [
      {
        heading: "Customer-facing (B2B support)",
        bullets: [
          "Reduced customer support load through self-serve query resolution",
          "Improved response time and consistency across interactions",
        ],
      },
      {
        heading: "Internal (training & onboarding)",
        bullets: [
          "Accelerated onboarding of new associates with real-time guidance",
          "Reduced dependency on trainers and documentation",
        ],
      },
      {
        heading: "Platform-level",
        bullets: [
          "Created a unified knowledge layer powering multiple workflows, saving business $0.5M annually",
          "Scaled support, training without a proportional increase in engineering effort",
        ],
      },
    ],
    bottomLine:
      "Saved around half a million yearly in customer support and training costs.",
    role: "Product Lead",
    toolkit: [
      "Agentic AI",
      "RAG",
      "Vector Database",
      "Contextual Conversation",
      "Hallucination Prevention",
      "LLM as Judge",
      "Observability Framework",
      "Feedback Loops",
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
    impactSectionLabel: "Accomplishments",
    role: "Transformation Lead",
    toolkit: [
      "Operating Model Redesign",
      "Change Management",
      "Stakeholder Alignment",
      "Narrative and Perception",
      "AI-assisted Development",
      "Structured Prompt Engineering Playbooks",
    ],
    bottomLine:
      "Transformed the engineering operational model for the company to an AI-first operating model reducing delivery time to half.",
    impactSections: [
      {
        heading: "Organizational Adoption & Culture Shift",
        bullets: [
          "Successfully convinced a skeptical organization to adopt AI, even when initial sentiment viewed it as a threat",
          "Reframed AI as a tool for acceleration, not replacement",
        ],
      },
      {
        heading: "Delivery Acceleration",
        bullets: [
          "Improved the speed of execution by 50% by embedding AI into day-to-day workflows",
          "Enabled rapid prototyping and iteration, fully driven by business teams",
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
    title: "Customer Targeting & Revenue Optimization",
    category: "Academics/Research",
    goal:
      "Design and deploy a predictive AI system to improve customer conversion by identifying high-propensity segments for personal loan campaigns, enabling more efficient and revenue-driven targeting.",
    impactBullets: [
      "Identified a high-value target segment (high-income, highly educated, large households) with the strongest propensity for personal loan uptake, enabling precise campaign targeting.",
      "Enabled dual deployment strategy: proactive targeting of existing customers and real-time cross-sell recommendations during new customer onboarding.",
      "Validated Decision Tree as the optimal production model, balancing performance and complexity, with post-pruning tradeoffs clearly evaluated.",
      "Established Recall as the primary success metric (~maximizing capture of potential buyers), directly aligning model performance with revenue growth objectives.",
      "Diagnosed data imbalance (9:1 skew) and recommended actionable improvements, including external data sourcing and resampling techniques to enhance model robustness.",
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
    bottomLine:
      "Established that advanced and costly pruning techniques don't provide better models in case of class imbalance in input data, and recommended the client to optimize the cost of implementing their product.",
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
    title: "Customer Retention & Revenue Protection",
    category: "Academics/Research",
    goal:
      "Design and optimize a predictive AI system to identify customers at high risk of churn, enabling proactive retention strategies to protect revenue.",
    impactBullets: [
      "Evaluated multiple ML models and selected a Gradient Boosting model as the optimal production solution, achieving high recall (~98%) and strong accuracy (~85%) with minimal overfitting.",
      "Improved model robustness through class imbalance handling (0.85:0.15) using under/over-sampling techniques, resulting in strong generalization and near-perfect test performance.",
      "Defined Recall as the primary optimization metric to maximize churn detection and revenue protection, with Accuracy as a secondary measure.",
      "Identified key churn drivers (decline in transaction amount/count, low engagement, high revolving balance), enabling targeted retention strategies.",
      "Translated model insights into business actions by pinpointing high-risk customer segments and disproving assumed drivers (income, age, education), refining targeting efficiency.",
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
    bottomLine:
      "Enabled early churn detection to protect high-value customer revenue by improving the performance of the base model from 77% to 97% using Gradient Boosting with class imbalance handling (under/over-sampling) and optimized hyperparameter tuning validated via cross-validation.",
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
    title: "Market Sentiment &  Investment Analysis",
    category: "Academics/Research",
    goal:
      "Design an AI-driven system to analyze market sentiment from news data and generate actionable insights to support investment decision-making.",
    impactBullets: [
      "Built end-to-end sentiment intelligence system (classification + extraction models) to link news sentiment with stock performance and support investment decision-making.",
      "Evaluated 6+ model variations across embeddings (Word2Vec, GloVe, Sentence Transformers) with hyperparameter tuning, selecting the best-performing GloVe model (F1 ~53%) with stable test performance.",
      "Diagnosed key model limitations (overfitting, class imbalance, prediction bias), preventing unreliable deployment and establishing a roadmap for more robust modeling.",
      "Established F1 score as the primary evaluation metric to balance precision and recall for high-stakes financial decision accuracy.",
      "Delivered strategic insights beyond modeling—revealing weak sentiment–price correlation and guiding shift toward multi-signal investment strategies while identifying opportunities for scalable, productized sentiment scoring solutions.",
    ],
    role: "Researcher / Builder",
    toolkit: [
      "NLP Pipelines",
      "Word2Vec",
      "GloVe",
      "Sentence Transformers",
      "Overfitting Analysis",
      "Class Imbalance Handling",
      "Hyperparameter Tuning",
      "Advanced Prompt Engineering",
      "Temporal Aggregation",
    ],
    bottomLine:
      "Improved investment decision-making by uncovering weak sentiment–stock price correlation and preventing reliance on misleading signals, by building and evaluating multiple NLP models (Word2Vec, GloVe, Sentence Transformers), selecting a tuned GloVe model (F1 ~53%), and identifying key limitations such as overfitting, class imbalance, and prediction bias.",
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
    id: "plant-image-classification-weed-detection",
    title: "Plant Image Classification for Automated Weed Detection",
    category: "Academics/Research",
    goal:
      "Automate plant seedling classification using computer vision to reduce manual effort in weed identification and improve agricultural efficiency.",
    impactSectionLabel: "Accomplishments",
    impactBullets: [
      "Built and evaluated multiple CNN architectures, improving model performance from ~64% to ~68% accuracy and significantly increasing recall (~61% → ~79%).",
      "Enhanced model generalization using data augmentation, learning rate tuning, and batch normalization, reducing overfitting and improving real-world applicability.",
      "Identified class imbalance and category-specific performance gaps (e.g., Black Grass, Common Wheat), informing targeted data acquisition strategy.",
      "Established Recall as the primary success metric to maximize correct identification of seedlings in high-impact agricultural use cases.",
      "Recommended future improvements including transfer learning (e.g., VGG16) and additional labeled data to further boost accuracy and reduce computational cost.",
    ],
    role: "Researcher / Builder",
    toolkit: [
      "Convolutional Neural Networks",
      "Computer Vision",
      "Multiclass Classification",
      "Image Transformation",
      "Batch Normalization",
      "Learning Rate Scheduling",
      "Confusion Matrix",
    ],
    bottomLine:
      "Automated and improved seedling classification recall by 18 percentage points and performance by four percentage points by deploying an optimized CNN model with data augmentation and normalization techniques, enabling scalable and more accurate weed identification in agricultural workflows.",
    artifacts: [
      artifactEntry("Executive Summary", "Executive overview and outcomes.", [
        `${WEED_DETECTION_ARTIFACTS}/ExecutiveSummary.png`,
      ]),
      artifactEntry("Research Approach", "Problem framing and methodology.", [
        `${WEED_DETECTION_ARTIFACTS}/ResearchApproach.png`,
      ]),
      artifactEntry(
        "Image Transformation",
        "Augmentation and preprocessing views.",
        [1, 2, 3].map((n) => `${WEED_DETECTION_ARTIFACTS}/ImageTransformation${n}.png`)
      ),
      artifactEntry(
        "Model Performance",
        "Training results, confusion matrix, and evaluation.",
        [1, 2, 3, 4, 5].map((n) => `${WEED_DETECTION_ARTIFACTS}/ModelPerformance${n}.png`)
      ),
    ],
    artifactModalGroups: [
      { label: "Executive Summary", artifactIndex: 0 },
      { label: "Research Approach", artifactIndex: 1 },
      { label: "Image Transformation", artifactIndex: 2 },
      { label: "Model Performance", artifactIndex: 3 },
    ],
  },
  {
    id: "tmys",
    title: "Tell Me Your Story (TMYS)",
    category: "Imagination Labs",
    role: "Experimenter / AI Product Builder",
    goal:
      "Build an AI-native content platform that transforms user prompts into fully generated long form videos with character, voice and scene continuity",
    impactSectionLabel: "Accomplishments",
    impactBullets: [
      "Designed and prototyped a multi-agent AI pipeline for automated storytelling",
      "Validated feasibility of generating consistent characters, scenes, and narrative flow using GenAI",
      "Reduced manual video production effort by ~80 –90%",
      "Established foundation for a scalable AI content platform (YouTube-first distribution, SaaS potential)",
      "Automated the end-to-end pipeline from screenplay creation to final video production and distribution",
      "Building the consistency harness to overcome the limitations of the current diffusion models.",
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
    bottomLine:
      "Created a harness around video GenAI models for enforcing character, voice and scene continuity for long form videos",
    artifacts: [],
    artifactModalUndisclosed: true,
    artifactLinks: [
      { kind: "external", label: "Demo Video", url: "https://www.youtube.com/watch?v=YveTm6DmPWM" },
      { kind: "tmysMap", label: "TMYS Agentic Map" },
    ],
  },
  {
    id: "cptverse",
    title: "CPTVerse",
    category: "Imagination Labs",
    role: "Producer/Director",
    goal: "Create long-form animated videos based purely on Gen AI technologies",
    impact:
      "Generated a consistent web series around the adventure of three friends, Cid, Pat and Tim.",
    toolkit: ["Tell Me Your Story"],
    artifacts: [],
    artifactModalUndisclosed: true,
    artifactLinks: [
      {
        kind: "external",
        label: "Workflow Demo",
        url: "https://www.youtube.com/watch?v=p90oSo161jk",
      },
    ],
    layout: "inspirational-cartoons",
    inspirationalCartoonsOptions: {
      circularImages: true,
      hideQuotes: true,
      hideDescriptions: true,
      sharedYoutubeUrl: "https://www.youtube.com/@CPTVerse",
      revolvingSceneImages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
        (n) => `${CPTVERSE_SCENES_PORTFOLIO}/Scene${n}.png`
      ),
    },
    inspirationalCartoonsColumns: [
      {
        characterName: "Cid",
        image: `${INSPIRATIONAL_CARTOONS_PORTFOLIO}/CidWithBackground.png`,
        description: "",
        quotes: [],
        youtubeUrl: "",
      },
      {
        characterName: "Pat",
        image: `${INSPIRATIONAL_CARTOONS_PORTFOLIO}/PatWithBackground.png`,
        description: "",
        quotes: [],
        youtubeUrl: "",
      },
      {
        characterName: "Tim",
        image: `${INSPIRATIONAL_CARTOONS_PORTFOLIO}/TimWithBackground.png`,
        description: "",
        quotes: [],
        youtubeUrl: "",
      },
    ],
  },
  {
    id: "inspirational-cartoons",
    title: "WhimsyWorks Toon Studios",
    category: "Imagination Labs",
    role: "Chief Joy Arrchitect",
    goal: "Create delightful, emotionally engaging content experiences",
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
