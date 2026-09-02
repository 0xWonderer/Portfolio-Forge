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
    { id: "bento", label: "Bento", icon: LayoutGrid, color: "text-emerald-400", activeBorder: "border-emerald-500/60" },
    { id: "terminal", label: "Terminal", icon: Terminal, color: "text-green-400", activeBorder: "border-green-500/60" },
    { id: "minimal", label: "Minimal", icon: BookOpen, color: "text-amber-200", activeBorder: "border-amber-400/60" },
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

  return (
    <div className="min-h-screen flex flex-col bg-[#05070c] text-zinc-100 selection:bg-emerald-500/30 font-sans w-full max-w-[100vw] overflow-x-hidden">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-zinc-900/95 border border-emerald-500/60 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono backdrop-blur-xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Raw HTML Code Viewer Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden min-w-0">
            <div className="h-12 border-b border-zinc-800 px-4 sm:px-5 flex items-center justify-between bg-zinc-900/80 shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 truncate mr-2">
                <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold truncate">STANDALONE EXPORT: index.html</span>
                <span className="text-[10px] text-zinc-500 shrink-0">({currentVariant.toUpperCase()})</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSingleHtmlDownload}
                  className="btn-base btn-secondary h-7 sm:h-7.5 px-2.5 sm:px-3 text-xs gap-1.5"
                  title="Download as 1-file standalone HTML"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Download .HTML</span>
                  <span className="sm:hidden">.HTML</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="btn-base btn-primary h-7 sm:h-7.5 px-2.5 sm:px-3 text-xs gap-1.5"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCodeModal(false)}
                  className="btn-base btn-ghost h-7 w-7 p-0 text-zinc-400 hover:text-white"
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

      {/* Main Responsive Header (Guaranteed 0 Clipping on Mobile, Tablet & Desktop) */}
      <header className="h-13 sm:h-14 bg-zinc-950/95 border-b border-zinc-800/90 sticky top-0 z-40 backdrop-blur-2xl px-2.5 sm:px-5 flex items-center w-full min-w-0">
        <div className="w-full flex items-center justify-between gap-1.5 sm:gap-4 min-w-0">
          
          {/* Left: Brand Logo + Template Selector */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-950 font-black" />
              </div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-mono whitespace-nowrap">
                <span className="hidden xs:inline">Portfolio</span><span className="text-emerald-400">Forge</span>
              </span>
            </div>

            {/* Template Selector Pills (hidden on mobile, available inside Theme Step 1) */}
            <div className="hidden md:flex items-center bg-zinc-900/90 p-0.5 rounded-xl border border-zinc-800 gap-0.5 shrink-0">
              {templateShortcuts.map((tmpl) => {
                const Icon = tmpl.icon;
                const isSelected = currentVariant === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleUpdate({ variant: tmpl.id })}
                    className={`btn-base h-8 px-2.5 text-xs transition-all ${
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
            </div>
          </div>

          {/* Right: View Mode Toggle, Code Inspector & Guaranteed Fully Visible Export Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* View Mode Toggle: Split vs Fullscreen (Desktop/Tablet) */}
            <div className="hidden sm:flex items-center bg-zinc-900/90 p-0.5 rounded-xl border border-zinc-800 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("split")}
                className={`btn-base h-8 px-2.5 text-xs ${
                  viewMode === "split"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Split View (Editor + Preview)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Split</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === "fullscreen" ? "split" : "fullscreen")}
                className={`btn-base h-8 px-2.5 text-xs ${
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

            {/* Mobile View Switcher (Smart 1-Tap Toggle) */}
            <div className="flex sm:hidden bg-zinc-900 p-0.5 rounded-xl border border-zinc-800 text-xs shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileTab("editor");
                  setViewMode("split");
                }}
                className={`btn-base h-7 px-2 ${
                  mobileTab === "editor"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileTab("preview");
                }}
                className={`btn-base h-7 px-2 ${
                  mobileTab === "preview"
                    ? "bg-zinc-800 text-emerald-400 shadow-sm font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
            </div>

            {/* View Raw HTML Button (Desktop) */}
            <button
              type="button"
              onClick={() => setShowCodeModal(true)}
              className="btn-base btn-secondary h-8 px-2.5 text-xs hidden lg:flex shrink-0"
              title="Inspect Standalone HTML Code"
            >
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>HTML</span>
            </button>

            {/* Primary Export .ZIP Button (Guaranteed 100% Unclipped Clearance on ALL screens) */}
            <button
              type="button"
              onClick={handleFastDownload}
              disabled={isExporting}
              className="btn-base btn-primary h-7.5 sm:h-8.5 px-2.5 sm:px-3.5 text-xs font-extrabold shrink-0 shadow-md shadow-emerald-950/60"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{isExporting ? "Bundling..." : "Export .ZIP"}</span>
              <span className="xs:hidden">ZIP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace (Fully Responsive) */}
      <main className="flex-1 w-full p-2 sm:p-4 md:p-5 flex flex-col min-w-0 max-w-full">
        {viewMode === "fullscreen" ? (
          /* Full Screen Preview Mode */
          <div className="relative flex-1 w-full max-w-7xl mx-auto h-[calc(100dvh-4.5rem)] rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-zinc-950 min-w-0">
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
              className={`lg:col-span-5 min-w-0 h-[calc(100dvh-4.8rem)] lg:h-[calc(100vh-5.8rem)] min-h-[480px] sm:min-h-[580px] ${
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
              className={`lg:col-span-7 min-w-0 h-[calc(100dvh-4.8rem)] lg:h-[calc(100vh-5.8rem)] min-h-[480px] sm:min-h-[580px] ${
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
    </div>
  );
}
