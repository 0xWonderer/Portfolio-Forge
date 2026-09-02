"use client";

import React from "react";
import { Terminal } from "lucide-react";

interface TerminalNavProps {
  onNavigate?: (sectionId: string) => void;
}

export const TerminalNav: React.FC<TerminalNavProps> = ({ onNavigate }) => {
  const commands = [
    { label: "cat about.txt", target: "preview-sec-about", id: "about" },
    { label: "ls -la skills/", target: "preview-sec-skills", id: "skills" },
    { label: "ls -l projects/", target: "preview-sec-projects", id: "projects" },
    { label: "open socials/", target: "preview-sec-socials", id: "socials" },
  ];

  const handleClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav className="mb-6 bg-zinc-950/80 border border-zinc-800/80 rounded-lg p-3 font-mono">
      <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium uppercase tracking-wider mb-2.5">
        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
        <span>QUICK COMMANDS (CLICK TO NAVIGATE)</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {commands.map((cmd) => (
          <button
            key={cmd.id}
            type="button"
            onClick={(e) => handleClick(e, cmd.target)}
            className="text-xs bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-emerald-950/50 hover:border-emerald-500/50 border border-zinc-800 px-3 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <span className="text-emerald-500">$</span>
            <span>{cmd.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
