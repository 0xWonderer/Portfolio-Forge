import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";

export function generateMinimalCss(data: PortfolioData): string {
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return `/* PortfolioForge - Minimal Editorial Standalone Stylesheet */
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

body {
  font-family: var(--font-sans);
  background-color: var(--bg-page);
  color: var(--text-main);
  min-height: 100vh;
  padding: 4rem 1.5rem;
  display: flex;
  justify-content: center;
  line-height: 1.6;
}

.minimal-container {
  width: 100%;
  max-width: 760px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-dim);
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
  padding: 4rem 0 3rem 0;
  border-bottom: 1px solid var(--border);
}

.main-title {
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 1rem;
}

.main-subtitle {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--text-muted);
}

.content-section {
  padding: 3rem 0;
  border-bottom: 1px solid var(--border);
}

.section-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.bio-text {
  font-size: 1.1rem;
  color: var(--text-main);
  line-height: 1.8;
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
}

.project-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  color: #ffffff;
}

.project-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--accent);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}

.project-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
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
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.socials-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.social-link {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-main);
  text-decoration: none;
  display: flex;
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
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-dim);
}
`;
}
