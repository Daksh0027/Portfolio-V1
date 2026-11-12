export type StickyProject = {
  name: string;
  category: string;
  blurb: string;
  url: string;
  images: [string, string, string];
};

export const stickyProjects: StickyProject[] = [
  {
    name: "Greppa",
    category: "AI / DevTools",
    blurb:
      "Large-repository code intelligence engine. Indexes codebases with tree-sitter AST parsing into a symbol graph, ranks files with PageRank centrality, and answers questions via hybrid retrieval and a multi-step agent loop with file/line citations. FastAPI, Next.js 14, PostgreSQL/pgvector, Redis, Gemini.",
    url: "https://github.com/Daksh0027",
    images: [
      "/assets/Greppa/Screenshot 2026-10-19 201844.png",
      "/assets/Greppa/Screenshot 2026-10-19 203308.png",
      "/assets/Greppa/Screenshot 2026-10-19 203620.png",
    ],
  },
  {
    name: "OmniDocs",
    category: "AI / SaaS",
    blurb:
      "Multi-document RAG chat platform. Ingests PDFs/DOCX with OCR fallback and Gemini embeddings, combining vector and full-text search with reranking, streaming answers, and cross-document comparison tables. FastAPI, Next.js, Clerk, PostgreSQL/pgvector, Redis.",
    url: "https://github.com/Daksh0027",
    images: [
      "/assets/Omni/Screenshot 2026-10-19 205557.png",
      "/assets/Omni/Screenshot 2026-10-19 205711.png",
      "/assets/Omni/Screenshot 2026-10-19 205732.png",
    ],
  },
  {
    name: "Respectro",
    category: "Client",
    blurb:
      "Movie and TV discovery app on the TMDB API, built with React 19, Vite and Tailwind CSS 4. Parallel search, genre and media-type filters, infinite scroll, Clerk authentication and Appwrite-backed trending-search analytics.",
    url: "https://respectro.vercel.app/",
    images: [
      "/assets/images/Screenshot_2026-10-17_223843.png",
      "/assets/images/Screenshot_2026-10-17_223921.png",
      "/assets/images/image copy.png",
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Daksh0027" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daksh-shastri-5728b924a" },
  { label: "LeetCode", href: "https://leetcode.com/u/Daksh0027" },
  { label: "CodeChef", href: "https://www.codechef.com/users/gam_pearl_90" },
  { label: "Codeforces", href: "https://codeforces.com/profile/Daksh0027" },
];