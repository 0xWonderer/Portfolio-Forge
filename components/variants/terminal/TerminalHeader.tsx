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
    <header className="pb-6 mb-6 border-b border-dashed border-zinc-800">
      {/* Command prompt line */}
      <div className="flex items-center flex-wrap gap-2 text-sm font-mono mb-3">
        <span className={`${theme.text} font-semibold`}>{terminalUser}</span>
        <span className="text-zinc-500">$&gt;</span>
        <span className="text-zinc-200 font-medium">{typedCmd}</span>
        <span className={`inline-block w-2 h-4 ${theme.bg} animate-pulse align-middle`} />
      </div>

      {/* Name and Title with dynamic theme accent glow */}
      <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-90"}`}>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
          {data.name || "Alex Rivera"}
        </h1>
        <p className={`${theme.text} text-sm sm:text-base font-mono font-medium mt-1`}>
          {data.title || "Senior Systems Engineer"}
        </p>
      </div>

      {/* System specifications / diagnostics */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono text-zinc-400 mt-4 pt-3 border-t border-zinc-900">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400">LOC:</span>
          <span className="text-zinc-300">{data.location || "Earth (Remote)"}</span>
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
