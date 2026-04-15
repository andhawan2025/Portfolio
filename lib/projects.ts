export type ProjectCategory = "Products" | "Research" | "Fun Ventures"

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  goal: string
  impact: string
  role: string
  skills: string[]
  toolkit: string[]
  artifacts: {
    title: string
    description: string
    images: string[]
  }[]
}

export const projects: Project[] = [
  // PRODUCTS
  {
    id: "neural-search",
    title: "Enterprise Semantic Search",
    category: "Products",
    goal: "Lead product strategy for a B2B semantic search platform that transforms how enterprises discover and retrieve internal knowledge.",
    impact: "Grew ARR from $0 to $4.2M in 18 months. Secured partnerships with 3 Fortune 500 companies.",
    role: "Product Lead",
    skills: ["Product Strategy", "Enterprise Sales", "NLP/Search", "GTM"],
    toolkit: ["Transformer Models", "Vector Embeddings", "Elasticsearch", "RAG Architecture", "Semantic Similarity", "Fine-tuning LLMs"],
    artifacts: [
      {
        title: "Product Roadmap & GTM Strategy",
        description: "Strategic roadmap and go-to-market materials for enterprise launch.",
        images: [
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "predictive-maintenance",
    title: "Industrial AI Platform",
    category: "Products",
    goal: "Define and ship a predictive maintenance SaaS product for manufacturing, enabling factories to prevent equipment failures before they happen.",
    impact: "Reduced customer unplanned downtime by 63%. Product achieved $2.4M in annual cost savings for pilot customers.",
    role: "Senior PM",
    skills: ["B2B SaaS", "User Research", "IoT/ML", "Pricing Strategy"],
    toolkit: ["Time Series Forecasting", "Anomaly Detection", "LSTM Networks", "Sensor Data Pipelines", "Edge ML", "Predictive Analytics"],
    artifacts: [
      {
        title: "Customer Journey & Feature Specs",
        description: "User research synthesis, customer journey maps, and PRDs.",
        images: [
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "fraud-detection",
    title: "Real-time Fraud Shield",
    category: "Products",
    goal: "Launch a real-time fraud detection API for fintech companies, balancing security with seamless user experience.",
    impact: "Blocked $18M in fraudulent transactions across customer base. Achieved 99.7% precision with sub-100ms latency.",
    role: "Product Manager",
    skills: ["API Products", "Fintech", "Developer Experience", "Risk Analysis"],
    toolkit: ["Real-time ML Inference", "Gradient Boosting", "Feature Engineering", "Graph Neural Networks", "Behavioral Analytics", "Rule Engine Hybrid"],
    artifacts: [
      {
        title: "API Design & Integration Docs",
        description: "Developer experience research, API specifications, and partnership materials.",
        images: [
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "recommendation-engine",
    title: "Personalization Engine",
    category: "Products",
    goal: "Build and scale a personalization platform for e-commerce, driving revenue through intelligent product recommendations.",
    impact: "Increased client conversion rates by 22%. Platform now powers recommendations for 50M+ monthly active users.",
    role: "Product Lead",
    skills: ["E-commerce", "A/B Testing", "Personalization", "Growth"],
    toolkit: ["Collaborative Filtering", "Matrix Factorization", "Deep Learning Recommenders", "Multi-Armed Bandits", "Real-time Personalization", "CTR Prediction"],
    artifacts: [
      {
        title: "A/B Testing Framework & Results",
        description: "Experimentation strategy, test results, and optimization playbook.",
        images: [
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
        ]
      }
    ]
  },

  // RESEARCH / ACADEMIC
  {
    id: "medical-imaging",
    title: "AI-Assisted Radiology Research",
    category: "Research",
    goal: "Collaborate with Stanford Medical on a research initiative to improve early detection of abnormalities in medical imaging using deep learning.",
    impact: "Published in Nature Medicine. Model achieved 94.2% sensitivity, now in clinical trials at 3 hospitals.",
    role: "Research PM",
    skills: ["Healthcare AI", "Clinical Trials", "Stakeholder Mgmt", "Publications"],
    toolkit: ["Convolutional Neural Networks", "Image Segmentation", "Transfer Learning", "DICOM Processing", "Explainable AI", "Model Validation"],
    artifacts: [
      {
        title: "Research Publication & Findings",
        description: "Paper excerpts, model interpretability visualizations, and clinical trial design.",
        images: [
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "llm-safety",
    title: "LLM Safety & Alignment Study",
    category: "Research",
    goal: "Lead a cross-functional research initiative on LLM safety, developing frameworks for responsible AI deployment in enterprise contexts.",
    impact: "Framework adopted by 12 organizations. Presented findings at NeurIPS workshop.",
    role: "Research Lead",
    skills: ["AI Safety", "Policy", "Cross-functional Leadership", "Frameworks"],
    toolkit: ["RLHF", "Red Teaming", "Prompt Injection Detection", "Constitutional AI", "Evaluation Benchmarks", "Guardrails"],
    artifacts: [
      {
        title: "Safety Framework & Guidelines",
        description: "Research methodology, evaluation frameworks, and implementation guidelines.",
        images: [
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "synthetic-data",
    title: "Privacy-Preserving ML Research",
    category: "Research",
    goal: "Academic collaboration exploring synthetic data generation techniques for training ML models while preserving user privacy.",
    impact: "Paper accepted at ICML. Methodology enables GDPR-compliant ML training with 15% accuracy improvement.",
    role: "Co-Author",
    skills: ["Privacy/GDPR", "Academic Writing", "Data Strategy", "ML Research"],
    toolkit: ["Differential Privacy", "GANs for Synthetic Data", "Federated Learning", "Privacy Budgets", "Statistical Validation", "Data Augmentation"],
    artifacts: [
      {
        title: "Research Paper & Methodology",
        description: "Statistical analysis, privacy guarantees, and benchmark comparisons.",
        images: [
          "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop"
        ]
      }
    ]
  },

  // FUN VENTURES
  {
    id: "ai-chess",
    title: "Chess AI Companion",
    category: "Fun Ventures",
    goal: "Build a personal project: an AI chess coach that analyzes games, identifies weaknesses, and provides personalized training recommendations.",
    impact: "10K+ downloads on the app store. Featured in Chess.com newsletter. Improved my own rating by 200 points!",
    role: "Solo Creator",
    skills: ["Mobile Apps", "Game AI", "UX Design", "Community Building"],
    toolkit: ["Stockfish Integration", "Position Evaluation", "Move Tree Analysis", "Pattern Recognition", "Spaced Repetition", "Mobile ML"],
    artifacts: [
      {
        title: "App Screenshots & Architecture",
        description: "UI designs, analysis examples, and technical architecture.",
        images: [
          "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "music-generator",
    title: "AI Music Jam Session",
    category: "Fun Ventures",
    goal: "Hackathon project: create an AI that generates accompanying music in real-time based on a musician's live performance.",
    impact: "Won 1st place at AI Hackathon SF. Collaborated with local jazz musicians for demo performance.",
    role: "Hackathon Lead",
    skills: ["Rapid Prototyping", "Audio ML", "Team Leadership", "Pitching"],
    toolkit: ["Audio Feature Extraction", "MIDI Generation", "Real-time Inference", "Music Transformers", "Latency Optimization", "WebAudio API"],
    artifacts: [
      {
        title: "Demo Video & System Design",
        description: "Performance footage, system architecture, and audio samples.",
        images: [
          "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=500&fit=crop"
        ]
      }
    ]
  },
  {
    id: "pet-tracker",
    title: "AI Pet Behavior Tracker",
    category: "Fun Ventures",
    goal: "Weekend project to build a computer vision system that tracks my cat's daily activities and generates amusing daily reports.",
    impact: "Went viral on Twitter with 50K+ likes. Open-sourced with 2K GitHub stars. My cat is now internet famous.",
    role: "Weekend Hacker",
    skills: ["Computer Vision", "Open Source", "Viral Marketing", "Storytelling"],
    toolkit: ["Object Detection", "Pose Estimation", "Activity Classification", "Raspberry Pi", "TensorFlow Lite", "Real-time Video Processing"],
    artifacts: [
      {
        title: "Cat Analytics Dashboard",
        description: "Dashboard screenshots, activity charts, and the best cat photos.",
        images: [
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=500&fit=crop"
        ]
      }
    ]
  }
]

export const categoryDescriptions: Record<ProjectCategory, string> = {
  Products: "Commercial AI/ML products I've led from concept to launch",
  Research: "Academic collaborations and research initiatives",
  "Fun Ventures": "Personal projects, hackathons, and weekend experiments"
}
