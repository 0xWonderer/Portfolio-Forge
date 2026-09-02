"use client";

import React from "react";
import { FileText } from "lucide-react";

interface TerminalAboutProps {
  bio: string;
}

export const TerminalAbout: React.FC<TerminalAboutProps> = ({ bio }) => {
  return (
    <section id="preview-sec-about" className="mb-7 scroll-mt-6 font-mono">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs font-bold">[01]</span>
          <h2 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>cat about.txt</span>
          </h2>
        </div>
        <span className="text-xs text-zinc-400 font-mono">UTF-8 text</span>
      </div>

      <div className="bg-zinc-950/60 border-l-2 border-emerald-500 rounded-r-lg p-4 text-sm text-zinc-300 leading-relaxed font-sans sm:font-mono">
        {bio ? (
          <p className="whitespace-pre-wrap">{bio}</p>
        ) : (
          <p className="text-zinc-400 italic">// Enter your biography in the editor pane.</p>
        )}
      </div>
    </section>
  );
};
