import { PortfolioData } from "@/types/portfolio";

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateSynthwaveHtml(data: PortfolioData): string {
  const name = escapeHtml(data.name || "Alex Rivera");
  const title = escapeHtml(data.title || "Senior Systems Engineer");
  const bio = escapeHtml(data.bio || "Building high-performance applications.");

  const skillsHtml = (data.skills || [])
    .map((s) => `        <span class="hud-chip">${escapeHtml(s)}</span>`)
    .join("\n");

  const projectsHtml = (data.projects || [])
    .map((p) => {
      const linkHtml = p.link
        ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Open ${escapeHtml(p.title)} link">[LINK] &gt;</a>`
        : "";

      return `      <article class="hud-project-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
          <h3 class="project-title">${escapeHtml(p.title)}</h3>
          ${linkHtml}
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
      </article>`;
    })
    .join("\n");

  const socialsHtml = (data.socials || [])
    .map((s) => {
      return `        <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="hud-chip" style="text-decoration: none;" aria-label="${escapeHtml(s.platform)} profile">
          ${escapeHtml(s.platform)} &gt;
        </a>`;
    })
    .join("\n");

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": data.name || "Alex Rivera",
      "jobTitle": data.title || "Senior Systems Engineer",
      "description": data.bio || "Building high-performance applications.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.location || "San Francisco, CA (Remote)",
      },
      "knowsAbout": data.skills || [],
      "sameAs": (data.socials || []).map((s) => s.url).filter(Boolean),
    },
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${name} | ${title}</title>
  <meta name="description" content="${bio.slice(0, 160)}">
  <meta name="author" content="${name}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="profile">
  <meta property="og:title" content="${name} — ${title}">
  <meta property="og:description" content="${bio.slice(0, 160)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${name} — ${title}">
  <meta name="twitter:description" content="${bio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="application/ld+json">
  ${schemaJson}
  </script>
</head>
<body>
  <div class="synthwave-grid-bg"></div>

  <main class="synthwave-container">
    <header class="hud-card">
      <div class="hud-tag">SYSTEM STATUS: ONLINE</div>
      <h1 class="hud-name">${name}</h1>
      <p class="hud-title">${title}</p>
      <p class="hud-bio">${bio}</p>
    </header>

    <div class="two-col-grid">
      <section class="hud-card" aria-label="Tech Stack">
        <h2 class="section-title">&gt; SYS_TECH_MODULES</h2>
        <div class="chips-grid">
${skillsHtml}
        </div>
      </section>

      <section class="hud-card" aria-label="Social Uplinks">
        <h2 class="section-title">&gt; NEURAL_TRANSMISSIONS</h2>
        <div class="chips-grid">
${socialsHtml}
        </div>
      </section>
    </div>

    <section class="hud-card" aria-label="Cyber Projects">
      <h2 class="section-title" style="margin-bottom: 1.5rem;">&gt; CYBER_PROJECTS_MANIFEST</h2>
      <div class="projects-container">
${projectsHtml}
      </div>
    </section>

    <footer class="hud-footer">
      <div>Generated with PortfolioForge (Cyberpunk HUD 2099)</div>
    </footer>
  </main>
  <script src="script.js"></script>
</body>
</html>
`;
}
