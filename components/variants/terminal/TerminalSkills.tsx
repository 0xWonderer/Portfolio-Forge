"use client";

import React from "react";
import { Cpu } from "lucide-react";

interface TerminalSkillsProps {
  skills: string[];
}

export const TerminalSkills: React.FC<TerminalSkillsProps> = ({ skills }) => {
  return (
    <section id="preview-sec-skills" className="mb-7 scroll-mt-6 font-mono">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs font-bold">[02]</span>
          <h2 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>ls -la skills/</span>
          </h2>
        </div>
        <span className="text-xs text-zinc-400">{skills.length} competencies</span>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => {
            const mockSize = `${((index + 1) * 128) % 1024 + 256}B`;
            return (
              <div
                key={`${skill}-${index}`}
                className="bg-zinc-950/70 hover:bg-emerald-950/30 border border-zinc-800 hover:border-emerald-500/40 rounded px-2.5 py-1.5 text-xs text-zinc-200 transition-all flex items-center gap-2 group"
              >
                <span className="text-zinc-400 text-[10px] font-mono group-hover:text-emerald-400">.sh</span>
                <span className="font-medium">{skill}</span>
                <span className="text-zinc-400 text-[10px]">({mockSize})</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-zinc-950/40 border border-dashed border-zinc-850 rounded p-4 text-xs text-zinc-400 italic">
          // No skills listed yet. Add skills in the editor.
        </div>
      )}
    </section>
  );
};
