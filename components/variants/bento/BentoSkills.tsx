"use client";

import React from "react";
import { Cpu } from "lucide-react";

interface BentoSkillsProps {
  skills: string[];
  accentColor?: string;
}

export const BentoSkills: React.FC<BentoSkillsProps> = ({ skills, accentColor }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl hover:border-zinc-700 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between w-full min-w-0 overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
            <span>TECH STACK</span>
          </h2>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded-full border border-zinc-800">
            {skills.length} SKILLS
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 hover:bg-zinc-800 transition-colors cursor-default shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
