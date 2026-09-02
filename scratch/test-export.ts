import fs from "fs";
import path from "path";
import { samplePortfolioData } from "../lib/sample-data";
import { generateTerminalHtml } from "../lib/export/generateTerminalHtml";
import { generateTerminalCss } from "../lib/export/generateTerminalCss";
import { generateTerminalJs } from "../lib/export/generateTerminalJs";
import { createPortfolioZip } from "../lib/export/zipBundle";

async function verifyExport() {
  console.log("=== Testing PortfolioForge Standalone Export Engine ===");
  
  // 1. Generate HTML
  const html = generateTerminalHtml(samplePortfolioData);
  console.log("✓ HTML generated successfully, length:", html.length);
  if (!html.includes("Alex Rivera")) throw new Error("Name missing from HTML");
  if (!html.includes("whoami")) throw new Error("Command prompt missing from HTML");
  if (!html.includes("ls -l projects/")) throw new Error("Projects command missing from HTML");
  if (!html.includes("HyperFlow")) throw new Error("Sample project missing from HTML");

  // 2. Generate CSS
  const css = generateTerminalCss(samplePortfolioData);
  console.log("✓ CSS generated successfully, length:", css.length);
  if (!css.includes("JetBrains Mono")) throw new Error("JetBrains font missing from CSS");
  if (!css.includes("terminal-window")) throw new Error("Terminal window class missing from CSS");

  // 3. Generate JS
  const js = generateTerminalJs(samplePortfolioData);
  console.log("✓ JS generated successfully, length:", js.length);
  if (!js.includes("runTypewriterAnimation")) throw new Error("Typewriter engine missing from JS");
  if (!js.includes("initCommandNav")) throw new Error("Command nav missing from JS");
  if (!js.includes("initCliConsole")) throw new Error("Interactive CLI missing from JS");

  // 4. Generate ZIP
  const zipBlob = await createPortfolioZip(samplePortfolioData);
  const arrayBuffer = await zipBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const testDistDir = path.join(process.cwd(), "scratch", "test-dist");
  if (!fs.existsSync(testDistDir)) {
    fs.mkdirSync(testDistDir, { recursive: true });
  }

  // Write standalone extracted files to scratch/test-dist for inspection
  fs.writeFileSync(path.join(testDistDir, "index.html"), html);
  fs.writeFileSync(path.join(testDistDir, "style.css"), css);
  fs.writeFileSync(path.join(testDistDir, "script.js"), js);
  fs.writeFileSync(path.join(testDistDir, "test-portfolio.zip"), buffer);

  console.log(`✓ Standalone static files & ZIP exported successfully to: ${testDistDir}`);
  console.log(`✓ ZIP size: ${buffer.length} bytes`);
  console.log("=== ALL EXPORT VERIFICATIONS PASSED ===");
}

verifyExport().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
