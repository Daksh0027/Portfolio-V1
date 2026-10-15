export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  heroImage: string;
  problem: string;
  solution: string;
  process: {
    step: string;
    description: string;
  }[];
  gallery: {
    url: string;
    caption: string;
    span?: 'full' | 'half';
  }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "respectro": {
    slug: "respectro",
    title: "ReSpectro",
    category: "Entertainment",
    year: "2025",
    description: "A movie and series discovery platform with live TMDB data, Clerk authentication, and Appwrite-powered watchlists.",
    technologies: ["React", "Vite", "Appwrite", "TMDB API", "Clerk"],
    heroImage: "/assets/projects/SvHwomrHV9Xz6Z3MIiAAm6r3oo8.png",
    problem: "Users struggle to organize their watchlists across multiple streaming services and find curated discovery tools that feel modern and immersive.",
    solution: "A high-performance discovery engine that aggregates global media data and provides a seamless, authenticated experience for saving and sharing watchlists.",
    process: [
      { step: "Data Architecture", description: "Implemented a scalable schema in Appwrite to handle user-specific watchlists and real-time TMDB synchronization." },
      { step: "UX Design", description: "Focused on a 'cinema-first' aesthetic with high-contrast visuals and intuitive navigation patterns." },
      { step: "Authentication", description: "Integrated Clerk for secure, multi-platform auth with a frictionless onboarding flow." },
    ],
    gallery: [
      { url: "/assets/projects/YKBSWJgVfZKQhmyDFLvOCR3UC4.png", caption: "Main Discovery Interface", span: 'full' },
      { url: "/assets/projects/ laYRBJtoUJjw9Ny6sbSdzbQYZ0s.png", caption: "Watchlist Management", span: 'half' },
      { url: "/assets/projects/SvhwomrHV9Xz6Z3MIiAAm6r3oo8.png", caption: "Movie Detail View", span: 'half' },
    ],
  },
  "gemini-clone": {
    slug: "gemini-clone",
    title: "Gemini AI Interface",
    category: "AI / Productivity",
    year: "2025",
    description: "A responsive AI interface with live Gemini API responses, streaming output, and conversation history.",
    technologies: ["React", "Google Gemini API", "Tailwind CSS"],
    heroImage: "/assets/projects/vvoERIiw0GgbtamdY8x2Ayb4.png",
    problem: "Standard AI interfaces can feel static. The goal was to create a streaming, dynamic experience that mirrors a real-time conversation.",
    solution: "Implemented a custom streaming buffer to handle LLM tokens in real-time, coupled with a minimalist, distraction-free UI.",
    process: [
      { step: "API Integration", description: "Optimized the Gemini API pipeline to reduce latency and handle streaming responses efficiently." },
      { step: "Interface Design", description: "Created a clean, typography-driven layout that emphasizes the content of the AI response." },
    ],
    gallery: [
      { url: "/assets/projects/vvoERIiw0GgbtamdY8x2Ayb4.png", caption: "Streaming Response UI", span: 'full' },
      { url: "/assets/projects/BxN8xbjPQluCCwRiCfAeR4mZOU.png", caption: "Conversation History", span: 'half' },
      { url: "/assets/projects/EMzCU3Dl7SEaGsvsOse0gkf9Do.png", caption: "Responsive Mobile View", span: 'half' },
    ],
  },
  "library-system": {
    slug: "library-system",
    title: "Library Management System",
    category: "Operations / CLI",
    year: "2024",
    description: "A Python and MySQL management system for inventory, sales records, and store operations.",
    technologies: ["Python", "MySQL", "CLI"],
    heroImage: "/assets/projects/ laYRBJtoUJjw9Ny6sbSdzbQYZ0s.png",
    problem: "Small-scale libraries often rely on outdated manual records, leading to inventory errors and inefficient sales tracking.",
    solution: "Developed a robust CLI-based system with a normalized MySQL database to automate inventory tracking and sales reporting.",
    process: [
      { step: "Database Design", description: "Designed a relational schema to handle books, members, and transactions with ACID compliance." },
      { step: "Logic Implementation", description: "Built a command-driven interface for rapid data entry and retrieval." },
    ],
    gallery: [
      { url: "/assets/projects/ laYRBJtoUJjw9Ny6sbSdzbQYZ0s.png", caption: "Schema Design", span: 'full' },
      { url: "/assets/projects/ laYRBJtoUJjw9Ny6sbSdzbQYZ0s.png", caption: "CLI Interface", span: 'half' },
      { url: "/assets/projects/ laYRBJtoUJjw9Ny6sbSdzbQYZ0s.png", caption: "Report Generation", span: 'half' },
    ],
  },
};
