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
  const bio = escapeHtml(data.bio || "Crafting robust distributed systems and developer tools.");
  const location = escapeHtml(data.location || "San Francisco, CA (Remote)");

  const skillsHtml = (data.skills || [])
    .map((s) => `        <span class="skill-tag">${escapeHtml(s)}</span>`)
    .join("\n");

  const projectsHtml = (data.projects || [])
    .map((p) => {
      const linkHtml = p.link
        ? `<a href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer" class="project-link">
            <span>View Project</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>`
        : "";

      const tagsHtml = (p.tags || [])
        .map((t) => `<span class="project-tag">#${escapeHtml(t)}</span>`)
        .join(" ");

      return `      <article class="project-item">
        <div class="project-title-row">
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
      return `      <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-link">
        <span class="social-platform">${escapeHtml(s.platform)}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — ${title}</title>
  <meta name="description" content="${bio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="editorial-container">
    
    <header class="editorial-header">
      <div class="header-meta">${location}</div>
      <h1 class="header-name">${name}</h1>
      <p class="header-title">${title}</p>
    </header>

    <section class="editorial-section">
      <h2 class="section-heading">About</h2>
      <p class="bio-text">${bio}</p>
    </section>

    <section class="editorial-section">
      <h2 class="section-heading">Selected Works</h2>
      <div class="projects-list">
${projectsHtml}
      </div>
    </section>

    <section class="editorial-section">
      <h2 class="section-heading">Competencies</h2>
      <div class="skills-flex">
${skillsHtml}
      </div>
    </section>

    <section class="editorial-section connect-section">
      <h2 class="section-heading">Connect</h2>
      <div class="socials-flex">
${socialsHtml}
      </div>
    </section>

    <footer class="editorial-footer">
      <div>Generated with PortfolioForge (Minimal Editorial)</div>
    </footer>
  </div>
  <script src="script.js"></script>
</body>
</html>
`;
}
