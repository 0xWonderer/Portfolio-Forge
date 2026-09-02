"use client";

import React from "react";
import { PortfolioVariant } from "@/types/portfolio";
import { TemplateSelector } from "@/components/variants/TemplateSelector";
import { Palette, Sparkles } from "lucide-react";

interface TemplateStepProps {
  currentVariant: PortfolioVariant;
  onChangeVariant: (variant: PortfolioVariant) => void;
}

export const TemplateStep: React.FC<TemplateStepProps> = ({
  currentVariant,
  onChangeVariant,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-emerald-400" />
          <span>Choose Portfolio Design Template</span>
        </h2>
        <p className="text-xs text-zinc-400 mt-0.5">
          Select a unique design layout. Your real content will be instantly rendered in the live preview.
        </p>
      </div>

      <TemplateSelector
        currentVariant={currentVariant}
        onSelect={onChangeVariant}
      />

      <div className="p-3 bg-zinc-950/40 border border-zinc-850 rounded-xl text-xs text-zinc-400 flex items-center gap-2 font-mono">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>You can switch between any of these designs at any point without losing your data!</span>
      </div>
    </div>
  );
};
