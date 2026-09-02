"use client";

import React from "react";
import { PortfolioVariant } from "@/types/portfolio";
import { Terminal, LayoutGrid, BookOpen, Zap, Check } from "lucide-react";

export interface TemplateOption {
  id: PortfolioVariant;
  name: string;
  category: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  borderActive: string;
  bgGlow: string;
  accent: string;
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "bento",
    name: "Cyber Bento",
    category: "Modern / Glassmorphic",
    description: "Linear & Raycast inspired bento grid with live telemetry metrics, card spotlights, and glowing border accents.",
    icon: LayoutGrid,
    badge: "Bento Telemetry",
    borderActive: "border-cyan-500",
    bgGlow: "bg-cyan-500/10",
    accent: "text-cyan-400",
  },
  {
    id: "terminal",
    name: "Terminal Matrix",
    category: "Classic Unix / Hacker",
    description: "Authentic hacker terminal with animated typewriter engine, interactive bash commands, and CRT scanlines.",
    icon: Terminal,
    badge: "Interactive CLI",
    borderActive: "border-emerald-500",
    bgGlow: "bg-emerald-500/10",
    accent: "text-emerald-400",
  },
  {
    id: "minimal",
    name: "Minimal Editorial",
    category: "Swiss / High-End",
    description: "High-contrast editorial typography with dramatic serif headlines, refined line items, and generous whitespace.",
    icon: BookOpen,
    badge: "Editorial Serif",
    borderActive: "border-amber-400/80",
    bgGlow: "bg-amber-500/10",
    accent: "text-amber-300",
  },
  {
    id: "synthwave",
    name: "Cyberpunk HUD",
    category: "80s Neon / Outrun",
    description: "Retro-futuristic 3D horizon grid with audio visualizer, glowing neon magenta & electric cyan cyber cards.",
    icon: Zap,
    badge: "80s Outrun",
    borderActive: "border-pink-500",
    bgGlow: "bg-pink-500/10",
    accent: "text-pink-400",
  },
];

interface TemplateSelectorProps {
  currentVariant: PortfolioVariant;
  onSelect: (variant: PortfolioVariant) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentVariant,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {TEMPLATE_OPTIONS.map((tmpl) => {
        const Icon = tmpl.icon;
        const isSelected = (currentVariant || "bento") === tmpl.id;

        return (
          <div
            key={tmpl.id}
            onClick={() => onSelect(tmpl.id)}
            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
              isSelected
                ? `${tmpl.borderActive} ${tmpl.bgGlow} shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-zinc-900/90`
                : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60"
            }`}
          >
            {/* Header with Title and Checkmark on the same flex line */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    isSelected ? "bg-zinc-900" : "bg-zinc-900/80"
                  } border border-zinc-800 shadow-inner group-hover:scale-105 transition-transform`}
                >
                  <Icon className={`w-4 h-4 ${tmpl.accent}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{tmpl.name}</span>
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {tmpl.category}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              {isSelected ? (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Active</span>
                </div>
              ) : (
                <span className="text-[11px] text-zinc-400 group-hover:text-emerald-400 font-semibold transition-colors shrink-0">
                  Select →
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed mb-3 pl-0.5">
              {tmpl.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2.5 border-t border-zinc-850 text-xs">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                {tmpl.badge}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Standalone HTML/CSS/JS
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
