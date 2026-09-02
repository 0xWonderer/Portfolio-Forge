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
  const bio = escapeHtml(data.bio || "Building high-performance cyberpunk systems.");
  const location = escapeHtml(data.location || "Neo-Tokyo (Remote)");

  const skillsHtml = (data.skills || [])
    .map((s) => `        <span class="cyber-skill-pill">${escapeHtml(s)}</span>`)
    .join("\n");

  const projectsHtml = (data.projects || [])
    .map((p) => {
      const linkHtml = p.link
        ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer" class="cyber-link">
            <span>[EXECUTE]</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>`
        : "";

      const tagsHtml = (p.tags || [])
        .map((t) => `<span class="cyber-tag">#${escapeHtml(t)}</span>`)
        .join(" ");

      return `      <article class="cyber-card project-card">
        <div class="project-head">
          <h3 class="project-title">&gt; ${escapeHtml(p.title)}</h3>
          ${linkHtml}
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <div class="project-tags">${tagsHtml}</div>
      </article>`;
    })
    .join("\n");

  const socialsHtml = (data.socials || [])
    .map((s) => {
      return `      <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="cyber-social-card">
        <span class="social-prefix">&gt; ${escapeHtml(s.platform)}:</span>
        <span class="social-handle">${escapeHtml(s.label || s.url)}</span>
      </a>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | ${title}</title>
  <meta name="description" content="${bio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="synthwave-grid-bg"></div>
  <div class="synthwave-container">
    
    <header class="cyber-card hero-card">
      <div class="signal-tag">
        <span class="signal-dot"></span>
        <span>SIGNAL: ACTIVE // 1984_ONLINE</span>
      </div>
      <h1 class="hero-name">${name}</h1>
      <p class="hero-title">// ${title}</p>
      <p class="hero-bio">${bio}</p>
      <div class="hero-location">${location}</div>
    </header>

    <section class="cyber-card skills-box">
      <h2 class="section-title">&gt; CYBERNETIC_STACK</h2>
      <div class="skills-grid">
${skillsHtml}
      </div>
    </section>

    <section class="projects-section">
      <h2 class="section-title" style="margin-bottom: 1rem;">&gt; ARCHIVED_PROJECTS</h2>
      <div class="projects-grid">
${projectsHtml}
      </div>
    </section>

    <section class="cyber-card socials-box">
      <h2 class="section-title">&gt; COMM_FREQUENCIES</h2>
      <div class="socials-grid">
${socialsHtml}
      </div>
    </section>

    <footer class="synthwave-footer">
      <div>PortfolioForge // Synthwave Cyber Theme</div>
    </footer>
  </div>
  <script src="script.js"></script>
</body>
</html>
`;
}
