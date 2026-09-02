import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";

export function generateSynthwaveCss(data: PortfolioData): string {
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return `/* PortfolioForge - Synthwave Cyber Standalone Stylesheet */
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@400;500;600;700&display=swap');

:root {
  --bg-page: #0a0518;
  --bg-card: rgba(20, 11, 46, 0.85);
  --border-pink: ${theme.hex}66;
  --border-cyan: rgba(6, 182, 212, 0.4);
  --neon-pink: ${theme.hex};
  --neon-cyan: #06b6d4;
  --neon-purple: #c084fc;
  --text-main: #fdf2f8;
  --text-muted: #cbd5e1;
  --font-mono: 'Share Tech Mono', monospace, Consolas;
  --font-sans: 'Inter', system-ui, sans-serif;
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
  padding: 3rem 1.25rem;
  display: flex;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
}

/* Perspective Grid Background */
.synthwave-grid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, ${theme.hex}33 1px, transparent 1px),
    linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}

.synthwave-container {
  width: 100%;
  max-width: 900px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hud-card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-pink);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 0 30px ${theme.hex}26;
  position: relative;
  overflow: hidden;
}

.hud-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--neon-pink);
  background: ${theme.hex}1a;
  border: 1px solid var(--border-pink);
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.hud-name {
  font-family: var(--font-mono);
  font-size: 2.75rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 0 20px ${theme.hex}80;
  margin-bottom: 0.25rem;
}

.hud-title {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  color: var(--neon-cyan);
  margin-bottom: 1.25rem;
}

.hud-bio {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
}

.two-col-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .two-col-grid {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--neon-purple);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hud-chip {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-main);
  padding: 6px 14px;
  border-radius: 8px;
}

.hud-chip:hover {
  border-color: var(--neon-pink);
  color: var(--neon-pink);
}

.projects-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
  }
}

.hud-project-card {
  background: rgba(14, 7, 34, 0.8);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hud-project-card:hover {
  border-color: var(--neon-pink);
  box-shadow: 0 0 15px ${theme.hex}40;
}

.project-title {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  color: #ffffff;
}

.project-link {
  color: var(--neon-cyan);
  text-decoration: none;
  font-size: 0.85rem;
}

.project-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0.75rem 0 1rem 0;
}

.hud-footer {
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--neon-pink);
  opacity: 0.7;
  padding: 1rem 0;
}
`;
}
