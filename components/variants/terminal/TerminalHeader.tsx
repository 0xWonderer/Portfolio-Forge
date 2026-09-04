"use client";

import React, { useEffect, useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";
import { ShieldCheck } from "lucide-react";

interface TerminalHeaderProps {
  data: PortfolioData;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({ data }) => {
  const [typedCmd, setTypedCmd] = useState("");
  const [showContent, setShowContent] = useState(false);
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  const fullCmd = "whoami --verbose";
  const terminalUser = data.themeConfig?.terminalName || "guest@portfolio";

  useEffect(() => {
    let currentIdx = 0;
    setTypedCmd("");
    setShowContent(false);

    const interval = setInterval(() => {
      if (currentIdx <= fullCmd.length) {
        setTypedCmd(fullCmd.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        setShowContent(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [data.name, data.title]);

  return (
    <header className="pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-dashed border-zinc-800 w-full min-w-0">
      {/* Command prompt line */}
      <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono mb-3 min-w-0">
        <span className={`${theme.text} font-semibold truncate max-w-[160px]`}>{terminalUser}</span>
        <span className="text-zinc-500">$&gt;</span>
        <span className="text-zinc-200 font-medium">{typedCmd}</span>
        <span className={`inline-block w-2 h-3.5 sm:h-4 ${theme.bg} animate-pulse align-middle shrink-0`} />
      </div>

      {/* Name and Title with dynamic theme accent glow */}
      <div className={`transition-opacity duration-500 min-w-0 ${showContent ? "opacity-100" : "opacity-90"}`}>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight font-mono break-words">
          {data.name || "Alex Rivera"}
        </h1>
        <p className={`${theme.text} text-xs sm:text-sm md:text-base font-mono font-medium mt-1 break-words`}>
          {data.title || "Senior Systems Engineer"}
        </p>
      </div>

      {/* System specifications / diagnostics */}
      <div className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-1.5 text-xs font-mono text-zinc-400 mt-3.5 pt-3 border-t border-zinc-900 w-full min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-zinc-400">LOC:</span>
          <span className="text-zinc-300 truncate max-w-[140px] sm:max-w-[200px]">{data.location || "Earth (Remote)"}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">SHELL:</span>
          <span className="text-zinc-300">zsh 5.9</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">UPTIME:</span>
          <span className="text-zinc-300">99.99%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className={`w-3.5 h-3.5 ${theme.text}`} />
          <span className={`${theme.text} font-semibold`}>STATUS: READY</span>
        </div>
      </div>
    </header>
  );
};
