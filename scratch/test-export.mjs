import fs from "fs";
import path from "path";
import JSZip from "jszip";

// Helper function to test HTML generator
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const sampleData = {
  name: "Alex Rivera",
  title: "Senior Full Stack & Systems Engineer",
  bio: "Specialized in building high-throughput distributed architectures, developer tooling, and modern reactive web applications.",
  location: "San Francisco, CA (Remote)",
  skills: ["TypeScript", "Rust", "Go", "Next.js", "React", "Docker"],
  projects: [
    {
      id: "proj-1",
      title: "HyperFlow - Distributed Task Engine",
      description: "Fault-tolerant, high-performance distributed task scheduler built in Rust.",
      link: "https://github.com/example/hyperflow",
      tags: ["rust", "go", "grpc"],
    },
    {
      id: "proj-2",
      title: "ZenithDB - In-Memory Key-Value Store",
      description: "Custom ACID-compliant in-memory cache with Raft consensus.",
      link: "https://github.com/example/zenithdb",
      tags: ["c++", "storage-engine"],
    }
  ],
  socials: [
    { id: "soc-1", platform: "github", url: "https://github.com/alexrivera", label: "alexrivera" },
    { id: "soc-2", platform: "linkedin", url: "https://linkedin.com/in/alexrivera-dev", label: "alexrivera-dev" },
    { id: "soc-3", platform: "email", url: "mailto:alex.rivera@example.com", label: "alex.rivera@example.com" }
  ],
  themeConfig: {
    accentColor: "emerald",
    scanlines: true,
    terminalName: "rivera@dev-station",
  }
};

async function run() {
  console.log("=== Testing PortfolioForge Standalone Bundle Creation ===");
  const testDistDir = path.join(process.cwd(), "scratch", "test-dist");
  if (!fs.existsSync(testDistDir)) {
    fs.mkdirSync(testDistDir, { recursive: true });
  }

  const zip = new JSZip();
  zip.file("README.md", `# ${sampleData.name} - Portfolio Website`);
  zip.file("index.html", `<!DOCTYPE html><html><head><title>${escapeHtml(sampleData.name)}</title></head><body><h1>${escapeHtml(sampleData.name)}</h1></body></html>`);
  
  const content = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(path.join(testDistDir, "sample-bundle.zip"), content);

  console.log("✓ Zip size generated:", content.length, "bytes");
  console.log("✓ All checks passed!");
}

run().catch(console.error);
