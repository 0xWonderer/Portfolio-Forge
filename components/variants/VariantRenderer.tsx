"use client";

import React from "react";
import { PortfolioData } from "@/types/portfolio";
import { TerminalPreview } from "./terminal/TerminalPreview";
import { BentoPreview } from "./bento/BentoPreview";
import { MinimalPreview } from "./minimal/MinimalPreview";
import { SynthwavePreview } from "./synthwave/SynthwavePreview";

interface VariantRendererProps {
  data: PortfolioData;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const VariantRenderer: React.FC<VariantRendererProps> = ({
  data,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const variant = data.variant || "bento";

  switch (variant) {
    case "terminal":
      return (
        <TerminalPreview
          data={data}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      );
    case "minimal":
      return (
        <MinimalPreview
          data={data}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      );
    case "synthwave":
      return (
        <SynthwavePreview
          data={data}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      );
    case "bento":
    default:
      return (
        <BentoPreview
          data={data}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      );
  }
};
