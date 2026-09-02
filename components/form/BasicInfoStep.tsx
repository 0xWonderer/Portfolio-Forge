"use client";

import React from "react";
import { PortfolioData } from "@/types/portfolio";
import { User, Terminal, MapPin, AlignLeft } from "lucide-react";

interface BasicInfoStepProps {
  data: PortfolioData;
  onChange: (updated: Partial<PortfolioData>) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-400" />
            <span>Profile &amp; Identity</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Your primary contact info, headline, and terminal host identifier.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. Alex Rivera"
            className="form-input"
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Job Title / Headline <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="e.g. Senior Full Stack Engineer"
            className="form-input"
          />
        </div>
      </div>

      {/* Location / Availability */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Location &amp; Availability</span>
        </label>
        <input
          type="text"
          value={data.location || ""}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="e.g. San Francisco, CA (Open to Remote)"
          className="form-input"
        />
      </div>

      {/* Terminal Prompt Host Name */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminal Host Identifier</span>
          </span>
          <span className="text-[11px] text-zinc-400 font-mono">user@hostname</span>
        </label>
        <input
          type="text"
          value={data.themeConfig?.terminalName || ""}
          onChange={(e) =>
            onChange({
              themeConfig: {
                ...data.themeConfig,
                terminalName: e.target.value,
              },
            })
          }
          placeholder="e.g. rivera@dev-box"
          className="form-input font-mono"
        />
      </div>

      {/* Bio / About */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
          <AlignLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>About / Biography <span className="text-rose-400">*</span></span>
        </label>
        <textarea
          rows={4}
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          placeholder="A concise summary of your technical background, passions, and core engineering principles..."
          className="form-textarea"
        />
      </div>
    </div>
  );
};
