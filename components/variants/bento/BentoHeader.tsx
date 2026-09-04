"use client";

import React from "react";
import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";
import { MapPin, Sparkles, Activity, Clock, CheckCircle2, Shield } from "lucide-react";

interface BentoHeaderProps {
  data: PortfolioData;
}

export const BentoHeader: React.FC<BentoHeaderProps> = ({ data }) => {
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 w-full min-w-0">
      {/* Main Profile Hero Card (8 of 12 cols on desktop) */}
      <div className={`xl:col-span-8 p-4 sm:p-6 md:p-7 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl relative overflow-hidden group ${theme.borderHover} transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between min-w-0 w-full`}>
        {/* Dynamic Glowing Spotlight */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700 opacity-20"
          style={{ backgroundColor: theme.hex }}
        />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-zinc-800/30 rounded-full blur-2xl pointer-events-none" />

        {/* Top Badges Row */}
        <div>
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-3.5 sm:mb-4 relative z-10">
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold ${theme.badge} shadow-sm shrink-0`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.hex }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.hex }} />
              </span>
              <span>AVAILABLE FOR HIRE</span>
            </div>

            {data.location && (
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 shrink-0 max-w-full">
                <MapPin className={`w-3 h-3 ${theme.text} shrink-0`} />
                <span className="truncate max-w-[160px] sm:max-w-[200px]">{data.location}</span>
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-zinc-400 bg-zinc-850/60 border border-zinc-800 font-mono shrink-0">
              <Clock className={`w-3 h-3 ${theme.text}`} />
              <span>ACTIVE NOW</span>
            </div>
          </div>

          {/* Name and Title */}
          <div className="relative z-10 min-w-0 w-full">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-1.5 font-sans break-words">
              {data.name || "Alex Rivera"}
            </h1>
            <p className={`text-xs sm:text-sm md:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r ${theme.gradientText} mb-3 break-words`}>
              {data.title || "Senior Full Stack & Systems Engineer"}
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal break-words">
              {data.bio || "Specialized in building high-throughput distributed architectures, developer tooling, and modern reactive web applications."}
            </p>
          </div>
        </div>
      </div>

      {/* Right Stats & Performance Metrics Card (4 of 12 cols on desktop) */}
      <div className={`xl:col-span-4 p-4 sm:p-6 md:p-7 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl flex flex-col justify-between ${theme.borderHover} transition-all duration-300 relative overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.4)] min-w-0 w-full`}>
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-15"
          style={{ backgroundColor: theme.hex }}
        />

        <div>
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 mb-3 sm:mb-4 flex items-center justify-between">
            <span className={`flex items-center gap-1.5 ${theme.text}`}>
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>TELEMETRY</span>
            </span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.hex }} />
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-1 gap-2.5 sm:gap-3">
            <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-between min-w-0">
              <div className="min-w-0 mr-1">
                <div className="text-xl sm:text-2xl font-black text-white font-mono">{data.projects.length}</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 truncate">Featured Works</div>
              </div>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-between min-w-0">
              <div className="min-w-0 mr-1">
                <div className={`text-xl sm:text-2xl font-black font-mono ${theme.text}`}>{data.skills.length}</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 truncate">Competencies</div>
              </div>
              <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.text} shrink-0`} />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between font-mono mt-3">
          <span className="flex items-center gap-1">
            <CheckCircle2 className={`w-3.5 h-3.5 ${theme.text}`} />
            <span>99.9% UPTIME</span>
          </span>
          <span className={`font-bold ${theme.text}`}>READY</span>
        </div>
      </div>
    </div>
  );
};
