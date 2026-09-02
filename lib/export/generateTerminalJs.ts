import { PortfolioData } from "@/types/portfolio";

export function generateTerminalJs(data: PortfolioData): string {
  const userName = data.name || "Alex Rivera";
  const userTitle = data.title || "Developer";
  const userLocation = data.location || "Earth (Remote)";
  const terminalPromptUser = (data.themeConfig?.terminalName || "guest@portfolio").split("@")[0] || "guest";
  const terminalHost = (data.themeConfig?.terminalName || "guest@portfolio").split("@")[1] || "portfolio";

  return `/* ==========================================================================
   PortfolioForge - Terminal Theme Standalone Script
   Pure Vanilla JavaScript - Zero Dependencies
   ========================================================================== */

(function() {
  'use strict';

  const PORTFOLIO_DATA = {
    name: ${JSON.stringify(userName)},
    title: ${JSON.stringify(userTitle)},
    location: ${JSON.stringify(userLocation)},
    promptUser: ${JSON.stringify(terminalPromptUser)},
    promptHost: ${JSON.stringify(terminalHost)},
    skills: ${JSON.stringify(data.skills || [])},
    projectsCount: ${(data.projects || []).length},
    socialsCount: ${(data.socials || []).length}
  };

  // Helper: Sleep/delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // 1. TYPING ANIMATION ENGINE
  async function runTypewriterAnimation() {
    const whoamiTextEl = document.getElementById('typing-whoami-cmd');
    const heroNameEl = document.getElementById('hero-name-target');
    const heroTitleEl = document.getElementById('hero-title-target');

    if (!whoamiTextEl || !heroNameEl) return;

    // Type the command: "whoami --verbose"
    const cmdText = "whoami --verbose";
    whoamiTextEl.textContent = "";
    
    await delay(300);
    for (let i = 0; i < cmdText.length; i++) {
      whoamiTextEl.textContent += cmdText[i];
      await delay(40 + Math.random() * 25);
    }

    await delay(200);

    // Reveal hero name
    const fullName = PORTFOLIO_DATA.name || "Developer";
    heroNameEl.textContent = fullName;
    heroNameEl.style.opacity = "1";

    // Reveal title
    if (heroTitleEl) {
      heroTitleEl.textContent = PORTFOLIO_DATA.title || "";
      heroTitleEl.style.opacity = "1";
    }

    // Reveal system diagnostic tags
    const systemSpecs = document.getElementById('system-specs-box');
    if (systemSpecs) {
      systemSpecs.style.opacity = "1";
      systemSpecs.style.transition = "opacity 0.5s ease";
    }
  }

  // 2. COMMAND NAVIGATION
  function initCommandNav() {
    const navButtons = document.querySelectorAll('[data-target-section]');
    
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetId = btn.getAttribute('data-target-section');
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
          e.preventDefault();
          
          navButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
          targetEl.style.boxShadow = '0 0 20px var(--accent-glow)';
          
          setTimeout(() => {
            targetEl.style.boxShadow = '';
          }, 1200);
        }
      });
    });
  }

  // 3. INTERACTIVE CLI CONSOLE
  function initCliConsole() {
    const cliInput = document.getElementById('terminal-cli-input');
    const cliOutput = document.getElementById('terminal-cli-output');
    if (!cliInput || !cliOutput) return;

    const commands = {
      help: () => \`Available commands:
  • whoami     - Display profile identity and headline
  • about      - Jump to Bio section
  • skills     - List all technical competencies
  • projects   - View portfolio project details
  • socials    - View social & contact channels
  • sudo hire  - Dispatch contract / full-time offer
  • matrix     - Render matrix digital rain stream
  • uptime     - Show system uptime and latency
  • clear      - Clear this interactive console output\`,

      whoami: () => \`User: \${PORTFOLIO_DATA.name}
Role: \${PORTFOLIO_DATA.title}
Location: \${PORTFOLIO_DATA.location}
Status: Available for high-impact opportunities\`,

      about: () => {
        const el = document.getElementById('sec-about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return 'Navigating to section [about.txt]...';
      },

      skills: () => {
        const el = document.getElementById('sec-skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return \`Loaded \${PORTFOLIO_DATA.skills.length} skills:\\n\${PORTFOLIO_DATA.skills.map(s => '  • ' + s).join('\\n')}\`;
      },

      projects: () => {
        const el = document.getElementById('sec-projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return \`Loaded \${PORTFOLIO_DATA.projectsCount} verified production repositories.\`;
      },

      socials: () => {
        const el = document.getElementById('sec-socials');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return \`Found \${PORTFOLIO_DATA.socialsCount} communication endpoints.\`;
      },

      contact: () => {
        const el = document.getElementById('sec-socials');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return 'Opening communication endpoints...';
      },

      hire: () => \`🎉 [ACCESS GRANTED]: Candidate matched!
Initiating contract negotiation protocol...
Status: 100% READY TO INTERVIEW.\`,

      'sudo hire': () => \`🎉 [ACCESS GRANTED]: Candidate matched!
Initiating contract negotiation protocol...
Status: 100% READY TO INTERVIEW.\`,

      matrix: () => \`01000110 01101111 01110010 01100111 01100101
Wake up, developer...
Follow the white rabbit.\`,

      uptime: () => 'Uptime: 99.99% · 0 kernel panics · latency: 4ms',

      date: () => new Date().toUTCString(),

      clear: () => {
        cliOutput.textContent = '';
        return null;
      }
    };

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawVal = cliInput.value.trim();
        if (!rawVal) return;

        const cmd = rawVal.toLowerCase();
        cliInput.value = '';

        if (commands[cmd]) {
          const res = commands[cmd]();
          if (res !== null) {
            cliOutput.textContent = \`[\${PORTFOLIO_DATA.promptUser}@\${PORTFOLIO_DATA.promptHost}:~$ \${rawVal}]\\n\${res}\`;
          }
        } else {
          cliOutput.textContent = \`[\${PORTFOLIO_DATA.promptUser}@\${PORTFOLIO_DATA.promptHost}:~$ \${rawVal}]\\nzsh: command not found: \${rawVal}. Type 'help' for valid commands.\`;
        }
      }
    });
  }

  // Initialize all interactive modules on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      runTypewriterAnimation();
      initCommandNav();
      initCliConsole();
    });
  } else {
    runTypewriterAnimation();
    initCommandNav();
    initCliConsole();
  }
})();
`;
}
