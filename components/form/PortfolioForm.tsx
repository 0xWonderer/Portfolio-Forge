"use client";

import React, { useState } from "react";
import { PortfolioData, PortfolioVariant } from "@/types/portfolio";
import { BasicInfoStep } from "./BasicInfoStep";
import { SkillsStep } from "./SkillsStep";
import { ProjectsStep } from "./ProjectsStep";
import { SocialsStep } from "./SocialsStep";
import { ExportStep } from "./ExportStep";
import { TemplateStep } from "./TemplateStep";
import {
  User,
  Cpu,
  FolderGit2,
  Globe,
  Download,
  LayoutTemplate,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface PortfolioFormProps {
  data: PortfolioData;
  onChange: (data: Partial<PortfolioData>) => void;
  onLoadSample: () => void;
  onResetBlank: () => void;
}

export const PortfolioForm: React.FC<PortfolioFormProps> = ({
  data,
  onChange,
  onLoadSample,
  onResetBlank,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: "template", label: "Theme", icon: LayoutTemplate, count: "" },
    { id: "basic", label: "Profile", icon: User, count: data.name ? "✓" : "" },
    { id: "skills", label: "Skills", icon: Cpu, count: data.skills.length > 0 ? String(data.skills.length) : "" },
    { id: "projects", label: "Projects", icon: FolderGit2, count: data.projects.length > 0 ? String(data.projects.length) : "" },
    { id: "socials", label: "Socials", icon: Globe, count: data.socials.length > 0 ? String(data.socials.length) : "" },
    { id: "export", label: "Export", icon: Download, count: "" },
  ];

  const handleUpdateTheme = (accent: "emerald" | "cyan" | "amber" | "violet" | "rose") => {
    onChange({
      themeConfig: {
        ...data.themeConfig,
        accentColor: accent,
      },
    });
  };

  const handleVariantChange = (variant: PortfolioVariant) => {
    onChange({ variant });
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900/70 rounded-2xl border border-zinc-800/90 overflow-hidden shadow-2xl backdrop-blur-xl min-w-0">
      {/* Top Expanding Accordion Tab Bar with Smooth Mobile Overflow & Touch Snapping */}
      <div className="bg-zinc-950/90 border-b border-zinc-800/90 p-2 sm:p-3 shrink-0">
        <div className="flex items-center gap-1 sm:gap-1.5 w-full overflow-x-auto custom-scrollbar pb-1 snap-x-mandatory">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl transition-all duration-200 cursor-pointer snap-start shrink-0 min-h-[36px] ${
                  isActive
                    ? "flex-1 min-w-[85px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)] font-bold text-xs"
                    : isCompleted
                    ? "bg-zinc-900/80 text-zinc-300 hover:bg-zinc-900 border border-zinc-800 hover:text-white text-xs"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent text-xs"
                }`}
                title={step.label}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? "text-emerald-400" : ""}`} />
                
                {/* Full label and badge shown on active tab */}
                {isActive ? (
                  <div className="flex items-center gap-1 whitespace-nowrap text-[11px] sm:text-xs">
                    <span>{step.label}</span>
                    {step.count !== "" && (
                      <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full font-mono font-bold bg-emerald-500/30 text-emerald-200 leading-none">
                        {step.count}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[11px] sm:text-xs whitespace-nowrap">{step.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Linear progress indicator */}
        <div className="w-full bg-zinc-900 h-1 mt-1.5 sm:mt-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 custom-scrollbar min-w-0">
        {activeStep === 0 && (
          <TemplateStep
            currentVariant={data.variant || "bento"}
            onChangeVariant={handleVariantChange}
          />
        )}
        {activeStep === 1 && <BasicInfoStep data={data} onChange={onChange} />}
        {activeStep === 2 && (
          <SkillsStep
            skills={data.skills}
            onChange={(updatedSkills) => onChange({ skills: updatedSkills })}
          />
        )}
        {activeStep === 3 && (
          <ProjectsStep
            projects={data.projects}
            onChange={(updatedProjects) => onChange({ projects: updatedProjects })}
          />
        )}
        {activeStep === 4 && (
          <SocialsStep
            socials={data.socials}
            onChange={(updatedSocials) => onChange({ socials: updatedSocials })}
          />
        )}
        {activeStep === 5 && (
          <ExportStep
            data={data}
            onLoadSample={onLoadSample}
            onResetBlank={onResetBlank}
            onUpdateTheme={handleUpdateTheme}
          />
        )}
      </div>

      {/* Step Navigation Bottom Bar */}
      <div className="bg-zinc-950/95 border-t border-zinc-800/90 p-2.5 sm:p-4 flex items-center justify-between gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer min-h-[38px] ${
            activeStep === 0
              ? "opacity-30 border-transparent text-zinc-600 cursor-not-allowed"
              : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 shadow-sm active:scale-95"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Back</span>
        </button>

        <div className="text-[11px] sm:text-xs text-zinc-400 font-mono font-medium">
          Step {activeStep + 1} of {steps.length}
        </div>

        {activeStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-md shadow-emerald-950/60 active:scale-95 min-h-[38px]"
          >
            <span>Continue</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveStep(0)}
            className="flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer min-h-[38px] active:scale-95"
          >
            <span>Restart</span>
          </button>
        )}
      </div>
    </div>
  );
};
