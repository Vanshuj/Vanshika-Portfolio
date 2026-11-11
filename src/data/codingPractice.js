export const codingPracticeData = {
  notebookTitle: "Engineering Practice & Algorithmic Notes",
  lead: "Disciplined problem-solving, data structure patterns, and architectural paradigms documented across competitive programming and GitHub repositories.",
  
  categories: [
    {
      code: "DSA-01",
      name: "Arrays & Dynamic Programming",
      focus: "Prefix sums, two-pointers, sliding window, state transitions",
      notes: "Optimal space memoization strategies and tabular subproblem formulations.",
      repoTag: "Algorithms"
    },
    {
      code: "DSA-02",
      name: "Trees & Graph Traversal",
      focus: "BFS/DFS, Topological Sort, Directed Acyclic Graphs, Shortest Path",
      notes: "Applied directly to KathaVani story tree engines and GYAN.AI concept graph topologies.",
      repoTag: "Graph Theory"
    },
    {
      code: "DSA-03",
      name: "Recursion & Backtracking",
      focus: "Permutations, combinations, constraint satisfaction problems",
      notes: "State undo/redo logic implemented in branching narrative engines.",
      repoTag: "Backtracking"
    },
    {
      code: "SYS-04",
      name: "Object-Oriented Design & Clean Architecture",
      focus: "SOLID principles, factory & observer patterns, separation of concerns",
      notes: "Decoupled service layers and clean controller interfaces in Spring Boot & Express.",
      repoTag: "System Design"
    }
  ],

  repositories: [
    {
      id: "repo-pixel-arena",
      name: "Pixel-Arena",
      description: "Competitive image-similarity gaming backend and custom comparison middleware.",
      language: "JavaScript / Node",
      url: "https://github.com/Vanshuj/Pixel-Arena",
      topics: ["middleware", "gaming-api", "image-comparison", "render"]
    },
    {
      id: "repo-kathavani",
      name: "KathaVani",
      description: "Branching narrative engine with Web Speech API integration and offline storage.",
      language: "JavaScript / React",
      url: "https://github.com/Vanshuj/KathaVani",
      topics: ["react", "web-speech-api", "service-worker", "indexeddb"]
    },
    {
      id: "repo-gyan-ai",
      name: "GYAN.AI",
      description: "AI technical note synthesizer with React Flow knowledge graphs and LLM pipelines.",
      language: "JavaScript / Python",
      url: "https://github.com/Vanshuj/GYAN.AI",
      topics: ["gemini-api", "groq", "react-flow", "jwt-auth"]
    }
  ],

  principles: [
    {
      index: "01",
      title: "Clarity over Cleverness",
      detail: "Readable, self-documenting code with predictable side-effect boundaries always beats dense syntactic tricks."
    },
    {
      index: "02",
      title: "Algorithmic Invariants",
      detail: "Verify loop invariants, edge conditions (empty inputs, singletons, overflows), and asymptotic bounds early."
    },
    {
      index: "03",
      title: "Resilient Error Boundaries",
      detail: "Anticipate failure modes across network partitions, unparsable payloads, and external service outages."
    }
  ]
};
