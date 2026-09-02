import { PortfolioData } from "@/types/portfolio";

export function generateBentoJs(data: PortfolioData): string {
  return `/* PortfolioForge - Cyber Bento Script */
(function() {
  'use strict';
  // Subtle card hover 3D tilt / spotlight effect
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', \`\${x}px\`);
      card.style.setProperty('--mouse-y', \`\${y}px\`);
    });
  });
})();
`;
}
