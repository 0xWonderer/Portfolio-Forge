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

export function generateTerminalHtml(data: PortfolioData): string {
  const name = escapeHtml(data.name || "Alex Rivera");
  const title = escapeHtml(data.title || "Software Engineer");
  const bio = escapeHtml(data.bio || "Welcome to my interactive terminal portfolio.");
  const location = escapeHtml(data.location || "Earth (Remote)");
  const terminalName = escapeHtml(data.themeConfig?.terminalName || "guest@portfolio");
  const skills = data.skills || [];
  const projects = data.projects || [];
  const socials = data.socials || [];

  const skillsHtml = skills.length > 0
    ? skills
        .map((skill, index) => {
          const escSkill = escapeHtml(skill);
          const mockSize = `${((index + 1) * 128) % 1024 + 256}B`;
          return `          <div class="skill-pill">
            <span class="permission">.sh</span>
            <span class="skill-name">${escSkill}</span>
            <span class="permission">(${mockSize})</span>
          </div>`;
        })
        .join("\n")
    : `          <p style="color: var(--text-dim); font-size: 0.85rem;">// No skills added yet.</p>`;

  const projectsHtml = projects.length > 0
    ? projects
        .map((proj) => {
          const escTitle = escapeHtml(proj.title);
          const escDesc = escapeHtml(proj.description);
          const linkHtml = proj.link
            ? `<a href="${escapeHtml(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <span>[open_repo]</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>`
            : "";

          const tagsHtml = (proj.tags || [])
            .map((t) => `<span class="tag-flag">--tag:${escapeHtml(t)}</span>`)
            .join(" ");

          return `        <article class="project-card">
          <div class="project-header">
            <h3 class="project-title">
              <span class="icon">&#9656;</span>
              <span>${escTitle}</span>
            </h3>
            ${linkHtml}
          </div>
          <p class="project-desc">${escDesc}</p>
          <div class="project-tags">
            ${tagsHtml}
          </div>
        </article>`;
        })
        .join("\n")
    : `        <p style="color: var(--text-dim); font-size: 0.85rem;">// No projects added yet.</p>`;

  const socialsHtml = socials.length > 0
    ? socials
        .map((soc) => {
          const platform = escapeHtml(soc.platform || "link");
          const url = escapeHtml(soc.url || "#");
          const label = escapeHtml(soc.label || soc.url || platform);

          return `        <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-card">
          <div class="social-info">
            <span class="social-arrow">&gt;</span>
            <div>
              <div class="social-platform">${platform}</div>
              <div class="social-handle">${label}</div>
            </div>
          </div>
          <span class="social-action">[connect]</span>
        </a>`;
        })
        .join("\n")
    : `        <p style="color: var(--text-dim); font-size: 0.85rem;">// No socials added yet.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | ${title}</title>
  <meta name="description" content="${bio.slice(0, 160)}">
  <meta property="og:title" content="${name} - ${title}">
  <meta property="og:description" content="${bio.slice(0, 160)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="scanlines-overlay"></div>

  <div class="terminal-window">
    <!-- Titlebar -->
    <div class="terminal-titlebar">
      <div class="terminal-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <div class="terminal-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
        <span>${terminalName}: ~</span>
      </div>
      <div class="terminal-status">&#9679; ONLINE</div>
    </div>

    <!-- Terminal Body -->
    <div class="terminal-body">
      
      <!-- Prompt & Hero Section -->
      <header class="hero-section">
        <div class="prompt-line">
          <span class="prompt-user">${terminalName}</span>
          <span class="prompt-symbol">$&gt;</span>
          <span class="prompt-command" id="typing-whoami-cmd">whoami --verbose</span>
          <span class="cursor-blink"></span>
        </div>

        <h1 class="hero-name" id="hero-name-target">${name}</h1>
        <div class="hero-title" id="hero-title-target">${title}</div>

        <div class="system-specs" id="system-specs-box">
          <div class="spec-item">
            <span class="spec-label">LOC:</span>
            <span class="spec-value">${location}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">SHELL:</span>
            <span class="spec-value">zsh 5.9</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">UPTIME:</span>
            <span class="spec-value">99.99%</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">STATUS:</span>
            <span class="spec-value status-ready">READY</span>
          </div>
        </div>
      </header>

      <!-- Command Navigation Bar -->
      <nav class="nav-section">
        <div class="nav-header-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          <span>QUICK COMMANDS (CLICK TO NAVIGATE)</span>
        </div>
        <div class="nav-commands">
          <a href="#sec-about" class="cmd-btn" data-target-section="sec-about">
            <span>cat about.txt</span>
          </a>
          <a href="#sec-skills" class="cmd-btn" data-target-section="sec-skills">
            <span>ls -la skills/</span>
          </a>
          <a href="#sec-projects" class="cmd-btn" data-target-section="sec-projects">
            <span>ls -l projects/</span>
          </a>
          <a href="#sec-socials" class="cmd-btn" data-target-section="sec-socials">
            <span>open socials/</span>
          </a>
        </div>
      </nav>

      <!-- Main Content Sections -->
      <main>
        <!-- About Section -->
        <section id="sec-about" class="terminal-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-tag">[01]</span>
              <h2 class="section-title">cat about.txt</h2>
            </div>
            <span class="section-meta">UTF-8 text</span>
          </div>
          <div class="about-box">
            <p>${bio}</p>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="sec-skills" class="terminal-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-tag">[02]</span>
              <h2 class="section-title">ls -la skills/</h2>
            </div>
            <span class="section-meta">${skills.length} items</span>
          </div>
          <div class="skills-grid">
${skillsHtml}
          </div>
        </section>

        <!-- Projects Section -->
        <section id="sec-projects" class="terminal-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-tag">[03]</span>
              <h2 class="section-title">ls -l projects/</h2>
            </div>
            <span class="section-meta">${projects.length} repositories</span>
          </div>
          <div class="projects-list">
${projectsHtml}
          </div>
        </section>

        <!-- Socials Section -->
        <section id="sec-socials" class="terminal-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <span class="section-tag">[04]</span>
              <h2 class="section-title">open socials/</h2>
            </div>
            <span class="section-meta">channels</span>
          </div>
          <div class="socials-grid">
${socialsHtml}
          </div>
        </section>

        <!-- Interactive Mini CLI Box -->
        <section class="terminal-interactive-box">
          <div class="interactive-output" id="terminal-cli-output">Type 'help' for available commands, or click the navigation shortcuts above.</div>
          <div class="interactive-input-row">
            <span class="prompt-user">${terminalName}</span>
            <span class="prompt-symbol">$&gt;</span>
            <input type="text" id="terminal-cli-input" class="cli-input" placeholder="Type a command (e.g. whoami, skills, projects, help)..." autocomplete="off" spellcheck="false">
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="terminal-footer">
        <div>Generated with <a href="#" class="footer-link">PortfolioForge</a></div>
        <div>exit status: 0 (clean)</div>
      </footer>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
`;
}
