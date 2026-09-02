"use client";

import React from "react";
import { SocialLink } from "@/types/portfolio";
import { getThemeClasses } from "@/lib/theme-colors";
import { Globe, ArrowUpRight } from "lucide-react";

interface BentoSocialsProps {
  socials: SocialLink[];
  accentColor?: string;
}

export const BentoSocials: React.FC<BentoSocialsProps> = ({ socials, accentColor }) => {
  const theme = getThemeClasses(accentColor);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-xl hover:border-zinc-700 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between w-full min-w-0 overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Globe className={`w-3.5 h-3.5 ${theme.text} shrink-0`} />
            <span>CONNECT &amp; INQUIRIES</span>
          </h2>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded-full border border-zinc-800">
            {socials.length} CHANNELS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full min-w-0">
          {socials.map((soc, idx) => (
            <a
              key={soc.id || idx}
              href={soc.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700/60 ${theme.borderHover} text-xs flex items-center justify-between transition-all group shadow-sm min-w-0`}
            >
              <div className="truncate min-w-0 mr-1.5">
                <div className={`font-bold text-zinc-200 capitalize ${theme.textHover} transition-colors truncate`}>
                  {soc.platform}
                </div>
                <div className="text-[10px] text-zinc-400 truncate font-mono">{soc.label || soc.url}</div>
              </div>
              <ArrowUpRight className={`w-3.5 h-3.5 text-zinc-400 group-hover:${theme.text} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
