"use client";

import React from "react";
import { Project } from "@/types/portfolio";
import { FolderGit2, ExternalLink } from "lucide-react";

interface TerminalProjectsProps {
  projects: Project[];
}

export const TerminalProjects: React.FC<TerminalProjectsProps> = ({ projects }) => {
  return (
    <section id="preview-sec-projects" className="mb-7 scroll-mt-6 font-mono">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs font-bold">[03]</span>
          <h2 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>ls -l projects/</span>
          </h2>
        </div>
        <span className="text-xs text-zinc-400">{projects.length} repositories</span>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-3">
          {projects.map((proj, idx) => (
            <article
              key={proj.id || `proj-${idx}`}
              className="bg-zinc-950/70 border border-zinc-800/90 hover:border-emerald-500/50 rounded-lg p-4 transition-all duration-200 hover:shadow-[0_0_15px_rgba(16,185,129,0.12)] group"
            >
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2 group-hover:text-emerald-300 transition-colors">
                  <span className="text-emerald-400 text-xs">&#9656;</span>
                  <span>{proj.title || "Untitled Project"}</span>
                </h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                  >
                    <span>[open_link]</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3 font-sans">
                {proj.description || "No description provided."}
              </p>

              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={`${tag}-${tIdx}`}
                      className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded"
                    >
                      --tag:{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-950/40 border border-dashed border-zinc-850 rounded p-4 text-xs text-zinc-400 italic">
          // No projects added yet. Click "Add Project" in the editor.
        </div>
      )}
    </section>
  );
};
