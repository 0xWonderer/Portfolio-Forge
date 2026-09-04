import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "PortfolioForge — Developer Portfolio Generator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#05070c",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#05070c"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div style={{ fontSize: "36px", fontWeight: "800", letterSpacing: "-0.03em" }}>
            <span>Portfolio</span>
            <span style={{ color: "#34d399" }}>Forge</span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "900",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            Next-Gen Developer Portfolio Generator
          </div>
          <div style={{ fontSize: "24px", color: "#94a3b8", maxWidth: "900px", lineHeight: 1.4 }}>
            Build, preview, and export standalone static HTML, CSS & JS developer portfolios in seconds.
          </div>
        </div>

        {/* Bottom Theme Pills & Badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "#34d399",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Cyber Bento Grid
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(6, 182, 212, 0.12)",
                border: "1px solid rgba(6, 182, 212, 0.4)",
                color: "#22d3ee",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Terminal Matrix CLI
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                color: "#fbbf24",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Minimal Editorial
            </div>
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(244, 63, 94, 0.12)",
                border: "1px solid rgba(244, 63, 94, 0.4)",
                color: "#fb7185",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              Cyberpunk HUD
            </div>
          </div>

          <div style={{ fontSize: "16px", color: "#64748b", fontWeight: "600" }}>
            100% Free · 0 Runtime Dependencies
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
