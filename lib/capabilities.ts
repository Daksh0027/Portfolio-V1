export type Capability = {
  title: string;
  description: string;
  skills: string[];
  accent: string;
};

export const capabilities: Capability[] = [
  {
    title: "Frontend Engineering",
    description: "Building scalable, high-performance interfaces with a focus on precision and accessibility.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    accent: "#f15a24"
  },
  {
    title: "Interaction Design",
    description: "Creating fluid, natural motions that guide users through complex digital products.",
    skills: ["Framer Motion", "UX Strategy", "Interface Animation", "Prototyping"],
    accent: "#ffffff"
  },
  {
    title: "Technical Logic",
    description: "Applying algorithmic rigor to frontend challenges for optimal efficiency and stability.",
    skills: ["C++", "Competitive Programming", "Data Structures", "System Design"],
    accent: "#f15a24"
  }
];