import { PortfolioData } from "@/types/portfolio";

export function generateSynthwaveJs(data: PortfolioData): string {
  return `/* PortfolioForge - Synthwave Cyber Script */
(function() {
  'use strict';
  // Audio chirp feedback simulation on link clicks (optional)
  const links = document.querySelectorAll('.cyber-link, .cyber-social-card');
  links.forEach(l => {
    l.addEventListener('mouseenter', () => {
      l.style.transition = 'all 0.15s ease';
    });
  });
})();
`;
}
