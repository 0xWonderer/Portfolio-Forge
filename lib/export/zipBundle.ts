import JSZip from "jszip";
import { PortfolioData, PortfolioVariant } from "@/types/portfolio";
import { generateTerminalHtml } from "./generateTerminalHtml";
import { generateTerminalCss } from "./generateTerminalCss";
import { generateTerminalJs } from "./generateTerminalJs";
import { generateBentoHtml } from "./generateBentoHtml";
import { generateBentoCss } from "./generateBentoCss";
import { generateBentoJs } from "./generateBentoJs";
import { generateMinimalHtml } from "./generateMinimalHtml";
import { generateMinimalCss } from "./generateMinimalCss";
import { generateMinimalJs } from "./generateMinimalJs";
import { generateSynthwaveHtml } from "./generateSynthwaveHtml";
import { generateSynthwaveCss } from "./generateSynthwaveCss";
import { generateSynthwaveJs } from "./generateSynthwaveJs";

export async function createPortfolioZip(data: PortfolioData): Promise<Blob> {
  const zip = new JSZip();
  const variant: PortfolioVariant = data.variant || "terminal";

  let htmlContent = "";
  let cssContent = "";
  let jsContent = "";
  let themeTitle = "Terminal";

  switch (variant) {
    case "bento":
      htmlContent = generateBentoHtml(data);
      cssContent = generateBentoCss(data);
      jsContent = generateBentoJs(data);
      themeTitle = "Cyber Bento Grid";
      break;
    case "minimal":
      htmlContent = generateMinimalHtml(data);
      cssContent = generateMinimalCss(data);
      jsContent = generateMinimalJs(data);
      themeTitle = "Minimal Editorial";
      break;
    case "synthwave":
      htmlContent = generateSynthwaveHtml(data);
      cssContent = generateSynthwaveCss(data);
      jsContent = generateSynthwaveJs(data);
      themeTitle = "Synthwave Cyber";
      break;
    case "terminal":
    default:
      htmlContent = generateTerminalHtml(data);
      cssContent = generateTerminalCss(data);
      jsContent = generateTerminalJs(data);
      themeTitle = "Terminal";
      break;
  }

  const readmeContent = `# ${data.name || "Developer"} - Portfolio Website

This static portfolio website was generated with **PortfolioForge** using the **${themeTitle}** design theme.

## How to use:
1. **Local Preview**: Double-click \`index.html\` to open it directly in your web browser. No local server or build tools required!
2. **Deploy to GitHub Pages**:
   - Create a GitHub repository (e.g. \`username.github.io\`).
   - Upload \`index.html\`, \`style.css\`, and \`script.js\`.
   - Enable GitHub Pages under Repository Settings > Pages.
3. **Deploy to Vercel / Netlify / Cloudflare Pages**:
   - Drag and drop this folder directly into Netlify or Cloudflare Pages, or push to GitHub and deploy in 1-click.

---
*Built with PortfolioForge — Static, Fast, Zero Runtime Dependencies.*
`;

  // Add files to zip root
  zip.file("index.html", htmlContent);
  zip.file("style.css", cssContent);
  zip.file("script.js", jsContent);
  zip.file("README.md", readmeContent);

  // Generate the zip binary blob
  const zipBlob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  return zipBlob;
}

export async function downloadPortfolioZip(data: PortfolioData): Promise<void> {
  const blob = await createPortfolioZip(data);
  const variant = data.variant || "terminal";
  const sanitizedName = (data.name || "portfolio")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const fileName = `${sanitizedName}-${variant}-portfolio.zip`;

  // Trigger browser download
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function downloadSingleFileHtml(data: PortfolioData): void {
  const variant = data.variant || "terminal";
  let html = "";
  let css = "";
  let js = "";

  switch (variant) {
    case "bento":
      html = generateBentoHtml(data);
      css = generateBentoCss(data);
      js = generateBentoJs(data);
      break;
    case "minimal":
      html = generateMinimalHtml(data);
      css = generateMinimalCss(data);
      js = generateMinimalJs(data);
      break;
    case "synthwave":
      html = generateSynthwaveHtml(data);
      css = generateSynthwaveCss(data);
      js = generateSynthwaveJs(data);
      break;
    case "terminal":
    default:
      html = generateTerminalHtml(data);
      css = generateTerminalCss(data);
      js = generateTerminalJs(data);
      break;
  }

  // Inject CSS inside <style> tag and JS inside <script> tag for true 1-file standalone HTML
  let singleFileHtml = html
    .replace('<link rel="stylesheet" href="style.css">', `<style>\n${css}\n</style>`)
    .replace('<script src="script.js"></script>', `<script>\n${js}\n</script>`);

  const blob = new Blob([singleFileHtml], { type: "text/html;charset=utf-8" });
  const sanitizedName = (data.name || "portfolio")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const fileName = `${sanitizedName}-${variant}-standalone.html`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
