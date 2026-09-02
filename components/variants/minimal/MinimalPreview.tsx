"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";
import { Monitor, Smartphone, BookOpen, ArrowUpRight, Radio, Maximize2 } from "lucide-react";

interface MinimalPreviewProps {
  data: PortfolioData;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const MinimalPreview: React.FC<MinimalPreviewProps> = ({
  data,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const theme = getThemeClasses(data.themeConfig?.accentColor);

  return (
    <div className="flex flex-col h-full bg-[#08080a] rounded-2xl border border-zinc-800/90 overflow-hidden shadow-2xl relative w-full min-w-0">
      {/* Top Toolbar */}
      <div className="bg-[#0e0e12] border-b border-zinc-800/90 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 text-xs flex-wrap z-20 shrink-0">
        <div className="flex items-center gap-2">
          {/* Subtle dots */}
          <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 inline-block" />
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${theme.badge} font-serif font-medium text-[11px] sm:text-xs`}>
            <BookOpen className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL EDITORIAL</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Device toggle */}
          <div className="flex items-center bg-zinc-900 p-0.5 rounded-xl border border-zinc-800">
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                previewMode === "desktop"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
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
                  ? "bg-zinc-800 text-zinc-100 shadow-sm"
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

      {/* Canvas */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-6 flex justify-center items-start bg-[#060608] custom-scrollbar w-full min-w-0">
        <div
          className={`w-full max-w-full bg-[#0d0d10] border border-zinc-800/90 rounded-2xl p-5 sm:p-10 transition-all duration-300 shadow-[0_30px_70px_rgba(0,0,0,0.9)] min-w-0 ${
            previewMode === "mobile"
              ? "max-w-md"
              : isFullscreen
              ? "max-w-4xl pt-6"
              : "max-w-3xl"
          }`}
        >
          {/* Header Metadata */}
          <div className="flex items-center justify-between pb-5 border-b border-zinc-800/80 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.hex }} />
              <span className="text-zinc-300 font-semibold">{data.location || "San Francisco, CA (Remote)"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Radio className={`w-3 h-3 ${theme.text} animate-pulse`} />
              <span className={`${theme.text} font-bold`}>STATUS: AVAILABLE</span>
            </div>
          </div>

          {/* Large Editorial Headline */}
          <header className="pt-6 sm:pt-8 pb-8 sm:pb-10 border-b border-zinc-800/80">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.06] mb-3 sm:mb-4 break-words">
              {data.name || "Alex Rivera"}
            </h1>
            <p className="text-base sm:text-xl font-serif italic text-zinc-400 max-w-xl leading-relaxed break-words">
              {data.title || "Senior Systems Engineer & Full Stack Architect"}
            </p>
          </header>

          {/* Statement / Bio */}
          <section className="py-6 sm:py-8 border-b border-zinc-800/80">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-3">
              [ 01 // ESSAY &amp; BIO ]
            </div>
            <p className="text-sm sm:text-lg text-zinc-200 leading-relaxed font-sans font-light break-words">
              {data.bio || "Specialized in building high-throughput distributed architectures, developer tooling, and modern reactive web applications."}
            </p>
          </section>

          {/* Selected Projects */}
          <section className="py-6 sm:py-8 border-b border-zinc-800/80">
            <div className="flex items-center justify-between mb-5 sm:mb-6">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                [ 02 // SELECTED WORKS ({data.projects.length}) ]
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400">INDEX</span>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj, idx) => (
                <article
                  key={proj.id || idx}
                  className="group pt-5 border-t border-zinc-850 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className={`text-base sm:text-xl font-serif text-white group-${theme.textHover} transition-colors break-words`}>
                      <span className="text-zinc-400 font-mono text-xs mr-2">0{idx + 1}.</span>
                      <span>{proj.title}</span>
                    </h3>

                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-mono text-zinc-400 group-${theme.textHover} flex items-center gap-1 shrink-0 transition-colors`}
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-3 font-sans break-words">
                    {proj.description}
                  </p>

                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-400">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="border-b border-zinc-800 pb-0.5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Competencies */}
          <section className="py-6 sm:py-8 border-b border-zinc-800/80">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-4">
              [ 03 // TECHNICAL STACK ]
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-full bg-zinc-900/90 text-zinc-200 text-xs font-mono border border-zinc-800 hover:${theme.border} transition-colors`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Social & Contact */}
          <section className="pt-6 sm:pt-8">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-4">
              [ 04 // CORRESPONDENCE ]
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {data.socials.map((soc, idx) => (
                <a
                  key={soc.id || idx}
                  href={soc.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs sm:text-sm text-zinc-300 hover:${theme.text} font-mono flex items-center gap-1.5 border-b border-zinc-750 pb-0.5 transition-all`}
                >
                  <span className="capitalize">{soc.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              ))}
            </div>
          </section>

          <footer className="mt-10 sm:mt-12 pt-6 border-t border-zinc-900 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 flex-wrap gap-2">
            <div>Architectural Editorial · PortfolioForge</div>
            <div>All rights reserved // 2026</div>
          </footer>
        </div>
      </div>
    </div>
  );
};
