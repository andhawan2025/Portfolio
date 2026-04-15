from flask import Flask, render_template, send_file


app = Flask(__name__)
PROFILE_IMAGE_PATH = (
    r"C:\Users\andha\.cursor\projects\d-srcCode\assets\c__Users_andha_AppData_"
    r"Roaming_Cursor_User_workspaceStorage_42e7ca6935e8e34c378e812572766b64_"
    r"images_Anubhav_Dhawan-08b5f55e-efaa-4ced-8e14-64be2185c157.png"
)


PROJECTS = [
    {
        "id": "neural-search",
        "title": "Enterprise Semantic Search",
        "category": "Products",
        "goal": "Lead product strategy for a B2B semantic search platform that transforms how enterprises discover and retrieve internal knowledge.",
        "impact": "Grew ARR from $0 to $4.2M in 18 months. Secured partnerships with 3 Fortune 500 companies.",
        "role": "Product Lead",
        "toolkit": [
            "Transformer Models",
            "Vector Embeddings",
            "Elasticsearch",
            "RAG Architecture",
            "Semantic Similarity",
            "Fine-tuning LLMs",
        ],
        "artifact": "Product Roadmap & GTM Strategy",
    },
    {
        "id": "predictive-maintenance",
        "title": "Industrial AI Platform",
        "category": "Products",
        "goal": "Define and ship a predictive maintenance SaaS product for manufacturing, enabling factories to prevent equipment failures before they happen.",
        "impact": "Reduced customer unplanned downtime by 63%. Product achieved $2.4M in annual cost savings for pilot customers.",
        "role": "Senior PM",
        "toolkit": [
            "Time Series Forecasting",
            "Anomaly Detection",
            "LSTM Networks",
            "Sensor Data Pipelines",
            "Edge ML",
            "Predictive Analytics",
        ],
        "artifact": "Customer Journey & Feature Specs",
    },
    {
        "id": "fraud-detection",
        "title": "Real-time Fraud Shield",
        "category": "Products",
        "goal": "Launch a real-time fraud detection API for fintech companies, balancing security with seamless user experience.",
        "impact": "Blocked $18M in fraudulent transactions across customer base. Achieved 99.7% precision with sub-100ms latency.",
        "role": "Product Manager",
        "toolkit": [
            "Real-time ML Inference",
            "Gradient Boosting",
            "Feature Engineering",
            "Graph Neural Networks",
            "Behavioral Analytics",
            "Rule Engine Hybrid",
        ],
        "artifact": "API Design & Integration Docs",
    },
    {
        "id": "recommendation-engine",
        "title": "Personalization Engine",
        "category": "Products",
        "goal": "Build and scale a personalization platform for e-commerce, driving revenue through intelligent product recommendations.",
        "impact": "Increased client conversion rates by 22%. Platform now powers recommendations for 50M+ monthly active users.",
        "role": "Product Lead",
        "toolkit": [
            "Collaborative Filtering",
            "Matrix Factorization",
            "Deep Learning Recommenders",
            "Multi-Armed Bandits",
            "Real-time Personalization",
            "CTR Prediction",
        ],
        "artifact": "A/B Testing Framework & Results",
    },
    {
        "id": "medical-imaging",
        "title": "AI-Assisted Radiology Research",
        "category": "Research",
        "goal": "Collaborate with Stanford Medical on a research initiative to improve early detection of abnormalities in medical imaging using deep learning.",
        "impact": "Published in Nature Medicine. Model achieved 94.2% sensitivity, now in clinical trials at 3 hospitals.",
        "role": "Research PM",
        "toolkit": [
            "Convolutional Neural Networks",
            "Image Segmentation",
            "Transfer Learning",
            "DICOM Processing",
            "Explainable AI",
            "Model Validation",
        ],
        "artifact": "Research Publication & Findings",
    },
    {
        "id": "llm-safety",
        "title": "LLM Safety & Alignment Study",
        "category": "Research",
        "goal": "Lead a cross-functional research initiative on LLM safety, developing frameworks for responsible AI deployment in enterprise contexts.",
        "impact": "Framework adopted by 12 organizations. Presented findings at NeurIPS workshop.",
        "role": "Research Lead",
        "toolkit": [
            "RLHF",
            "Red Teaming",
            "Prompt Injection Detection",
            "Constitutional AI",
            "Evaluation Benchmarks",
            "Guardrails",
        ],
        "artifact": "Safety Framework & Guidelines",
    },
    {
        "id": "synthetic-data",
        "title": "Privacy-Preserving ML Research",
        "category": "Research",
        "goal": "Academic collaboration exploring synthetic data generation techniques for training ML models while preserving user privacy.",
        "impact": "Paper accepted at ICML. Methodology enables GDPR-compliant ML training with 15% accuracy improvement.",
        "role": "Co-Author",
        "toolkit": [
            "Differential Privacy",
            "GANs for Synthetic Data",
            "Federated Learning",
            "Privacy Budgets",
            "Statistical Validation",
            "Data Augmentation",
        ],
        "artifact": "Research Paper & Methodology",
    },
    {
        "id": "tmys",
        "title": "Tell Me Your Story (TMYS)",
        "category": "Fun Ventures",
        "role": "Experimenter / AI Product Builder",
        "goal": (
            "Build an AI-native content platform that transforms user prompts into fully "
            "generated video stories with character consistency — automating the end-to-end pipeline from screenplay "
            "creation to final video production and distribution."
        ),
        "impact_bullets": [
            "Designed and prototyped a multi-agent AI pipeline for automated storytelling",
            "Validated feasibility of generating consistent characters, scenes, and narrative "
            "flow using GenAI",
            "Reduced manual video production effort by ~80 –90%",
            "Established foundation for a scalable AI content platform "
            "(YouTube-first distribution, SaaS potential)",
        ],
        "toolkit": [
            "Text-To-Image",
            "Image-To-Video",
            "Agentic Architecture",
            "GPT-4o",
            "Google Veo-3",
            "Nano Banana",
            "Agentic Evaluation",
            "YouTube Publishing",
        ],
        "artifact_links": [
            {
                "label": "Demo Video",
                "url": "https://www.youtube.com/watch?v=YveTm6DmPWM",
                "external": True,
            },
            {"label": "TMYS Agentic Map", "modal": True},
        ],
    },
]


CATEGORY_DESCRIPTIONS = {
    "Products": "Commercial AI/ML products led from concept to launch.",
    "Research": "Academic collaborations and research initiatives.",
    "Fun Ventures": "Personal projects, hackathons, and weekend experiments.",
}


@app.route("/")
def home():
    categories = ["Products", "Research", "Fun Ventures"]
    grouped = {category: [] for category in categories}
    for project in PROJECTS:
        grouped[project["category"]].append(project)

    return render_template(
        "index.html",
        categories=categories,
        grouped_projects=grouped,
        category_descriptions=CATEGORY_DESCRIPTIONS,
    )


@app.route("/profile-photo")
def profile_photo():
    return send_file(PROFILE_IMAGE_PATH, mimetype="image/png")


@app.route("/tmys-architecture")
def tmys_architecture():
    """Agent map shown in portfolio modal; keep in sync with templates/TMYSAgentMap.html."""
    return render_template("TMYSArchitecture.html")


if __name__ == "__main__":
    app.run(debug=True)
