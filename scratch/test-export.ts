import fs from "fs";
import path from "path";
import { samplePortfolioData } from "../lib/sample-data";
import { generateTerminalHtml } from "../lib/export/generateTerminalHtml";
import { generateTerminalCss } from "../lib/export/generateTerminalCss";
import { generateBentoHtml } from "../lib/export/generateBentoHtml";
import { generateBentoCss } from "../lib/export/generateBentoCss";
import { generateMinimalHtml } from "../lib/export/generateMinimalHtml";
import { generateMinimalCss } from "../lib/export/generateMinimalCss";
import { generateSynthwaveHtml } from "../lib/export/generateSynthwaveHtml";
import { generateSynthwaveCss } from "../lib/export/generateSynthwaveCss";
import { createPortfolioZip } from "../lib/export/zipBundle";
import { PortfolioVariant } from "../types/portfolio";

async function verifyAllExports() {
  console.log("=== Testing PortfolioForge All 4 Themes Export & SEO ===");
  
  const variants: PortfolioVariant[] = ["bento", "terminal", "minimal", "synthwave"];

  for (const variant of variants) {
    const data = { ...samplePortfolioData, variant };
    let html = "";
    let css = "";

    switch (variant) {
      case "bento":
        html = generateBentoHtml(data);
        css = generateBentoCss(data);
        break;
      case "terminal":
        html = generateTerminalHtml(data);
        css = generateTerminalCss(data);
        break;
      case "minimal":
        html = generateMinimalHtml(data);
        css = generateMinimalCss(data);
        break;
      case "synthwave":
        html = generateSynthwaveHtml(data);
        css = generateSynthwaveCss(data);
        break;
    }

    console.log(`[${variant.toUpperCase()}] HTML length: ${html.length}, CSS length: ${css.length}`);

    // Verify SEO
    if (!html.includes("schema.org")) throw new Error(`${variant}: Missing schema.org`);
    if (!html.includes("og:title")) throw new Error(`${variant}: Missing og:title`);
    if (!html.includes("viewport")) throw new Error(`${variant}: Missing viewport meta`);

    // Verify Responsive CSS
    if (!css.includes("@media")) throw new Error(`${variant}: Missing responsive @media queries`);
    if (!css.includes("box-sizing: border-box")) throw new Error(`${variant}: Missing border-box`);

    // Verify ZIP Generation
    const zipBlob = await createPortfolioZip(data);
    const arrayBuffer = await zipBlob.arrayBuffer();
    console.log(`✓ [${variant.toUpperCase()}] ZIP Generated: ${arrayBuffer.byteLength} bytes`);
  }

  console.log("=== ALL 4 THEMES PASSED RESPONSIVENESS & SEO VALIDATION ===");
}

verifyAllExports().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
