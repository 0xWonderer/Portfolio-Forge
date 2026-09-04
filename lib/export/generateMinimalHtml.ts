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

export function generateMinimalHtml(data: PortfolioData): string {
  const name = escapeHtml(data.name || "Alex Rivera");
  const title = escapeHtml(data.title || "Senior Systems Engineer");
  const bio = escapeHtml(data.bio || "Building high-performance applications.");
  const location = escapeHtml(data.location || "San Francisco, CA (Remote)");

  const skillsHtml = (data.skills || [])
    .map((s) => `        <span class="skill-tag">${escapeHtml(s)}</span>`)
    .join("\n");

  const projectsHtml = (data.projects || [])
    .map((p) => {
      const linkHtml = p.link
        ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Visit ${escapeHtml(p.title)}">
            <span>Visit</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
          </a>`
        : "";

      const tagsHtml = (p.tags || [])
        .map((t) => `<span>#${escapeHtml(t)}</span>`)
        .join(" ");

      return `      <article class="project-item">
        <div class="project-header">
          <h3 class="project-title">${escapeHtml(p.title)}</h3>
          ${linkHtml}
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">${tagsHtml}</div>
      </article>`;
    })
    .join("\n");

  const socialsHtml = (data.socials || [])
    .map((s) => {
      return `      <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="${escapeHtml(s.platform)} profile">
        <span>${escapeHtml(s.platform)}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
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
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="application/ld+json">
  ${schemaJson}
  </script>
</head>
<body>
  <main class="minimal-container">
    
    <div class="top-bar">
      <span>${location}</span>
      <div class="status-indicator">
        <span class="status-dot"></span>
        <span>Available for Opportunities</span>
      </div>
    </div>

    <header class="header-section">
      <h1 class="main-title">${name}</h1>
      <p class="main-subtitle">${title}</p>
    </header>

    <section class="content-section" aria-label="About Me">
      <div class="section-label">[ 01 // ESSAY ]</div>
      <p class="bio-text">${bio}</p>
    </section>

    <section class="content-section" aria-label="Featured Works">
      <div class="section-label">[ 02 // SELECTED WORKS ]</div>
      <div class="projects-list">
${projectsHtml}
      </div>
    </section>

    <section class="content-section" aria-label="Technical Stack">
      <div class="section-label">[ 03 // PROFICIENCIES ]</div>
      <div class="skills-list">
${skillsHtml}
      </div>
    </section>

    <section class="content-section" aria-label="Contact Links">
      <div class="section-label">[ 04 // CONNECT ]</div>
      <div class="socials-list">
${socialsHtml}
      </div>
    </section>

    <footer class="footer">
      <div>Generated with PortfolioForge (Minimal Editorial)</div>
      <div>Index 01 // All Rights Reserved</div>
    </footer>

  </main>
  <script src="script.js"></script>
</body>
</html>
`;
}
