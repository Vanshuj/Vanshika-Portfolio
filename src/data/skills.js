export const skillsData = {
  categories: [
    {
      id: "languages",
      title: "Languages",
      subtitle: "Programming & systems foundations",
      accent: "#FFEB97", // Golden Cream
      accentCode: "gold",
      skills: [
        { name: "Java", type: "Object-Oriented Enterprise Language", isHighlight: true, badge: "Core Language" },
        { name: "JavaScript", type: "Full-Stack Web & Runtime Standard", isHighlight: true, badge: "ES6+" },
        { name: "Python", type: "Scripting, Automation & Data Pipelines", isHighlight: false, badge: "Scripting" },
        { name: "C++", type: "Systems Programming & Problem Solving", isHighlight: false, badge: "Core CS" },
        { name: "C", type: "Foundational Procedural Language", isHighlight: false, badge: "Low-Level" },
      ]
    },
    {
      id: "mern",
      title: "MERN Stack",
      subtitle: "Reactive full-stack web architectures",
      accent: "#F7E7B4", // Warm Golden Sand
      accentCode: "sand",
      skills: [
        { name: "React.js", type: "Component UI Architecture & Hooks", isHighlight: true, badge: "Frontend Engine" },
        { name: "Node.js", type: "Asynchronous Event-Driven Runtime", isHighlight: true, badge: "Server Runtime" },
        { name: "Express.js", type: "Lightweight REST API Framework", isHighlight: true, badge: "API Routing" },
        { name: "MongoDB", type: "NoSQL Document Database", isHighlight: true, badge: "Data Layer" },
      ]
    },
    {
      id: "backend",
      title: "Java Backend",
      subtitle: "Enterprise REST services & Microservices",
      accent: "#E5BF5A", // Golden Amber
      accentCode: "amber",
      skills: [
        { name: "Spring Boot", type: "Robust Enterprise Backend Framework", isHighlight: true, badge: "Enterprise Core" },
        { name: "Spring Security", type: "Role-Based Access Control & JWT", isHighlight: true, badge: "Security" },
        { name: "REST APIs", type: "Stateless RESTful Service Architecture", isHighlight: true, badge: "REST Standard" },
      ]
    },
    {
      id: "auth",
      title: "Authentication",
      subtitle: "Stateless security & identity workflows",
      accent: "#EAD9A6", // Warm Ochre Light
      accentCode: "ochre",
      skills: [
        { name: "JWT", type: "JSON Web Tokens & Stateless Auth", isHighlight: true, badge: "Token Auth" },
        { name: "GitHub OAuth", type: "OAuth 2.0 Third-Party Authentication", isHighlight: true, badge: "OAuth 2.0" },
      ]
    },
    {
      id: "tools",
      title: "Databases & Tools",
      subtitle: "Storage, cloud deployment & analytics",
      accent: "#E8C97A", // Warm Bronze Gold
      accentCode: "bronze",
      skills: [
        { name: "MySQL", type: "Relational DBMS & Structured Queries", isHighlight: true, badge: "RDBMS" },
        { name: "MongoDB", type: "Schema Design & Document Storage", isHighlight: true, badge: "NoSQL" },
        { name: "Git & GitHub", type: "Version Control & Project Collaboration", isHighlight: true, badge: "VCS" },
        { name: "Render", type: "Cloud Application Hosting & CI/CD", isHighlight: false, badge: "Deployment" },
        { name: "Power BI", type: "Executive Data Visualization & Dashboards", isHighlight: false, badge: "Analytics" },
      ]
    },
    {
      id: "core-cs",
      title: "Core CS",
      subtitle: "Algorithmic thinking & design principles",
      accent: "#F5EDCE", // Butter Golden Cream
      accentCode: "butter",
      skills: [
        { name: "Data Structures & Algorithms", type: "Time & Space Optimization", isHighlight: true, badge: "DSA" },
        { name: "Object-Oriented Programming (OOP)", type: "Encapsulation, Inheritance & Modularity", isHighlight: true, badge: "OOP" },
      ]
    }
  ]
};
