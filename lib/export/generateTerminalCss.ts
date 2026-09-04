import { PortfolioData } from "@/types/portfolio";

export function generateTerminalCss(data: PortfolioData): string {
  const accent = data.themeConfig?.accentColor || "emerald";

  // Accent color mapping
  const colorMap: Record<string, { primary: string; glow: string; border: string; bgSoft: string }> = {
    emerald: {
      primary: "#10b981",
      glow: "rgba(16, 185, 129, 0.4)",
      border: "rgba(16, 185, 129, 0.3)",
      bgSoft: "rgba(16, 185, 129, 0.08)",
    },
    cyan: {
      primary: "#06b6d4",
      glow: "rgba(6, 182, 212, 0.4)",
      border: "rgba(6, 182, 212, 0.3)",
      bgSoft: "rgba(6, 182, 212, 0.08)",
    },
    amber: {
      primary: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.4)",
      border: "rgba(245, 158, 11, 0.3)",
      bgSoft: "rgba(245, 158, 11, 0.08)",
    },
    violet: {
      primary: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.4)",
      border: "rgba(139, 92, 246, 0.3)",
      bgSoft: "rgba(139, 92, 246, 0.08)",
    },
    rose: {
      primary: "#f43f5e",
      glow: "rgba(244, 63, 94, 0.4)",
      border: "rgba(244, 63, 94, 0.3)",
      bgSoft: "rgba(244, 63, 94, 0.08)",
    },
  };

  const currentTheme = colorMap[accent] || colorMap.emerald;

  return `/* ==========================================================================
   PortfolioForge - Terminal Theme Standalone Stylesheet
   Generated for: ${data.name || "Developer"}
   ========================================================================== */

@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@400;500;600&display=swap');

:root {
  --bg-main: #060911;
  --bg-card: #0c101c;
  --bg-header: #131929;
  --bg-input: #101624;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --accent: ${currentTheme.primary};
  --accent-glow: ${currentTheme.glow};
  --accent-border: ${currentTheme.border};
  --accent-soft: ${currentTheme.bgSoft};
  --color-green: #10b981;
  --color-yellow: #f59e0b;
  --color-red: #f43f5e;
  --color-cyan: #06b6d4;
  --color-purple: #c084fc;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-mono);
  background-color: var(--bg-main);
  color: var(--text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 4rem 1rem;
  position: relative;
  overflow-x: hidden;
  font-family: var(--font-mono);
}

/* Subtle CRT phosphor scanlines overlay */
.scanlines-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.2) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 100;
  opacity: 0.12;
}

/* Terminal Outer Window Container */
.terminal-window {
  width: 100%;
  max-width: 960px;
  background-color: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.08);
  overflow: hidden;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}

/* Terminal Titlebar */
.terminal-titlebar {
  background-color: var(--bg-header);
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  user-select: none;
}

.terminal-dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.dot-red { background-color: #ff5f56; box-shadow: 0 0 8px rgba(255, 95, 86, 0.4); }
.dot-yellow { background-color: #ffbd2e; box-shadow: 0 0 8px rgba(255, 189, 46, 0.4); }
.dot-green { background-color: #27c93f; box-shadow: 0 0 8px rgba(39, 201, 63, 0.4); }

.terminal-title {
  font-size: 0.825rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-weight: 600;
}

.terminal-status {
  font-size: 0.725rem;
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 3px 10px;
  border-radius: 9999px;
  border: 1px solid var(--accent-border);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
}

/* Terminal Content Body */
.terminal-body {
  padding: 2rem 2.25rem;
}

@media (max-width: 640px) {
  .terminal-body {
    padding: 1.25rem 1rem;
  }
}

/* Command Prompt Line */
.prompt-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.95rem;
  margin-bottom: 0.85rem;
}

.prompt-user {
  color: var(--color-green);
  font-weight: 700;
  font-family: var(--font-mono);
}

.prompt-symbol {
  color: var(--accent);
  font-weight: 800;
}

.prompt-command {
  color: #ffffff;
  font-weight: 600;
  font-family: var(--font-mono);
}

.cursor-blink {
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background-color: var(--accent);
  vertical-align: middle;
  margin-left: 2px;
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Header / Whoami Section */
.hero-section {
  padding-bottom: 1.75rem;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.12);
  margin-bottom: 1.75rem;
}

.hero-name {
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  font-family: var(--font-mono);
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 20px var(--accent-glow);
}

.hero-title {
  font-size: 1.15rem;
  color: var(--accent);
  margin-bottom: 0.85rem;
  font-weight: 600;
  font-family: var(--font-mono);
}

.system-specs {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 0.85rem;
  font-family: var(--font-mono);
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spec-label {
  color: var(--text-muted);
  font-weight: 600;
}

.spec-value {
  color: var(--text-main);
  font-weight: 500;
}

.status-ready {
  color: var(--color-green);
  font-weight: 700;
}

/* Command Navigation Bar */
.nav-section {
  margin-bottom: 2rem;
  background-color: var(--bg-input);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem 1.25rem;
}

.nav-header-label {
  font-size: 0.725rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  margin-bottom: 0.65rem;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
}

.nav-commands {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cmd-btn {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.45rem 0.95rem;
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cmd-btn:hover, .cmd-btn:focus-visible {
  background: var(--accent-soft);
  color: #ffffff;
  border-color: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow);
  outline: none;
  transform: translateY(-1px);
}

/* Section Containers */
.terminal-section {
  margin-bottom: 2.25rem;
  scroll-margin-top: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.45rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-tag {
  color: var(--accent);
  font-size: 0.9rem;
  font-weight: 800;
  font-family: var(--font-mono);
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  font-family: var(--font-mono);
}

.section-meta {
  font-size: 0.75rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
}

/* About / Bio Box */
.about-box {
  background: var(--bg-input);
  border-left: 3px solid var(--accent);
  border-radius: 0 12px 12px 0;
  padding: 1.25rem 1.5rem;
  color: var(--text-main);
  font-size: 0.925rem;
  line-height: 1.7;
}

.about-box p {
  margin-bottom: 0.75rem;
}

.about-box p:last-child {
  margin-bottom: 0;
}

/* Skills Grid */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-pill {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  font-weight: 500;
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.skill-pill:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: #ffffff;
  transform: translateY(-2px);
}

.skill-pill .permission {
  color: var(--text-dim);
  font-size: 0.75rem;
}

.skill-pill .skill-name {
  color: #ffffff;
  font-weight: 600;
}

/* Projects Section */
.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.project-card {
  background: var(--bg-input);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.35rem;
  transition: all 0.25s ease;
  position: relative;
}

.project-card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 15px var(--accent-glow);
  transform: translateY(-2px);
}

.project-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  font-family: var(--font-mono);
  display: flex;
  align-items: center;
  gap: 8px;
}

.project-title .icon {
  color: var(--color-cyan);
}

.project-link-btn {
  font-size: 0.8rem;
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  border: 1px solid var(--accent-border);
  background: var(--accent-soft);
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s;
}

.project-link-btn:hover {
  background: var(--accent);
  color: #060911;
}

.project-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.85rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-flag {
  font-size: 0.75rem;
  font-family: var(--font-mono);
  color: var(--color-cyan);
  background: rgba(6, 182, 212, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.25);
  padding: 2px 8px;
  border-radius: 6px;
}

/* Socials Section */
.socials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.social-card {
  background: var(--bg-input);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0.95rem 1.15rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-main);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.social-card:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  transform: translateY(-2px);
  color: #ffffff;
}

.social-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-arrow {
  color: var(--accent);
  font-weight: 800;
  font-family: var(--font-mono);
}

.social-platform {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: capitalize;
  font-family: var(--font-mono);
}

.social-handle {
  font-size: 0.75rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
}

.social-action {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  font-family: var(--font-mono);
}

/* Interactive Mini Terminal Console */
.terminal-interactive-box {
  margin-top: 2rem;
  background: #07090e;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1.25rem;
}

.interactive-output {
  min-height: 48px;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.85rem;
  white-space: pre-wrap;
  line-height: 1.5;
  font-family: var(--font-mono);
}

.interactive-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cli-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.cli-input::placeholder {
  color: var(--text-dim);
}

/* Footer */
.terminal-footer {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-dim);
  font-family: var(--font-mono);
}

.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--accent);
}

/* ==========================================================================
   Mobile & Small Screen Breakpoints
   ========================================================================== */
@media (max-width: 768px) {
  body {
    padding: 1.25rem 0.75rem 3rem 0.75rem;
  }

  .terminal-body {
    padding: 1.25rem;
  }

  .socials-grid {
    grid-template-columns: 1fr;
  }

  .quick-commands-bar {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  body {
    padding: 0.75rem 0.35rem 2rem 0.35rem;
  }

  .terminal-titlebar {
    padding: 0.65rem 0.85rem;
  }

  .terminal-body {
    padding: 1rem 0.75rem;
  }

  .interactive-input-row {
    flex-wrap: wrap;
  }
}
`;
}
