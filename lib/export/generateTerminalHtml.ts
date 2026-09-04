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
  const terminalUser = terminalName;
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
            ? `<a href="${escapeHtml(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Open ${escTitle} repository">
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

          return `        <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-card" aria-label="${platform} link">
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

  const schemaJson = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": data.name || "Alex Rivera",
      "jobTitle": data.title || "Software Engineer",
      "description": data.bio || "Welcome to my interactive terminal portfolio.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.location || "Earth (Remote)",
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
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="application/ld+json">
  ${schemaJson}
  </script>
</head>
<body>
  <div class="scanlines-overlay"></div>

  <main class="terminal-window">
    
    <!-- Titlebar -->
    <div class="terminal-titlebar">
      <div class="terminal-dots">
        <span class="dot dot-close"></span>
        <span class="dot dot-minimize"></span>
        <span class="dot dot-maximize"></span>
      </div>
      <div class="terminal-title">${terminalName} — zsh — 80x24</div>
      <div style="width: 52px;"></div>
    </div>

    <!-- Terminal Content Body -->
    <div class="terminal-body">
      
      <!-- Top Typewriter Prompt & Hero -->
      <header class="terminal-header">
        <div class="terminal-prompt-line">
          <span class="prompt-user">${terminalUser}</span>
          <span class="prompt-sym">$&gt;</span>
          <span id="typewriter-cmd" class="prompt-cmd">whoami --verbose</span>
          <span class="cursor-block"></span>
        </div>

        <h1 class="terminal-hero-name">${name}</h1>
        <p class="terminal-hero-title">${title}</p>

        <div class="terminal-diagnostics">
          <div class="diag-item"><span class="diag-label">LOC:</span> ${location}</div>
          <div class="diag-item"><span class="diag-label">SHELL:</span> zsh 5.9</div>
          <div class="diag-item"><span class="diag-label">UPTIME:</span> 99.99%</div>
          <div class="diag-item"><span class="diag-label">STATUS:</span> <span class="status-ready">READY</span></div>
        </div>
      </header>

      <!-- Quick Nav -->
      <nav class="quick-commands-bar" aria-label="Terminal Sections Navigation">
        <a href="#about" class="cmd-pill">$ cat about.txt</a>
        <a href="#skills" class="cmd-pill">$ ls -la skills/</a>
        <a href="#projects" class="cmd-pill">$ ls -l projects/</a>
        <a href="#socials" class="cmd-pill">$ open socials/</a>
      </nav>

      <!-- Section 1: About -->
      <section id="about" class="terminal-section">
        <div class="section-header-bar">
          <div class="section-title">
            <span class="section-num">[01]</span>
            <span>cat about.txt</span>
          </div>
          <span class="section-meta">UTF-8 text</span>
        </div>
        <div class="about-card">
          <p>${bio}</p>
        </div>
      </section>

      <!-- Section 2: Skills -->
      <section id="skills" class="terminal-section">
        <div class="section-header-bar">
          <div class="section-title">
            <span class="section-num">[02]</span>
            <span>ls -la skills/</span>
          </div>
          <span class="section-meta">${skills.length} competencies</span>
        </div>
        <div class="skills-grid">
${skillsHtml}
        </div>
      </section>

      <!-- Section 3: Projects -->
      <section id="projects" class="terminal-section">
        <div class="section-header-bar">
          <div class="section-title">
            <span class="section-num">[03]</span>
            <span>ls -l projects/</span>
          </div>
          <span class="section-meta">${projects.length} repositories</span>
        </div>
        <div class="projects-list">
${projectsHtml}
        </div>
      </section>

      <!-- Section 4: Socials -->
      <section id="socials" class="terminal-section">
        <div class="section-header-bar">
          <div class="section-title">
            <span class="section-num">[04]</span>
            <span>open socials/</span>
          </div>
          <span class="section-meta">${socials.length} endpoints</span>
        </div>
        <div class="socials-grid">
${socialsHtml}
        </div>
      </section>

      <!-- Interactive Mini Bash Input Box -->
      <section class="terminal-interactive-box" aria-label="Interactive CLI">
        <div id="cli-output" class="interactive-output">Type 'help' for available commands (or try 'sudo hire', 'whoami', 'matrix').</div>
        <div class="interactive-input-row">
          <span class="prompt-user">${terminalUser}</span>
          <span class="prompt-sym">$&gt;</span>
          <input type="text" id="cli-input" class="cli-input" placeholder="Type a command..." autocomplete="off" />
        </div>
      </section>

      <!-- Footer -->
      <footer class="terminal-footer">
        <div>[PORTFOLIO_FORGE // TERMINAL_OS v3.2]</div>
        <div>ALL SYSTEM DIAGNOSTICS: NOMINAL</div>
      </footer>

    </div>
  </main>

  <script src="script.js"></script>
</body>
</html>
`;
}
