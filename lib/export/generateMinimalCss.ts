import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";

export function generateMinimalCss(data: PortfolioData): string {
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return `/* ==========================================================================
   PortfolioForge - Minimal Editorial Standalone Stylesheet
   Responsive & SEO-Optimized Architecture
   ========================================================================== */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg-page: #0d0d10;
  --bg-surface: #141418;
  --border: rgba(255, 255, 255, 0.08);
  --border-focus: ${theme.hex}66;
  --text-main: #f4f4f6;
  --text-muted: #a1a1aa;
  --text-dim: #71717a;
  --accent: ${theme.hex};
  --accent-glow: ${theme.glow};
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  max-width: 100vw;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--bg-page);
  color: var(--text-main);
  min-height: 100vh;
  padding: 4rem 1.5rem;
  display: flex;
  justify-content: center;
  line-height: 1.6;
  max-width: 100vw;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.minimal-container {
  width: 100%;
  max-width: 760px;
  min-width: 0;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-dim);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.header-section {
  padding: 3.5rem 0 2.5rem 0;
  border-bottom: 1px solid var(--border);
  word-break: break-word;
}

.main-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 7vw, 3.75rem);
  font-weight: 400;
  line-height: 1.08;
  color: #ffffff;
  margin-bottom: 1rem;
  word-break: break-word;
}

.main-subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 3.5vw, 1.6rem);
  font-style: italic;
  color: var(--text-muted);
  word-break: break-word;
}

.content-section {
  padding: 2.5rem 0;
  border-bottom: 1px solid var(--border);
  word-break: break-word;
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.25rem;
}

.bio-text {
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  color: var(--text-main);
  line-height: 1.8;
  word-break: break-word;
}

.project-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.project-item:first-child {
  padding-top: 0;
}

.project-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.project-title {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 3vw, 1.4rem);
  color: #ffffff;
  word-break: break-word;
}

.project-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.project-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  line-height: 1.6;
  word-break: break-word;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-main);
  background: var(--bg-surface);
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid var(--border);
  transition: all 0.2s;
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.socials-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.social-link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-main);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 2px;
  transition: all 0.2s;
}

.social-link:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.footer {
  padding-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Mobile Breakpoints */
@media (max-width: 768px) {
  body {
    padding: 2.5rem 1rem;
  }

  .header-section {
    padding: 2.5rem 0 2rem 0;
  }

  .content-section {
    padding: 2rem 0;
  }
}

@media (max-width: 480px) {
  body {
    padding: 1.5rem 0.75rem;
  }

  .socials-list {
    flex-direction: column;
    gap: 0.75rem;
  }
}
`;
}
