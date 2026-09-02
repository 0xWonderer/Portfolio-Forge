"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalNav } from "./TerminalNav";
import { TerminalAbout } from "./TerminalAbout";
import { TerminalSkills } from "./TerminalSkills";
import { TerminalProjects } from "./TerminalProjects";
import { TerminalSocials } from "./TerminalSocials";
import { TerminalInteractiveCli } from "./TerminalInteractiveCli";
import { getThemeClasses } from "@/lib/theme-colors";
import { Terminal, Monitor, Smartphone, RefreshCw, Maximize2, Cpu, HardDrive } from "lucide-react";

interface TerminalPreviewProps {
  data: PortfolioData;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const TerminalPreview: React.FC<TerminalPreviewProps> = ({
  data,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [key, setKey] = useState(0); // for replaying animation
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [scanlines, setScanlines] = useState(true);
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  const handleResetAnimation = () => {
    setKey((prev) => prev + 1);
  };

  const terminalName = data.themeConfig?.terminalName || "guest@portfolio";

  return (
    <div className="flex flex-col h-full bg-[#05080f] rounded-2xl border border-zinc-800/90 overflow-hidden shadow-2xl relative w-full min-w-0">
      {/* Live Preview Top Control Toolbar */}
      <div className="bg-zinc-950/95 border-b border-zinc-800 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 text-xs flex-wrap z-20 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-2">
          {/* Window Control Dots */}
          <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90 inline-block shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/90 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${theme.badge} font-mono font-bold text-[11px] sm:text-xs shadow-sm`}>
            <Terminal className="w-3.5 h-3.5" />
            <span>TERMINAL MATRIX OS</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-zinc-400 pl-2">
            <span className="flex items-center gap-1">
              <Cpu className={`w-3 h-3 ${theme.text}`} />
              <span>CPU: 12%</span>
            </span>
            <span className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-cyan-400" />
              <span>RAM: 3.8GB</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Scanlines toggle */}
          <button
            type="button"
            onClick={() => setScanlines(!scanlines)}
            className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono border transition-all cursor-pointer ${
              scanlines
                ? `${theme.badge} font-bold shadow-sm`
                : "bg-zinc-950 text-zinc-400 border-zinc-800"
            }`}
            title="Toggle CRT Scanline Effect"
          >
            CRT: {scanlines ? "ON" : "OFF"}
          </button>

          {/* Device viewport toggle */}
          <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-zinc-800">
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                previewMode === "desktop"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("mobile")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                previewMode === "mobile"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Replay typing animation */}
          <button
            type="button"
            onClick={handleResetAnimation}
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer shrink-0"
            title="Re-run Typing Animation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Expand Button (when in split mode) */}
          {!isFullscreen && onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors text-xs font-semibold cursor-pointer shadow-sm shrink-0"
              title="Open Full Screen Preview"
            >
              <Maximize2 className={`w-3.5 h-3.5 ${theme.text}`} />
              <span className="hidden sm:inline">Expand</span>
            </button>
          )}
        </div>
      </div>

      {/* Preview Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 flex justify-center items-start bg-[#05080f] custom-scrollbar relative w-full min-w-0">
        <div
          className={`w-full max-w-full transition-all duration-300 min-w-0 ${
            previewMode === "mobile"
              ? "max-w-md"
              : isFullscreen
              ? "max-w-4xl pt-4"
              : "max-w-3xl"
          }`}
        >
          {/* Terminal Window Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] w-full min-w-0">
            
            {/* Optional Scanlines */}
            {scanlines && (
              <div
                className="absolute inset-0 pointer-events-none z-20 opacity-30 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)",
                  backgroundSize: "100% 4px",
                }}
              />
            )}

            {/* Window Sub-Header */}
            <div className="bg-zinc-900/90 border-b border-zinc-800 px-4 sm:px-5 py-2.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Terminal className={`w-3.5 h-3.5 ${theme.text}`} />
                <span className="font-bold text-zinc-300 truncate">{terminalName}: ~</span>
              </div>
              <div className={`text-[10px] sm:text-[11px] font-mono ${theme.badge} px-2.5 py-0.5 rounded-full font-bold shadow-sm`}>
                ● MATRIX_SYNCED
              </div>
            </div>

            {/* Terminal Inner Content */}
            <div className="p-4 sm:p-7 relative z-10">
              <TerminalHeader key={key} data={data} />
              <TerminalNav />
              
              <main className="space-y-6">
                <TerminalAbout bio={data.bio} />
                <TerminalSkills skills={data.skills} />
                <TerminalProjects projects={data.projects} />
                <TerminalSocials socials={data.socials} />
                <TerminalInteractiveCli data={data} />
              </main>

              <footer className="mt-8 pt-4 border-t border-zinc-900 text-xs font-mono text-zinc-400 flex items-center justify-between flex-wrap gap-2">
                <div>Generated with PortfolioForge (Terminal Matrix)</div>
                <div>exit status: 0 (clean)</div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
