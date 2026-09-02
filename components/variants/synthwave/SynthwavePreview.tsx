"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";
import {
  Zap,
  Monitor,
  Smartphone,
  Terminal,
  Cpu,
  Radio,
  ExternalLink,
  Shield,
  Maximize2,
} from "lucide-react";

interface SynthwavePreviewProps {
  data: PortfolioData;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const SynthwavePreview: React.FC<SynthwavePreviewProps> = ({
  data,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return (
    <div className="flex flex-col h-full bg-[#070312] rounded-2xl border border-pink-500/30 overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.15)] relative w-full min-w-0">
      {/* Top HUD Toolbar */}
      <div className="bg-[#0f0722]/90 border-b border-pink-500/30 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 text-xs flex-wrap z-20 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-2">
          {/* Cyber dots */}
          <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${theme.badge} font-mono font-bold text-[11px] sm:text-xs shadow-sm`}>
            <Zap className="w-3.5 h-3.5" />
            <span>CYBERPUNK HUD 2099</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Device viewport toggle */}
          <div className="flex items-center bg-[#180d33] p-0.5 rounded-xl border border-pink-500/30">
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                previewMode === "desktop"
                  ? "bg-pink-600/40 text-pink-300 shadow-sm"
                  : "text-zinc-400 hover:text-pink-300"
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
                  ? "bg-pink-600/40 text-pink-300 shadow-sm"
                  : "text-zinc-400 hover:text-pink-300"
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
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#180d33] hover:bg-[#231349] text-pink-300 hover:text-white border border-pink-500/30 transition-colors text-xs font-semibold cursor-pointer shadow-sm shrink-0"
              title="Open Full Screen Preview"
            >
              <Maximize2 className={`w-3.5 h-3.5 ${theme.text}`} />
              <span className="hidden sm:inline">Expand</span>
            </button>
          )}
        </div>
      </div>

      {/* Canvas with Animated Perspective Grid */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 flex justify-center items-start bg-[#0a0518] custom-scrollbar relative w-full min-w-0">
        
        {/* Neon Horizon Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(244, 63, 94, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.2) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Sun Glow on horizon */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: theme.hex }}
        />

        <div
          className={`w-full max-w-full relative z-10 transition-all duration-300 min-w-0 ${
            previewMode === "mobile"
              ? "max-w-md"
              : isFullscreen
              ? "max-w-4xl pt-4"
              : "max-w-3xl"
          }`}
        >
          {/* Header Card */}
          <div className="p-5 sm:p-8 rounded-2xl bg-[#140b2e]/90 border border-pink-500/50 backdrop-blur-xl mb-5 shadow-[0_0_35px_rgba(244,63,94,0.25)] relative overflow-hidden group min-w-0">
            <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
              <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${theme.badge} flex items-center gap-1.5`}>
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>NEO_TOKYO // CORE_ACTIVE</span>
              </div>
              <div className="text-[10px] sm:text-xs font-mono text-cyan-400/90 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>GRID LATENCY: 1.2ms</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 tracking-tight font-mono mb-2 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)] break-words">
              {data.name || "Alex Rivera"}
            </h1>

            <p className="text-sm sm:text-lg font-mono text-cyan-300 font-semibold mb-3 break-words">
              {data.title || "Full Stack Cyber Architect"}
            </p>

            <p className="text-xs sm:text-sm text-pink-100/80 leading-relaxed font-sans font-normal max-w-2xl break-words">
              {data.bio || "Specialized in building high-throughput distributed architectures, developer tooling, and modern reactive web applications."}
            </p>
          </div>

          {/* Grid Layout: Skills + Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 min-w-0">
            {/* Tech Stack Matrix */}
            <div className="p-5 rounded-2xl bg-[#140b2e]/80 border border-cyan-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.15)] min-w-0">
              <h2 className="text-xs font-mono font-bold text-cyan-400 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>SYNTH_STACK_MODULES</span>
                </span>
                <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-mono">
                  {data.skills.length} NODES
                </span>
              </h2>

              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#1a0f3c] text-cyan-200 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Neural Links / Socials */}
            <div className="p-5 rounded-2xl bg-[#140b2e]/80 border border-pink-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(244,63,94,0.15)] min-w-0">
              <h2 className="text-xs font-mono font-bold text-pink-400 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>NEURAL_TRANSMISSION</span>
                </span>
                <span className="text-[10px] bg-pink-950/80 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30 font-mono">
                  {data.socials.length} UPLINKS
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.socials.map((soc, idx) => (
                  <a
                    key={soc.id || idx}
                    href={soc.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#1e1145]/80 hover:bg-[#28175d] border border-pink-500/30 hover:border-pink-400 text-xs flex items-center justify-between transition-all group min-w-0"
                  >
                    <span className="truncate font-mono text-pink-200 capitalize group-hover:text-white transition-colors">
                      {soc.platform}
                    </span>
                    <ExternalLink className="w-3 h-3 text-pink-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Works */}
          <div className="p-5 sm:p-7 rounded-2xl bg-[#140b2e]/90 border border-purple-500/40 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.18)] min-w-0">
            <h2 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-pink-400" />
                <span>CYBER_PROJECTS_MANIFEST</span>
              </span>
              <span className="text-[10px] text-purple-400 font-mono">{data.projects.length} DEPLOYED</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#1d0e40]/80 border border-purple-500/30 hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)] transition-all flex flex-col justify-between group min-w-0"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                      <h3 className="text-sm font-mono font-bold text-pink-200 group-hover:text-pink-100 transition-colors truncate">
                        {proj.title}
                      </h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-200 text-xs font-mono shrink-0"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-pink-100/75 leading-relaxed font-sans mb-3 break-words">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-purple-900/60">
                    {proj.tags &&
                      proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950/60 text-pink-300 border border-pink-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="mt-6 pt-4 border-t border-pink-950 text-xs font-mono text-pink-400/60 flex items-center justify-between flex-wrap gap-2">
            <div>Cyberpunk HUD 2099 // PortfolioForge</div>
            <div>STATUS: ONLINE // ZERO_FAIL</div>
          </footer>
        </div>
      </div>
    </div>
  );
};
