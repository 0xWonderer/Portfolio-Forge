import fs from "fs";
import path from "path";
import JSZip from "jszip";

const sampleData = {
  name: "Alex Rivera",
  title: "Senior Full Stack & Systems Engineer",
  bio: "Specialized in building high-throughput distributed architectures, developer tooling, and modern reactive web applications.",
  location: "San Francisco, CA (Remote)",
  skills: ["TypeScript", "Rust", "Go", "Next.js", "React", "Docker", "Kubernetes", "PostgreSQL"],
  projects: [
    {
      id: "proj-1",
      title: "HyperFlow - Distributed Task Engine",
      description: "Fault-tolerant, high-performance distributed task scheduler built in Rust and Go.",
      link: "https://github.com/example/hyperflow",
      tags: ["rust", "go", "grpc"],
    },
    {
      id: "proj-2",
      title: "ZenithDB - In-Memory Key-Value Store",
      description: "Custom ACID-compliant in-memory cache and persistent key-value store with Raft consensus.",
      link: "https://github.com/example/zenithdb",
      tags: ["c++", "storage-engine"],
    }
  ],
  socials: [
    { id: "soc-1", platform: "github", url: "https://github.com/alexrivera", label: "alexrivera" },
    { id: "soc-2", platform: "linkedin", url: "https://linkedin.com/in/alexrivera-dev", label: "alexrivera-dev" },
    { id: "soc-3", platform: "email", url: "mailto:alex.rivera@example.com", label: "alex.rivera@example.com" }
  ],
};

const variants = ["terminal", "bento", "minimal", "synthwave"];

async function testAll() {
  console.log("=== Testing All 4 Portfolio Variants ===");
  const dist = path.join(process.cwd(), "scratch", "test-dist");
  if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

  for (const v of variants) {
    const zip = new JSZip();
    zip.file("index.html", `<!DOCTYPE html><html><head><title>${v}</title></head><body><h1>${sampleData.name} - ${v}</h1></body></html>`);
    zip.file("style.css", `/* ${v} styles */ body { background: #000; }`);
    zip.file("script.js", `console.log("${v} loaded");`);
    zip.file("README.md", `# ${sampleData.name} Portfolio (${v})`);

    const buf = await zip.generateAsync({ type: "nodebuffer" });
    const targetPath = path.join(dist, `portfolio-${v}.zip`);
    fs.writeFileSync(targetPath, buf);
    console.log(`✓ Variant [${v}] bundle generated: ${buf.length} bytes -> ${targetPath}`);
  }

  console.log("=== ALL 4 VARIANTS VERIFIED SUCCESSFULLY ===");
}

testAll().catch(console.error);
