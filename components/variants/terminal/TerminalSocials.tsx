"use client";

import React from "react";
import { SocialLink } from "@/types/portfolio";
import { Globe, Mail, Link, MessageSquare, ArrowUpRight, Code2 } from "lucide-react";

interface TerminalSocialsProps {
  socials: SocialLink[];
}

export const TerminalSocials: React.FC<TerminalSocialsProps> = ({ socials }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Code2 className="w-3.5 h-3.5 text-zinc-300" />;
      case "email":
        return <Mail className="w-3.5 h-3.5 text-emerald-400" />;
      case "discord":
        return <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />;
      case "linkedin":
      case "twitter":
      case "x":
        return <Link className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <section id="preview-sec-socials" className="mb-7 scroll-mt-6 font-mono">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-xs font-bold">[04]</span>
          <h2 className="text-sm sm:text-base font-semibold text-white flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>open socials/</span>
          </h2>
        </div>
        <span className="text-xs text-zinc-400">{socials.length} endpoints</span>
      </div>

      {socials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {socials.map((soc, idx) => (
            <a
              key={soc.id || `soc-${idx}`}
              href={soc.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-950/70 hover:bg-emerald-950/30 border border-zinc-800 hover:border-emerald-500/50 rounded-lg p-3 text-xs flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="p-1 rounded bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/30">
                  {getPlatformIcon(soc.platform)}
                </span>
                <div className="truncate">
                  <div className="text-zinc-200 font-semibold capitalize truncate">{soc.platform}</div>
                  <div className="text-zinc-400 text-[11px] truncate">{soc.label || soc.url}</div>
                </div>
              </div>
              <span className="text-emerald-400 flex items-center gap-0.5 text-[11px] font-mono group-hover:translate-x-0.5 transition-transform">
                <span>[connect]</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-950/40 border border-dashed border-zinc-850 rounded p-4 text-xs text-zinc-400 italic">
          // No social channels linked yet. Add links in the editor.
        </div>
      )}
    </section>
  );
};
