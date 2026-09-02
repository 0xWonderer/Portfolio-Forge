import { PortfolioData } from "@/types/portfolio";

export const samplePortfolioData: PortfolioData = {
  name: "Alex Rivera",
  title: "Senior Full Stack & Systems Engineer",
  bio: "Specialized in building high-throughput distributed architectures, developer tooling, and modern reactive web applications. Passionate about low-latency systems, elegant Unix tools, and resilient software design.",
  location: "San Francisco, CA (Remote)",
  skills: [
    "TypeScript",
    "Rust",
    "Go",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Tailwind CSS",
  ],
  projects: [
    {
      id: "proj-1",
      title: "HyperFlow - Distributed Task Engine",
      description: "Fault-tolerant, high-performance distributed task scheduler and orchestration engine built in Rust and Go with real-time gRPC streaming and sub-millisecond job scheduling.",
      link: "https://github.com/example/hyperflow",
      tags: ["rust", "go", "grpc", "distributed-systems", "redis"],
    },
    {
      id: "proj-2",
      title: "ZenithDB - In-Memory Key-Value Store",
      description: "Custom ACID-compliant in-memory cache and persistent key-value store with AOF logging, Raft consensus clustering, and RESP protocol support.",
      link: "https://github.com/example/zenithdb",
      tags: ["c++", "concurrency", "raft", "storage-engine"],
    },
    {
      id: "proj-3",
      title: "AuraUI - Terminal Design System",
      description: "Accessible, keyboard-first React component library that emulates terminal interfaces and HUD dashboards with 60 FPS canvas animations.",
      link: "https://github.com/example/auraui",
      tags: ["typescript", "react", "tailwind", "design-system"],
    },
  ],
  socials: [
    {
      id: "soc-1",
      platform: "github",
      url: "https://github.com/alexrivera",
      label: "alexrivera",
    },
    {
      id: "soc-2",
      platform: "linkedin",
      url: "https://linkedin.com/in/alexrivera-dev",
      label: "alexrivera-dev",
    },
    {
      id: "soc-3",
      platform: "twitter",
      url: "https://x.com/alexrivera_dev",
      label: "@alexrivera_dev",
    },
    {
      id: "soc-4",
      platform: "email",
      url: "mailto:alex.rivera@example.com",
      label: "alex.rivera@example.com",
    },
    {
      id: "soc-5",
      platform: "website",
      url: "https://alexrivera.dev",
      label: "alexrivera.dev",
    },
  ],
  themeConfig: {
    accentColor: "emerald",
    scanlines: true,
    terminalName: "rivera@dev-station",
  },
};

export const emptyPortfolioData: PortfolioData = {
  name: "",
  title: "",
  bio: "",
  location: "",
  skills: [],
  projects: [],
  socials: [],
  themeConfig: {
    accentColor: "emerald",
    scanlines: true,
    terminalName: "guest@terminal",
  },
};
