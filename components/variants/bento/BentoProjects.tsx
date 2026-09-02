"use client";

import React from "react";
import { Project } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";
import { FolderGit2, Star, ArrowUpRight } from "lucide-react";

interface BentoProjectsProps {
  projects: Project[];
  accentColor?: string;
}

export const BentoProjects: React.FC<BentoProjectsProps> = ({ projects, accentColor }) => {
  const theme = getThemeClasses(accentColor);

  return (
    <div className="font-sans w-full min-w-0">
      <div className="flex items-center justify-between mb-3 px-1 flex-wrap gap-2">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <FolderGit2 className={`w-3.5 h-3.5 ${theme.text} shrink-0`} />
          <span>SELECTED DEPLOYMENTS &amp; WORKS</span>
        </h2>
        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded-full border border-zinc-800">
          {projects.length} REPOSITORIES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
        {projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className={`p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl flex flex-col justify-between ${theme.borderHover} transition-all duration-300 group relative overflow-hidden min-w-0 w-full`}
          >
            {/* Top subtle hover accent */}
            <div
              className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.hex}, transparent)` }}
            />

            <div>
              <div className="flex items-start justify-between gap-2.5 mb-2 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.hex }} />
                  <h3 className={`text-sm font-bold text-white ${theme.textHover} transition-colors truncate`}>
                    {proj.title}
                  </h3>
                </div>

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-xl bg-zinc-800/80 hover:text-white text-zinc-400 border border-zinc-700/60 transition-all duration-200 shrink-0"
                    title="Open Live Deployment"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-3.5 font-normal break-words">
                {proj.description}
              </p>
            </div>

            {/* Tags / Badges */}
            <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {proj.tags &&
                  proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md ${theme.badge}`}
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                <Star className="w-3 h-3 text-amber-400/90" />
                <span>PROD</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
