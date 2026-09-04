"use client";

import React, { useState, useEffect } from "react";
import { PortfolioData, PortfolioVariant } from "@/types/portfolio";
import { samplePortfolioData, emptyPortfolioData } from "@/lib/sample-data";
import { PortfolioForm } from "@/components/form/PortfolioForm";
import { VariantRenderer } from "@/components/variants/VariantRenderer";
import { downloadPortfolioZip, downloadSingleFileHtml } from "@/lib/export/zipBundle";
import { generateTerminalHtml } from "@/lib/export/generateTerminalHtml";
import { generateBentoHtml } from "@/lib/export/generateBentoHtml";
import { generateMinimalHtml } from "@/lib/export/generateMinimalHtml";
import { generateSynthwaveHtml } from "@/lib/export/generateSynthwaveHtml";
import confetti from "canvas-confetti";
import {
  Terminal,
  Download,
  Sparkles,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  LayoutGrid,
  BookOpen,
  Zap,
  Maximize2,
  Minimize2,
  Columns,
  Code2,
  Copy,
  Check,
  X,
  FileCode2,
  ChevronDown,
  Globe,
  ShieldCheck,
  Cpu,
  Layers,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [data, setData] = useState<PortfolioData>({
    ...samplePortfolioData,
    variant: "bento",
  });
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");
  const [viewMode, setViewMode] = useState<"split" | "fullscreen">("split");
  const [isExporting, setIsExporting] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleUpdate = (updated: Partial<PortfolioData>) => {
    setData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleLoadSample = () => {
    setData((prev) => ({
      ...samplePortfolioData,
      variant: prev.variant || "bento",
    }));
    displayToast("Loaded sample developer portfolio!");
  };

  const handleResetBlank = () => {
    setData((prev) => ({
      ...emptyPortfolioData,
      variant: prev.variant || "bento",
    }));
    displayToast("Cleared all portfolio fields.");
  };

  const displayToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 3000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#10b981", "#06b6d4", "#f59e0b", "#c084fc", "#f43f5e"],
      });
    } catch {
      // fallback
    }
  };

  const handleFastDownload = async () => {
    if (!data.name || !data.title) {
      displayToast("Please fill in at least Name and Title to export!");
      return;
    }
    try {
      setIsExporting(true);
      await downloadPortfolioZip(data);
      triggerConfetti();
      displayToast(`Downloaded ${data.variant?.toUpperCase() || "PORTFOLIO"} bundle (.zip)!`);
    } catch (e) {
      console.error(e);
      displayToast("Export failed. Check console for details.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleSingleHtmlDownload = () => {
    if (!data.name || !data.title) {
      displayToast("Please fill in at least Name and Title to export!");
      return;
    }
    downloadSingleFileHtml(data);
    triggerConfetti();
    displayToast("Downloaded standalone single-file HTML!");
  };

  const getActiveHtmlCode = () => {
    switch (data.variant) {
      case "terminal":
        return generateTerminalHtml(data);
      case "minimal":
        return generateMinimalHtml(data);
      case "synthwave":
        return generateSynthwaveHtml(data);
      case "bento":
      default:
        return generateBentoHtml(data);
    }
  };

  const handleCopyCode = () => {
    const code = getActiveHtmlCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    displayToast("Copied standalone HTML to clipboard!");
  };

  const templateShortcuts: {
    id: PortfolioVariant;
    label: string;
    icon: React.ElementType;
    color: string;
    activeBorder: string;
  }[] = [
    { id: "bento", label: "Bento", icon: LayoutGrid, color: "text-cyan-400", activeBorder: "border-cyan-500/60" },
    { id: "terminal", label: "Terminal", icon: Terminal, color: "text-emerald-400", activeBorder: "border-emerald-500/60" },
    { id: "minimal", label: "Minimal", icon: BookOpen, color: "text-amber-300", activeBorder: "border-amber-400/60" },
    { id: "synthwave", label: "Cyber", icon: Zap, color: "text-pink-400", activeBorder: "border-pink-500/60" },
  ];

  const currentVariant = data.variant || "bento";

  // Handle ESC key to exit fullscreen or close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showCodeModal) {
          setShowCodeModal(false);
        } else if (viewMode === "fullscreen") {
          setViewMode("split");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, showCodeModal]);

  const faqs = [
    {
      q: "How do I deploy my exported portfolio to GitHub Pages?",
      a: "1. Create a GitHub repository named <your-username>.github.io.\n2. Extract the downloaded PortfolioForge ZIP bundle containing index.html, style.css, and script.js.\n3. Commit and push the files directly to your repository's main branch.\n4. In GitHub Settings > Pages, set the source to Deploy from branch (main / root). Your portfolio will be live in under 60 seconds at https://<your-username>.github.io!",
    },
    {
      q: "Can I deploy this to Vercel, Netlify, or Cloudflare Pages?",
      a: "Yes! Because PortfolioForge outputs pure static HTML, CSS, and Vanilla JavaScript with 0 backend dependencies, you can drag and drop the unzipped folder straight into Vercel or Netlify Drop, or push to GitHub and connect with 1 click. No build commands or node dependencies required!",
    },
    {
      q: "How does PortfolioForge optimize developer portfolios for search engines (SEO)?",
      a: "Every exported portfolio package comes pre-injected with Open Graph meta tags, Twitter card tags, mobile-responsive viewport directives, semantic HTML5 tags (h1, h2, article, nav, header), and Schema.org Person & ProfilePage JSON-LD structured data. This helps Google, Bing, and social platforms properly index your name, job title, and competencies on the first page.",
    },
    {
      q: "Is PortfolioForge free and open source?",
      a: "Yes, PortfolioForge is completely free. You have 100% unrestricted ownership of the exported code to modify, self-host, or integrate into your custom domain without watermarks or vendor lock-in.",
    },
    {
      q: "Which portfolio theme is best for my background?",
      a: "• Hyper Bento: Ideal for Full Stack Engineers, UI/UX Technologists, and Frontend Devs wanting sleek metrics and telemetry.\n• Terminal Matrix: Perfect for Systems, DevOps, Backend, Cloud, and Security Engineers who love interactive Unix CLI experiences.\n• Minimal Editorial: Tailored for Software Architects, Tech Leads, and Engineering Managers seeking refined typography.\n• Cyberpunk HUD: Built for Game Developers, Creative Coders, and Web3 Builders desiring high-voltage neon aesthetics.",
    },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#05070c] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans w-full max-w-[100vw] overflow-x-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-zinc-900/95 border border-emerald-500/60 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono backdrop-blur-xl animate-bounce max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{showToast}</span>
        </div>
      )}

      {/* Raw HTML Code Viewer Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 w-full max-w-[100vw]">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden min-w-0">
            <div className="h-12 border-b border-zinc-800 px-3 sm:px-5 flex items-center justify-between bg-zinc-900/80 shrink-0 gap-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 truncate min-w-0">
                <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold truncate">STANDALONE EXPORT: index.html</span>
                <span className="text-[10px] text-zinc-500 shrink-0 hidden xs:inline">({currentVariant.toUpperCase()})</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSingleHtmlDownload}
                  className="btn-base btn-secondary h-7 sm:h-8 px-2.5 sm:px-3 text-xs gap-1.5"
                  title="Download as 1-file standalone HTML"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Download .HTML</span>
                  <span className="sm:hidden">.HTML</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="btn-base btn-primary h-7 sm:h-8 px-2.5 sm:px-3 text-xs gap-1.5"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCodeModal(false)}
                  className="btn-base btn-ghost h-7 w-7 p-0 text-zinc-400 hover:text-white"
                  aria-label="Close code modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-3 sm:p-4 bg-[#080b12] custom-scrollbar">
              <pre className="text-xs font-mono text-emerald-300/90 leading-relaxed select-all whitespace-pre-wrap break-all">
                <code>{getActiveHtmlCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Main Responsive Header (Guaranteed 0 Clipping across all device widths) */}
      <header className="h-13 sm:h-14 bg-zinc-950/95 border-b border-zinc-800/90 sticky top-0 z-40 backdrop-blur-2xl px-2 sm:px-4 flex items-center w-full min-w-0">
        <div className="w-full flex items-center justify-between gap-1 sm:gap-3 min-w-0">
          
          {/* Left: Brand Logo */}
          <a href="/" className="flex items-center gap-1.5 shrink-0" aria-label="PortfolioForge Home">
            <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-950 font-black" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white font-mono whitespace-nowrap">
              <span className="hidden sm:inline">Portfolio</span><span className="text-emerald-400">Forge</span>
            </span>
          </a>

          {/* Center / Middle on Mobile: Segmented 1-Tap Toggle */}
          <div className="flex sm:hidden bg-zinc-900/90 p-0.5 rounded-xl border border-zinc-800 shrink-0">
            <button
              type="button"
              onClick={() => {
                setMobileTab("editor");
                setViewMode("split");
              }}
              className={`btn-base h-7 px-2 text-[11px] min-h-0 ${
                mobileTab === "editor"
                  ? "bg-zinc-800 text-emerald-400 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 shrink-0" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileTab("preview");
              }}
              className={`btn-base h-7 px-2 text-[11px] min-h-0 ${
                mobileTab === "preview"
                  ? "bg-zinc-800 text-emerald-400 shadow-sm font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3 shrink-0" />
              <span>Preview</span>
            </button>
          </div>

          {/* Template Selector Pills (Desktop/Tablet >= 768px) */}
          <nav className="hidden md:flex items-center bg-zinc-900/90 p-0.5 rounded-xl border border-zinc-800 gap-0.5 shrink-0" aria-label="Template selector">
            {templateShortcuts.map((tmpl) => {
              const Icon = tmpl.icon;
              const isSelected = currentVariant === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleUpdate({ variant: tmpl.id })}
                  className={`btn-base h-7.5 px-2.5 text-xs transition-all ${
                    isSelected
                      ? `bg-zinc-800 text-white shadow-sm border ${tmpl.activeBorder} font-bold`
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${tmpl.color}`} />
                  <span>{tmpl.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* View Mode Toggle: Split vs Fullscreen (Desktop/Tablet) */}
            <div className="hidden sm:flex items-center bg-zinc-900/90 p-0.5 rounded-xl border border-zinc-800 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`btn-base h-7.5 px-2 text-xs ${
                  viewMode === "split"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Split View (Editor + Live Preview)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "fullscreen" ? "split" : "fullscreen")}
                className={`btn-base h-7.5 px-2 text-xs ${
                  viewMode === "fullscreen"
                    ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)] font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Toggle Full Screen Live Preview"
              >
                {viewMode === "fullscreen" ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Exit Full</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Full Screen</span>
                  </>
                )}
              </button>
            </div>

            {/* View Raw HTML Button (Icon on mobile, Icon+text on tablet/desktop) */}
            <button
              type="button"
              onClick={() => setShowCodeModal(true)}
              className="btn-base btn-secondary h-7.5 w-7.5 p-0 sm:w-auto sm:px-2.5 text-xs shrink-0"
              title="Inspect Standalone HTML Code"
              aria-label="Inspect Standalone HTML Code"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden sm:inline">HTML</span>
            </button>

            {/* Primary Export .ZIP Button (Guaranteed 100% visible and unclipped) */}
            <button
              type="button"
              onClick={handleFastDownload}
              disabled={isExporting}
              className="btn-base btn-primary h-7.5 px-2.5 sm:px-3.5 text-xs font-extrabold shrink-0 shadow-md shadow-emerald-950/60"
              title="Export static ZIP package"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span>{isExporting ? "..." : "ZIP"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace (100% Fluid & Mobile-Responsive) */}
      <main className="flex-1 w-full p-2 sm:p-4 md:p-5 flex flex-col min-w-0 max-w-full">
        {viewMode === "fullscreen" ? (
          /* Full Screen Preview Mode */
          <div className="relative flex-1 w-full max-w-7xl mx-auto h-[calc(100dvh-4.8rem)] rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-zinc-950 min-w-0">
            <VariantRenderer
              data={data}
              isFullscreen={true}
              onToggleFullscreen={() => setViewMode("split")}
            />
          </div>
        ) : (
          /* Split View / Mobile Tab View */
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5 flex-1 items-start min-w-0">
            
            {/* Left: Multi-Step Editor Form Pane */}
            <section
              className={`lg:col-span-5 min-w-0 h-[calc(100dvh-5rem)] lg:h-[calc(100vh-5.8rem)] min-h-[480px] sm:min-h-[580px] ${
                mobileTab === "editor" ? "block" : "hidden lg:block"
              }`}
            >
              <PortfolioForm
                data={data}
                onChange={handleUpdate}
                onLoadSample={handleLoadSample}
                onResetBlank={handleResetBlank}
              />
            </section>

            {/* Right: Live Interactive Multi-Variant Preview Pane */}
            <section
              className={`lg:col-span-7 min-w-0 h-[calc(100dvh-5rem)] lg:h-[calc(100vh-5.8rem)] min-h-[480px] sm:min-h-[580px] ${
                mobileTab === "preview" ? "block" : "hidden lg:block"
              }`}
            >
              <VariantRenderer
                data={data}
                isFullscreen={false}
                onToggleFullscreen={() => setViewMode("fullscreen")}
              />
            </section>

          </div>
        )}
      </main>

      {/* SEO Developer Guide, Engine Overview & Comprehensive FAQ Section */}
      <section className="w-full bg-zinc-950/80 border-t border-zinc-900 mt-8 py-12 px-4 sm:px-6 lg:px-8" id="guide">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NEXT-GEN STATIC PORTFOLIO SUITE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Crafted for High-Impact Software Engineers &amp; Developers
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Generate lightning-fast, standalone developer portfolios optimized for search engines, hiring managers, and seamless deployment on GitHub Pages or custom domains.
            </p>
          </div>

          {/* 4 Engine Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-cyan-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Hyper Bento Grid</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Linear &amp; Raycast aesthetic with interactive telemetry cards, glowing border spotlights, and responsive multi-column layouts.
              </p>
            </article>

            <article className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Terminal Matrix CLI</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Authentic Unix terminal with interactive bash engine, typewriter animations, CRT phosphor scanlines, and diagnostic commands.
              </p>
            </article>

            <article className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-400/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Minimal Editorial</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Swiss architectural typography with dramatic serif headlines, refined line items, generous whitespace, and high readability.
              </p>
            </article>

            <article className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-pink-500/50 transition-all space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Cyberpunk HUD 2099</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                80s Outrun perspective grid with audio equalizers, neon magenta &amp; cyan glowing cyber cards, and telemetry status widgets.
              </p>
            </article>
          </div>

          {/* Key Advantages / Technical Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-900">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-850">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Zero Runtime Dependencies</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Exported packages are 100% standalone static HTML, CSS, and JS. No Node.js runtime or backend databases required.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-850">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">100/100 Lighthouse Performance</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Ultra lightweight footprint ensures instant 0ms TTFB page loads, passing all Google Core Web Vitals metrics.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-zinc-850">
              <Globe className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">First-Page SEO Architecture</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pre-configured with Open Graph metadata, Twitter cards, semantic landmarks, and Schema.org Person JSON-LD markup.
                </p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions (FAQ) with Accordion */}
          <div className="space-y-4 pt-6 border-t border-zinc-900" id="faq">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-zinc-850 rounded-xl overflow-hidden bg-zinc-900/50 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-zinc-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-emerald-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-400 leading-relaxed whitespace-pre-line border-t border-zinc-850/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Semantic Footer */}
      <footer className="w-full border-t border-zinc-900 bg-[#04060a] py-6 px-4 sm:px-6 text-center text-xs text-zinc-400 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-bold">PortfolioForge</span>
            <span className="text-zinc-400">— Developer Portfolio Generator</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <a href="#guide" className="hover:text-emerald-400 transition-colors">Guide</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
            <span>Static HTML/CSS/JS Engine</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
