from flask import Flask, render_template, send_file


app = Flask(__name__)
PROFILE_IMAGE_PATH = (
    r"C:\Users\andha\.cursor\projects\d-srcCode\assets\c__Users_andha_AppData_"
    r"Roaming_Cursor_User_workspaceStorage_42e7ca6935e8e34c378e812572766b64_"
    r"images_Anubhav_Dhawan-08b5f55e-efaa-4ced-8e14-64be2185c157.png"
)


# When using the Next app, mirror changes in lib/projects.ts (single source of truth for the Node site).
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
        "id": "tmys",
        "title": "Tell Me Your Story (TMYS)",
        "category": "Passion Projects",
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
    "Passion Projects": "",
}

# Hero stat cards — keep in sync with `lib/hero-stats.ts` for the Next app.
HERO_STATS = [
    {"value": "10+", "label": "AI/ML Products Shipped"},
    {"value": "20+", "label": "ML Models Built and Evaluated"},
    {"value": "50+", "label": "AI Use Cases Delivered"},
    {"value": "50%+", "label": "Efficiency Gains"},
]


@app.route("/")
def home():
    categories = ["Products", "Research", "Passion Projects"]
    grouped = {category: [] for category in categories}
    for project in PROJECTS:
        grouped[project["category"]].append(project)

    return render_template(
        "index.html",
        categories=categories,
        grouped_projects=grouped,
        category_descriptions=CATEGORY_DESCRIPTIONS,
        hero_stats=HERO_STATS,
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
