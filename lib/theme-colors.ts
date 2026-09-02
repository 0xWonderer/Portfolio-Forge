export type AccentColor = "emerald" | "cyan" | "amber" | "violet" | "rose";

export interface ColorThemeClasses {
  name: string;
  hex: string;
  text: string;
  textHover: string;
  bg: string;
  bgHover: string;
  bgSoft: string;
  badge: string;
  border: string;
  borderHover: string;
  glow: string;
  gradientText: string;
  gradientBg: string;
}

export const COLOR_THEMES: Record<AccentColor, ColorThemeClasses> = {
  emerald: {
    name: "Emerald Matrix",
    hex: "#10b981",
    text: "text-emerald-400",
    textHover: "hover:text-emerald-300",
    bg: "bg-emerald-500",
    bgHover: "hover:bg-emerald-400",
    bgSoft: "bg-emerald-500/10",
    badge: "bg-emerald-950/70 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/40",
    borderHover: "hover:border-emerald-500/60",
    glow: "rgba(16, 185, 129, 0.35)",
    gradientText: "from-emerald-400 via-teal-300 to-cyan-400",
    gradientBg: "from-emerald-600 to-teal-600",
  },
  cyan: {
    name: "Cyan Electric",
    hex: "#06b6d4",
    text: "text-cyan-400",
    textHover: "hover:text-cyan-300",
    bg: "bg-cyan-500",
    bgHover: "hover:bg-cyan-400",
    bgSoft: "bg-cyan-500/10",
    badge: "bg-cyan-950/70 text-cyan-300 border-cyan-500/30",
    border: "border-cyan-500/40",
    borderHover: "hover:border-cyan-500/60",
    glow: "rgba(6, 182, 212, 0.35)",
    gradientText: "from-cyan-400 via-sky-300 to-blue-400",
    gradientBg: "from-cyan-600 to-blue-600",
  },
  amber: {
    name: "Amber Solar",
    hex: "#f59e0b",
    text: "text-amber-400",
    textHover: "hover:text-amber-300",
    bg: "bg-amber-500",
    bgHover: "hover:bg-amber-400",
    bgSoft: "bg-amber-500/10",
    badge: "bg-amber-950/70 text-amber-300 border-amber-500/30",
    border: "border-amber-500/40",
    borderHover: "hover:border-amber-500/60",
    glow: "rgba(245, 158, 11, 0.35)",
    gradientText: "from-amber-400 via-orange-300 to-yellow-400",
    gradientBg: "from-amber-600 to-orange-600",
  },
  violet: {
    name: "Violet Nebula",
    hex: "#8b5cf6",
    text: "text-violet-400",
    textHover: "hover:text-violet-300",
    bg: "bg-violet-500",
    bgHover: "hover:bg-violet-400",
    bgSoft: "bg-violet-500/10",
    badge: "bg-violet-950/70 text-violet-300 border-violet-500/30",
    border: "border-violet-500/40",
    borderHover: "hover:border-violet-500/60",
    glow: "rgba(139, 92, 246, 0.35)",
    gradientText: "from-violet-400 via-purple-300 to-fuchsia-400",
    gradientBg: "from-violet-600 to-purple-600",
  },
  rose: {
    name: "Rose Synth",
    hex: "#f43f5e",
    text: "text-rose-400",
    textHover: "hover:text-rose-300",
    bg: "bg-rose-500",
    bgHover: "hover:bg-rose-400",
    bgSoft: "bg-rose-500/10",
    badge: "bg-rose-950/70 text-rose-300 border-rose-500/30",
    border: "border-rose-500/40",
    borderHover: "hover:border-rose-500/60",
    glow: "rgba(244, 63, 94, 0.35)",
    gradientText: "from-rose-400 via-pink-300 to-amber-400",
    gradientBg: "from-rose-600 to-pink-600",
  },
};

export function getThemeClasses(accent?: string): ColorThemeClasses {
  if (accent && accent in COLOR_THEMES) {
    return COLOR_THEMES[accent as AccentColor];
  }
  return COLOR_THEMES.emerald;
}
