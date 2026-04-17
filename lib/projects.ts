/**
 * Portfolio project data — keep in sync with app.py PROJECTS and CATEGORY_DESCRIPTIONS.
 */
export type ProjectCategory = "Products" | "Research" | "Fun Ventures"

export type ArtifactLink =
  | { kind: "external"; label: string; url: string }
  | { kind: "tmysMap"; label: string }

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
  /** Optional; shown in artifact modal footer. */
  skills?: string[]
  /** Artifact titles / image galleries for the modal. */
  artifacts: { title: string; description: string; images: string[] }[]
  /** Extra links for Fun Ventures (TMYS demo + architecture). */
  artifactLinks?: ArtifactLink[]
}

function artifactEntry(title: string, description = "", images: string[] = []) {
  return { title, description, images }
}

export const projects: Project[] = [
  {
    id: "neural-search",
    title: "Enterprise Semantic Search",
    category: "Products",
    goal: "Lead product strategy for a B2B semantic search platform that transforms how enterprises discover and retrieve internal knowledge.",
    impact:
      "Grew ARR from $0 to $4.2M in 18 months. Secured partnerships with 3 Fortune 500 companies.",
    role: "Product Lead",
    toolkit: [
      "Transformer Models",
      "Vector Embeddings",
      "Elasticsearch",
      "RAG Architecture",
      "Semantic Similarity",
      "Fine-tuning LLMs",
    ],
    artifacts: [artifactEntry("Product Roadmap & GTM Strategy")],
  },
  {
    id: "medical-imaging",
    title: "AI-Assisted Radiology Research",
    category: "Research",
    goal: "Collaborate with Stanford Medical on a research initiative to improve early detection of abnormalities in medical imaging using deep learning.",
    impact:
      "Published in Nature Medicine. Model achieved 94.2% sensitivity, now in clinical trials at 3 hospitals.",
    role: "Research PM",
    toolkit: [
      "Convolutional Neural Networks",
      "Image Segmentation",
      "Transfer Learning",
      "DICOM Processing",
      "Explainable AI",
      "Model Validation",
    ],
    artifacts: [artifactEntry("Research Publication & Findings")],
  },
  {
    id: "tmys",
    title: "Tell Me Your Story (TMYS)",
    category: "Fun Ventures",
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
  Research: "Academic collaborations and research initiatives.",
  "Fun Ventures": "Personal projects, hackathons, and weekend experiments.",
}
