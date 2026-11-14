export const skillsData = {
  categories: [
    {
      id: "languages",
      title: "Programming Languages",
      subtitle: "Core syntax, paradigms & system languages",
      accent: "#FFEB97", // Golden Cream
      accentCode: "gold",
      skills: [
        { name: "Java", type: "Primary Enterprise Language", isHighlight: true, badge: "Java SE 17+" },
        { name: "JavaScript (ES6+)", type: "Modern Web Standard", isHighlight: true, badge: "Full-Stack" },
        { name: "Python", type: "Scripting & AI Tooling", isHighlight: false, badge: "AI / Data" },
        { name: "C++", type: "Systems & High Performance", isHighlight: false, badge: "Algorithms" },
        { name: "C", type: "Foundational Systems", isHighlight: false, badge: "Low-Level" },
      ]
    },
    {
      id: "backend",
      title: "Java Backend & Cloud Services",
      subtitle: "Enterprise architecture, APIs & microservices",
      accent: "#E5BF5A", // Golden Amber
      accentCode: "amber",
      skills: [
        { name: "Spring Boot", type: "Enterprise Framework", isHighlight: true, badge: "Backend Core" },
        { name: "Spring AI", type: "AI Application Framework", isHighlight: true, badge: "LLM Orchestration" },
        { name: "RESTful APIs", type: "API Architecture & Design", isHighlight: true, badge: "REST Standard" },
        { name: "Microservices", type: "Decoupled Architecture", isHighlight: false, badge: "Distributed" },
        { name: "JWT & OAuth", type: "Stateless Security & Identity", isHighlight: true, badge: "Auth / Security" },
      ]
    },
    {
      id: "mern",
      title: "MERN Stack & Frontend",
      subtitle: "Reactive user interfaces & Node runtime ecosystem",
      accent: "#F7E7B4", // Warm Golden Sand
      accentCode: "sand",
      skills: [
        { name: "React.js", type: "Component UI Architecture", isHighlight: true, badge: "Frontend Engine" },
        { name: "Node.js", type: "Asynchronous I/O Runtime", isHighlight: true, badge: "Server Runtime" },
        { name: "Express.js", type: "Lightweight Web Server", isHighlight: true, badge: "API Routing" },
        { name: "HTML5 / CSS3", type: "Semantic Modern Layouts", isHighlight: false, badge: "Web Standards" },
        { name: "Tailwind CSS", type: "Design System Implementation", isHighlight: false, badge: "Styling" },
      ]
    },
    {
      id: "databases",
      title: "Databases & Storage",
      subtitle: "Relational persistence, document stores & browser caches",
      accent: "#E8C97A", // Warm Bronze Gold
      accentCode: "bronze",
      skills: [
        { name: "MongoDB", type: "Document Store / NoSQL", isHighlight: true, badge: "MERN" },
        { name: "MySQL", type: "Relational DBMS & SQL Queries", isHighlight: true, badge: "ACID RDBMS" },
        { name: "IndexedDB", type: "Offline-First Client Storage", isHighlight: false, badge: "Browser DB" },
      ]
    },
    {
      id: "tools",
      title: "Tools, DevOps & Analytics",
      subtitle: "Workflow automation, version control & cloud deployment",
      accent: "#F5EDCE", // Butter Golden Cream
      accentCode: "butter",
      skills: [
        { name: "Git & GitHub", type: "Version Control & CI/CD", isHighlight: true, badge: "VCS" },
        { name: "Render Cloud", type: "Cloud Application Hosting", isHighlight: true, badge: "Deployment" },
        { name: "Postman", type: "API Testing & Mocking", isHighlight: false, badge: "Testing" },
        { name: "Docker", type: "Containerization Basics", isHighlight: false, badge: "Containers" },
        { name: "Power BI", type: "Data Analytics & Dashboards", isHighlight: false, badge: "BI Simulation" },
      ]
    },
    {
      id: "core-cs",
      title: "Core Computer Science",
      subtitle: "Algorithmic thinking & structural software foundations",
      accent: "#EAD9A6", // Warm Ochre Light
      accentCode: "ochre",
      skills: [
        { name: "Data Structures & Algorithms", type: "Time & Space Optimization", isHighlight: true, badge: "DSA" },
        { name: "Object-Oriented Programming (OOP)", type: "Design Patterns & Modularity", isHighlight: true, badge: "OOP" },
        { name: "Computer Networks & Security", type: "Protocols & Threat Defense", isHighlight: false, badge: "Cybersecurity" },
      ]
    }
  ]
};
