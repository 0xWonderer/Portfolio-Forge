import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";

export function generateBentoCss(data: PortfolioData): string {
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return `/* PortfolioForge - Cyber Bento Standalone Stylesheet */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --bg-page: #090c12;
  --bg-card: rgba(18, 24, 38, 0.7);
  --bg-card-hover: rgba(26, 34, 52, 0.85);
  --border-card: rgba(255, 255, 255, 0.08);
  --border-hover: ${theme.hex}66;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --accent: ${theme.hex};
  --accent-glow: ${theme.glow};
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
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
  padding: 2.5rem 1rem;
  display: flex;
  justify-content: center;
  line-height: 1.6;
}

.bento-container {
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.bento-card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 1.75rem;
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
}

.bento-grid-top {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .bento-grid-top {
    grid-template-columns: 1fr;
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${theme.hex}1a;
  border: 1px solid ${theme.hex}40;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

.hero-name {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.hero-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 1rem;
}

.hero-bio {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.hero-location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.stat-item {
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
}

.stat-text {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: 2px;
}

.skills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-main);
  transition: all 0.2s;
}

.skill-chip:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent);
  color: #ffffff;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-card:hover {
  border-color: var(--border-hover);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
}

.project-link {
  color: var(--text-muted);
  text-decoration: none;
  padding: 4px;
  border-radius: 6px;
  transition: color 0.2s;
}

.project-link:hover {
  color: var(--accent);
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.project-tag {
  font-size: 0.75rem;
  color: var(--accent);
  background: ${theme.hex}14;
  border: 1px solid ${theme.hex}30;
  padding: 2px 8px;
  border-radius: 6px;
}

.socials-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.social-chip {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
  border-radius: 12px;
  color: var(--text-main);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: capitalize;
  transition: all 0.2s;
}

.social-chip:hover {
  background: ${theme.hex}1a;
  border-color: var(--accent);
  color: #ffffff;
  transform: translateY(-2px);
}

.bento-footer {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-dim);
  padding-top: 1rem;
}
`;
}
