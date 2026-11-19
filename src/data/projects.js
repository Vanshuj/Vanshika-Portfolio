export const projectsData = [
  {
    id: "pixel-arena",
    number: "01",
    title: "Pixel-Arena",
    tagline: "Competitive Image Similarity Game Platform",
    category: "Full-Stack Web Application",
    type: "Individual Project",
    year: "2026",
    role: "Full-Stack Engineer & Middleware Architect",
    summary: "A real-time competitive gaming platform that challenges users to match reference imagery, featuring custom image-comparison middleware for pixel-level similarity scoring, live leaderboards, and centralized admin controls.",
    
    screenshot: null,
    additionalScreenshots: [],
    demoUrl: "https://pixel-arena-1.onrender.com",
    videoUrl: "./videos/pixel-arena-demo.mp4",
    githubUrl: "https://github.com/Vanshuj/Pixel-Arena",
    
    status: "Production Ready / Deployed on Render",
    accentColor: "#FFEB97", // Golden Cream
    badgeColor: "#583714", // Deep Warm Brown
    
    technologies: [
      "Node.js",
      "Express.js",
      "JavaScript (ES6+)",
      "imageCompare.js",
      "RESTful APIs",
      "Render Cloud",
      "CSS3",
      "HTML5"
    ],

    highlights: [
      "Engineered custom image-comparison middleware (imageCompare.js) calculating pixel-level similarity scores",
      "Developed high-throughput RESTful APIs for real-time game state, submission tracking, and automated scoring",
      "Built dynamic live leaderboards with atomic score updates and low-latency cache management",
      "Architected centralized administrative control panel for game room moderation and asset pipelines",
      "Cloud deployment with persistent uptime configuration on Render"
    ],

    caseStudy: {
      problem: "Traditional competitive image-based gaming platforms rely on subjective human voting or heavy, opaque machine learning APIs that introduce severe latency and prohibitive cost for instantaneous round scoring.",
      solution: "Designed and engineered an ultra-fast, deterministic client-server architecture utilizing custom lightweight canvas and pixel-comparison algorithms (imageCompare.js) to compute mathematical variance and similarity percentages within milliseconds.",
      architecture: [
        "Express RESTful API routing requests for game creation, room tokens, and player sessions",
        "Dedicated image-comparison middleware that decodes image buffers, normalizes aspect ratios, and evaluates pixel matrix color distances",
        "Score calculation engine generating cryptographic submission proofs to prevent replay attacks and spoofing",
        "Render cloud runtime with environment-driven CORS configuration and error-handling pipelines"
      ],
      contributions: [
        "Sole engineer across frontend UI, scoring engine, and server architecture",
        "Wrote imageCompare.js from scratch optimizing array buffer iterations for 60fps responsiveness",
        "Constructed automated test cases validating scoring thresholds under varying image compression levels"
      ]
    }
  },
  {
    id: "kathavani",
    number: "02",
    title: "KathaVani",
    tagline: "Interactive Cultural Storytelling Hub",
    category: "Interactive Narrative Engine & PWA",
    type: "Individual / Full-Stack Project",
    year: "2026",
    role: "Frontend Architect & Narrative Systems Developer",
    summary: "An interactive branching narrative platform enabling cultural creators to craft non-linear folklore and interactive stories with dynamic story trees, multi-lingual speech narration, and offline-first client storage.",
    
    screenshot: null,
    additionalScreenshots: [],
    demoUrl: "https://kathavani-frontend.onrender.com",
    videoUrl: "./videos/kathavani-demo.mp4",
    githubUrl: "https://github.com/Vanshuj/KathaVani",
    
    status: "Active / PWA Enabled",
    accentColor: "#E5BF5A", // Golden Amber
    badgeColor: "#7B4F1F", // Warm Brown Mid
    
    technologies: [
      "React.js",
      "Web Speech API",
      "Service Workers",
      "IndexedDB",
      "Tailwind CSS",
      "JavaScript (ES6+)",
      "HTML5"
    ],

    highlights: [
      "Built an interactive branching narrative engine in React enabling non-linear storyline trees with stateful backtracking",
      "Integrated multilingual speech synthesis and recognition using native browser Web Speech APIs",
      "Implemented resilient offline-first synchronization using Service Workers and IndexedDB persistence",
      "Designed an accessible, tactile liquid-glass reader interface celebrating oral and literary traditions",
      "Provided creators with visual node graph editing tools to map complex choices and consequence pathways"
    ],

    caseStudy: {
      problem: "Traditional oral folklore and non-linear cultural literature risk fading without accessible digital storytelling mediums, while existing digital story readers require constant high-speed connectivity and lack native voice narration.",
      solution: "Constructed KathaVani as a progressive, offline-first web experience where branching story graphs can be read, listened to in regional voices, and navigated with instantaneous branch switching even in zero-connectivity environments.",
      architecture: [
        "React state machine modeling narrative nodes, prerequisite inventories, and visited branch history",
        "Web Speech API synthesis adapter providing fluid voice pacing, pitch control, and bilingual dialect support",
        "Service Worker cache-first network strategy paired with IndexedDB client database for full offline story persistence",
        "Modular CSS glass layer designed for distraction-free typography and high readability across screen sizes"
      ],
      contributions: [
        "Architected recursive tree-traversal engine allowing undo/redo decision mechanics without data loss",
        "Authored custom hook suite for Web Speech API lifecycle management handling mobile background interruptions",
        "Implemented offline-first IndexedDB schema migrations"
      ]
    }
  },
  {
    id: "gyan-ai",
    number: "03",
    title: "GYAN.AI",
    tagline: "Technical Video Notes & Interactive Knowledge Graph Platform",
    category: "Full-Stack Web Platform",
    type: "Full-Stack Engineering Project",
    year: "2026",
    role: "Full-Stack Systems Engineer",
    summary: "An intelligent study and research engine that ingests technical lectures, documentation, and complex subjects to synthesize exam-ready notes, timestamped summaries, interactive knowledge graphs, and multi-format document exports.",
    
    screenshot: null,
    additionalScreenshots: [],
    demoUrl: "https://gyan-ai-mbtq.onrender.com/",
    videoUrl: "./videos/gyan-ai-demo.mp4",
    githubUrl: "https://github.com/vansh16soni/GYAN.AI",
    
    status: "Production Ready / Deployed on Render",
    accentColor: "#F6E6CE", // Golden Peach
    badgeColor: "#36210A", // Warm Dark Brown
    
    technologies: [
      "React.js",
      "React Flow",
      "ELK.js",
      "Node.js",
      "Express.js",
      "Natural Language Processing",
      "RESTful Ingestion Pipelines",
      "JWT Authentication",
      "PDF & DOCX Exporters"
    ],

    highlights: [
      "Orchestrated high-throughput transcript extraction and content processing pipelines for technical lecture indexing",
      "Converted complex video lectures into structured, timestamped markdown study guides and flashcards",
      "Implemented interactive directed concept graphs using React Flow and ELK.js hierarchical DAG layouts",
      "Built secure JWT authentication with encrypted user sessions and personalized preference matrices",
      "Enabled high-fidelity document exports directly to PDF, DOCX, and Markdown formats"
    ],

    caseStudy: {
      problem: "Engineers and students spend hundreds of hours watching dense technical lectures without an efficient means to index concepts, review contextual timestamps, or visualize prerequisite topic relationships visually.",
      solution: "Developed GYAN.AI to automate technical content ingestion, extracting transcripts, applying structured natural language parsing pipelines, and rendering concept graphs with node navigation and document compilation.",
      architecture: [
        "Backend ingestion pipeline extracting video audio/transcripts and batching chunks for content synthesis",
        "Multi-endpoint routing switch querying high-throughput services for parsing and deep synthesis",
        "Graph orchestration micro-module computing directed acyclic graphs via ELK.js layout algorithms and rendered through React Flow",
        "Export pipeline transforming dynamic AST (Abstract Syntax Tree) notes into formatted PDF and DOCX files"
      ],
      contributions: [
        "Designed the reactive frontend interface incorporating liquid glass node cards and graph zooming controls",
        "Authored the backend token-budgeting algorithm to optimize context windows across API providers",
        "Integrated secure JWT auth flow with refresh tokens and session storage"
      ]
    }
  }
];
