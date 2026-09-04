"use client";

import React, { useState } from "react";
import { PortfolioData } from "@/types/portfolio";
import { downloadPortfolioZip, downloadSingleFileHtml } from "@/lib/export/zipBundle";
import {
  Download,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  FileCode,
  Globe2,
  Check,
  Zap,
  FileCode2,
} from "lucide-react";

interface ExportStepProps {
  data: PortfolioData;
  onLoadSample: () => void;
  onResetBlank: () => void;
  onUpdateTheme: (accent: "emerald" | "cyan" | "amber" | "violet" | "rose") => void;
}

const ACCENT_COLORS: {
  id: "emerald" | "cyan" | "amber" | "violet" | "rose";
  label: string;
  bgClass: string;
}[] = [
  { id: "emerald", label: "Emerald Matrix", bgClass: "bg-emerald-500" },
  { id: "cyan", label: "Cyan Electric", bgClass: "bg-cyan-500" },
  { id: "amber", label: "Amber Glow", bgClass: "bg-amber-500" },
  { id: "violet", label: "Violet Neon", bgClass: "bg-violet-500" },
  { id: "rose", label: "Rose Synth", bgClass: "bg-rose-500" },
];

export const ExportStep: React.FC<ExportStepProps> = ({
  data,
  onLoadSample,
  onResetBlank,
  onUpdateTheme,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    try {
      setIsExporting(true);
      await downloadPortfolioZip(data);
      setDownloadSuccess("Downloaded full .ZIP bundle (HTML + CSS + JS)!");
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadSingleHtml = () => {
    try {
      downloadSingleFileHtml(data);
      setDownloadSuccess("Downloaded standalone single-file index.html!");
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (error) {
      console.error("Single HTML export failed:", error);
    }
  };

  const activeAccent = data.themeConfig?.accentColor || "emerald";

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Review &amp; Export Bundle</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Download your standalone static HTML/CSS/JS package with 0 backend dependencies.
          </p>
        </div>
      </div>

      {/* Theme Accent Picker */}
      <div className="p-3.5 sm:p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-2.5 w-full min-w-0">
        <label className="block text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Accent Color Theme</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((col) => {
            const isSelected = activeAccent === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => onUpdateTheme(col.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer min-h-[34px] ${
                  isSelected
                    ? "border-zinc-500 bg-zinc-850 text-white shadow-sm font-bold"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${col.bgClass} inline-block shrink-0`} />
                <span>{col.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checklist Preview */}
      <div className="p-3.5 sm:p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-2.5 w-full min-w-0">
        <div className="text-xs font-semibold text-zinc-300">Package Verification Checklist</div>
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span className="truncate">Profile: {data.name ? `${data.name} (${data.title})` : "Missing name"}</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span>Skills: {data.skills.length} competencies</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span>Projects: {data.projects.length} repositories</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span>Socials: {data.socials.length} endpoints</span>
          </div>
        </div>
      </div>

      {/* Export Action Buttons */}
      <div className="space-y-2.5 pt-1 w-full min-w-0">
        <button
          type="button"
          onClick={handleDownloadZip}
          disabled={isExporting}
          className="btn-base btn-primary w-full h-11 text-xs font-extrabold gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>
            {isExporting
              ? "Packaging ZIP Bundle..."
              : `Download Standalone ${data.variant?.toUpperCase() || "PORTFOLIO"} (.ZIP)`}
          </span>
        </button>

        <button
          type="button"
          onClick={handleDownloadSingleHtml}
          className="btn-base btn-secondary w-full h-10 text-xs font-semibold gap-2 border-zinc-700/80 hover:border-zinc-500 cursor-pointer"
        >
          <FileCode2 className="w-4 h-4 text-amber-400" />
          <span>Download 1-File Standalone (index.html)</span>
        </button>

        {downloadSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>

      {/* Quick sample / reset tools */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-850 gap-2 flex-wrap">
        <button
          type="button"
          onClick={onLoadSample}
          className="btn-base btn-ghost h-8 px-2.5 text-xs text-zinc-400 hover:text-white"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Reload Sample Data</span>
        </button>

        <button
          type="button"
          onClick={onResetBlank}
          className="btn-base btn-ghost h-8 px-2.5 text-xs text-zinc-400 hover:text-rose-400"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear All Fields</span>
        </button>
      </div>
    </div>
  );
};
