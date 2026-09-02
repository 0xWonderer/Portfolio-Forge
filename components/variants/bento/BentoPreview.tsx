"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { BentoHeader } from "./BentoHeader";
import { BentoSkills } from "./BentoSkills";
import { BentoProjects } from "./BentoProjects";
import { BentoSocials } from "./BentoSocials";
import { getThemeClasses } from "@/lib/theme-colors";
import { Monitor, Smartphone, LayoutGrid, Maximize2 } from "lucide-react";

interface BentoPreviewProps {
  data: PortfolioData;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const BentoPreview: React.FC<BentoPreviewProps> = ({
  data,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return (
    <div className="flex flex-col h-full w-full bg-[#06080e] rounded-2xl border border-zinc-800/90 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] relative min-w-0">
      {/* Top Window Chrome Toolbar */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/80 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 text-xs flex-wrap z-20 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-2">
          {/* macOS window dots */}
          <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${theme.badge} font-medium text-[11px] sm:text-xs`}>
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="font-bold">HYPER BENTO GRID</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
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

      {/* Main Canvas with dynamic Aurora background and strict overflow-x-hidden */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 flex justify-center items-start bg-[#06080e] custom-scrollbar relative w-full min-w-0">
        
        {/* Dynamic Glowing Aurora Mesh strictly inside relative container */}
        <div
          className="absolute top-10 left-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: theme.hex }}
        />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-zinc-800/30 rounded-full blur-[100px] pointer-events-none" />

        <div
          className={`w-full max-w-full relative z-10 transition-all duration-300 space-y-4 min-w-0 ${
            previewMode === "mobile"
              ? "max-w-md"
              : isFullscreen
              ? "max-w-4xl pt-4"
              : "max-w-3xl"
          }`}
        >
          {/* Row 1: Profile & Telemetry Header */}
          <BentoHeader data={data} />

          {/* Row 2: Skills & Socials (Equal width 2-column cards on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
            <BentoSkills skills={data.skills} accentColor={data.themeConfig?.accentColor} />
            <BentoSocials socials={data.socials} accentColor={data.themeConfig?.accentColor} />
          </div>

          {/* Row 3: Featured Projects */}
          <BentoProjects projects={data.projects} accentColor={data.themeConfig?.accentColor} />

          {/* Footer */}
          <footer className="pt-4 border-t border-zinc-900 text-xs text-zinc-400 flex items-center justify-between font-mono flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.hex }} />
              <span>Built with PortfolioForge // Hyper Bento</span>
            </div>
            <div>ZERO RUNTIME DEPLOY</div>
          </footer>
        </div>
      </div>
    </div>
  );
};
