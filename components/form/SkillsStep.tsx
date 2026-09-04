"use client";

import React, { useState } from "react";
import { Cpu, Plus, X, Sparkles } from "lucide-react";

interface SkillsStepProps {
  skills: string[];
  onChange: (updatedSkills: string[]) => void;
}

const COMMON_SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Rust",
  "Go",
  "Python",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "Tailwind CSS",
  "GraphQL",
  "AWS",
  "Linux",
  "Git",
];

export const SkillsStep: React.FC<SkillsStepProps> = ({ skills, onChange }) => {
  const [inputVal, setInputVal] = useState("");

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    if (!skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInputVal("");
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputVal);
    }
  };

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Skills &amp; Technologies</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Add languages, frameworks, cloud platforms, and developer tooling.
          </p>
        </div>
      </div>

      {/* Input box */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full min-w-0">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill & press Enter (e.g. Rust, Go, Next.js)..."
          className="form-input flex-1 min-w-0"
        />
        <button
          type="button"
          onClick={() => addSkill(inputVal)}
          className="btn-base btn-primary h-9 px-4 shrink-0 shadow-sm text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Current skills list */}
      <div className="w-full min-w-0">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-zinc-300">
            Active Competencies
          </label>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-850 px-2 py-0.5 rounded-full border border-zinc-800">
            {skills.length} skills
          </span>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl min-h-16 w-full min-w-0">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-zinc-850 text-zinc-200 border border-zinc-700/80 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors group shadow-sm max-w-full"
              >
                <span className="font-medium truncate">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                  aria-label={`Remove skill ${skill}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-zinc-950/30 border border-dashed border-zinc-800 rounded-xl text-center text-xs text-zinc-400">
            No skills added yet. Type above or click suggestions below.
          </div>
        )}
      </div>

      {/* Quick suggestions */}
      <div className="w-full min-w-0">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Add Suggestions:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SKILLS.filter((s) => !skills.includes(s)).map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => addSkill(skill)}
              className="btn-base btn-secondary h-7.5 px-2.5 text-[11px]"
            >
              <span className="text-emerald-400 font-bold">+</span>
              <span>{skill}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
