"use client";

import React from "react";
import { SocialLink, SocialPlatform } from "@/types/portfolio";
import { Globe, Plus, Trash2 } from "lucide-react";

interface SocialsStepProps {
  socials: SocialLink[];
  onChange: (updatedSocials: SocialLink[]) => void;
}

const PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: "github", label: "GitHub" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "email", label: "Email (mailto:)" },
  { value: "website", label: "Personal Website" },
  { value: "discord", label: "Discord" },
  { value: "youtube", label: "YouTube" },
  { value: "other", label: "Custom Link" },
];

export const SocialsStep: React.FC<SocialsStepProps> = ({ socials, onChange }) => {
  const addSocial = () => {
    const newSoc: SocialLink = {
      id: `soc-${Date.now()}`,
      platform: "github",
      url: "",
      label: "",
    };
    onChange([...socials, newSoc]);
  };

  const updateSocial = (id: string, partial: Partial<SocialLink>) => {
    onChange(socials.map((s) => (s.id === id ? { ...s, ...partial } : s)));
  };

  const removeSocial = (id: string) => {
    onChange(socials.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Social &amp; Communication Channels</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Configure how visitors, recruiters, and collaborators reach you.
          </p>
        </div>
        <button
          type="button"
          onClick={addSocial}
          className="btn-base btn-primary h-8.5 px-3 shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Channel</span>
        </button>
      </div>

      {socials.length > 0 ? (
        <div className="space-y-3 w-full min-w-0">
          {socials.map((soc, idx) => (
            <div
              key={soc.id || idx}
              className="p-3.5 sm:p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-3 transition-all focus-within:border-emerald-500/40 shadow-sm w-full min-w-0"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                    #{idx + 1}
                  </span>
                  <select
                    value={soc.platform}
                    onChange={(e) => updateSocial(soc.id, { platform: e.target.value as SocialPlatform })}
                    className="h-8 bg-zinc-900 border border-zinc-700/80 text-xs text-white rounded-lg px-2.5 outline-none focus:border-emerald-500 cursor-pointer font-medium max-w-[160px]"
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => removeSocial(soc.id)}
                  className="btn-base btn-ghost h-7 w-7 p-0 text-zinc-400 hover:text-rose-400 shrink-0"
                  title="Remove Link"
                  aria-label={`Remove ${soc.platform} channel`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full min-w-0">
                <div className="min-w-0">
                  <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                    Destination URL / Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => updateSocial(soc.id, { url: e.target.value })}
                    placeholder={
                      soc.platform === "email"
                        ? "mailto:your@email.com"
                        : "https://..."
                    }
                    className="form-input"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-[11px] text-zinc-300 font-semibold mb-1">
                    Display Label / Handle (optional)
                  </label>
                  <input
                    type="text"
                    value={soc.label || ""}
                    onChange={(e) => updateSocial(soc.id, { label: e.target.value })}
                    placeholder="e.g. @username or dev.io"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 sm:p-8 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl text-center space-y-2">
          <p className="text-xs text-zinc-400">No social channels configured.</p>
          <button
            type="button"
            onClick={addSocial}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
          >
            + Add GitHub / LinkedIn / Email
          </button>
        </div>
      )}
    </div>
  );
};
