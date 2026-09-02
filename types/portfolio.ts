export type SocialPlatform =
  | "github"
  | "linkedin"
  | "twitter"
  | "email"
  | "website"
  | "youtube"
  | "discord"
  | "other";

export interface SocialLink {
  id: string;
  platform: SocialPlatform | string;
  url: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
  tags: string[];
  stars?: number;
  featured?: boolean;
}

export type PortfolioVariant = "terminal" | "bento" | "minimal" | "synthwave";

export interface ThemeConfig {
  accentColor?: "emerald" | "amber" | "cyan" | "violet" | "rose";
  scanlines?: boolean;
  terminalName?: string;
  customStatus?: string;
}

export interface PortfolioData {
  variant?: PortfolioVariant;
  name: string;
  title: string;
  bio: string;
  location?: string;
  skills: string[];
  projects: Project[];
  socials: SocialLink[];
  themeConfig?: ThemeConfig;
}
