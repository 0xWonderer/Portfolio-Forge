"use client";

import React, { useState } from "react";
import { Project } from "@/types/portfolio";
import { FolderGit2, Plus, Trash2, ExternalLink, Tag } from "lucide-react";

interface ProjectsStepProps {
  projects: Project[];
  onChange: (updatedProjects: Project[]) => void;
}

export const ProjectsStep: React.FC<ProjectsStepProps> = ({ projects, onChange }) => {
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "",
      description: "",
      link: "",
      tags: [],
    };
    onChange([...projects, newProj]);
  };

  const updateProject = (id: string, partial: Partial<Project>) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, ...partial } : p))
    );
  };

  const removeProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id));
  };

  const addTagToProject = (id: string, tag: string) => {
    const trimmed = tag.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmed) return;
    const target = projects.find((p) => p.id === id);
    if (target && !target.tags.includes(trimmed)) {
      updateProject(id, { tags: [...target.tags, trimmed] });
    }
    setTagInputs((prev) => ({ ...prev, [id]: "" }));
  };

  const removeTagFromProject = (id: string, tagToRemove: string) => {
    const target = projects.find((p) => p.id === id);
    if (target) {
      updateProject(id, { tags: target.tags.filter((t) => t !== tagToRemove) });
    }
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-800/80">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>Featured Projects</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Showcase your best software engineering repositories and systems.
          </p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="btn-base btn-primary h-8.5 px-3"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="space-y-3.5">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-xl space-y-3 relative group transition-all focus-within:border-emerald-500/40 shadow-sm"
            >
              <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Project #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(proj.id)}
                  className="btn-base btn-ghost h-7 w-7 p-0 text-zinc-400 hover:text-rose-400"
                  title="Remove Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1">
                    Project Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                    placeholder="e.g. Distributed Task Engine"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1 flex items-center gap-1">
                    <span>Repository / Live URL</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </label>
                  <input
                    type="url"
                    value={proj.link || ""}
                    onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                    placeholder="https://github.com/..."
                    className="form-input"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs text-zinc-300 font-semibold mb-1">
                  Description / Technical Highlights
                </label>
                <textarea
                  rows={3}
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  placeholder="Architectural overview, key technologies, latency benchmarks, or problem solved..."
                  className="form-textarea"
                />
              </div>

              {/* Tags / Tech Flags */}
              <div>
                <label className="block text-xs text-zinc-300 font-semibold mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-cyan-400" />
                  <span>Tech Flags (--tag:name)</span>
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInputs[proj.id] || ""}
                    onChange={(e) =>
                      setTagInputs((prev) => ({ ...prev, [proj.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTagToProject(proj.id, tagInputs[proj.id] || "");
                      }
                    }}
                    placeholder="Add tag (e.g. rust, redis, grpc) & press Enter"
                    className="form-input flex-1 h-8"
                  />
                  <button
                    type="button"
                    onClick={() => addTagToProject(proj.id, tagInputs[proj.id] || "")}
                    className="btn-base btn-secondary h-8 px-3 text-xs"
                  >
                    + Tag
                  </button>
                </div>

                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-md flex items-center gap-1.5"
                      >
                        <span>--tag:{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTagFromProject(proj.id, tag)}
                          className="text-cyan-400 hover:text-rose-400 cursor-pointer font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 bg-zinc-950/40 border border-dashed border-zinc-800 rounded-xl text-center space-y-2">
          <p className="text-xs text-zinc-400">No projects added yet.</p>
          <button
            type="button"
            onClick={addProject}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
          >
            + Create your first project entry
          </button>
        </div>
      )}
    </div>
  );
};
