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

export function generateBentoHtml(data: PortfolioData): string {
  const name = escapeHtml(data.name || "Alex Rivera");
  const title = escapeHtml(data.title || "Senior Systems Engineer");
  const bio = escapeHtml(data.bio || "Building high-performance applications.");
  const location = escapeHtml(data.location || "San Francisco, CA (Remote)");

  const skillsHtml = (data.skills || [])
    .map(
      (s) =>
        `        <span class="skill-chip">${escapeHtml(s)}</span>`
    )
    .join("\n");

  const projectsHtml = (data.projects || [])
    .map((p) => {
      const linkHtml = p.link
        ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Visit ${escapeHtml(p.title)} repository">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>`
        : "";

      const tagsHtml = (p.tags || [])
        .map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`)
        .join(" ");

      return `      <article class="bento-card project-card">
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
      return `      <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-chip" aria-label="${escapeHtml(s.platform)} profile">
        <span class="social-name">${escapeHtml(s.platform)}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
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
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="application/ld+json">
  ${schemaJson}
  </script>
</head>
<body>
  <main class="bento-container">
    
    <!-- Top Row: Hero Card & Overview Stats Card -->
    <div class="bento-grid-top">
      <header class="bento-card hero-card">
        <div class="status-badge">
          <span class="pulse-dot"></span>
          <span>Available for Opportunities</span>
        </div>
        <h1 class="hero-name">${name}</h1>
        <p class="hero-title">${title}</p>
        <p class="hero-bio">${bio}</p>
        <div class="hero-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${location}</span>
        </div>
      </header>

      <div class="bento-card stats-card">
        <div class="section-label">PORTFOLIO METRICS</div>
        <div class="stat-item">
          <div class="stat-number">${(data.projects || []).length}</div>
          <div class="stat-text">Featured Works</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" style="color: var(--accent);">${(data.skills || []).length}</div>
          <div class="stat-text">Core Competencies</div>
        </div>
      </div>
    </div>

    <!-- Skills Card -->
    <section class="bento-card skills-card" aria-label="Technical Skills">
      <div class="section-label">ENGINEERING STACK</div>
      <div class="skills-wrap">
${skillsHtml}
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="projects-section" aria-label="Featured Projects">
      <div class="section-label" style="margin-bottom: 0.75rem; padding-left: 0.25rem;">SELECTED PROJECTS</div>
      <div class="projects-grid">
${projectsHtml}
      </div>
    </section>

    <!-- Connect & Socials Card -->
    <section class="bento-card socials-card" aria-label="Social Links">
      <div class="section-label">GET IN TOUCH</div>
      <div class="socials-wrap">
${socialsHtml}
      </div>
    </section>

    <footer class="bento-footer">
      <div>Generated with PortfolioForge (Cyber Bento)</div>
    </footer>
  </main>
  <script src="script.js"></script>
</body>
</html>
`;
}
