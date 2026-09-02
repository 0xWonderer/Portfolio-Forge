import { PortfolioData } from "@/types/portfolio";

export function generateMinimalJs(data: PortfolioData): string {
  return `/* PortfolioForge - Minimal Editorial Script */
(function() {
  'use strict';
  // Minimal smooth scroll behavior & interactive element reveals
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
`;
}
