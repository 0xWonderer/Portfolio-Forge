import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://portfolio-forge.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070c",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PortfolioForge — Free Developer Portfolio Generator",
    template: "%s | PortfolioForge",
  },
  description:
    "Build and export interactive, high-aesthetic developer portfolios live. Standalone static HTML, CSS, and JS packages with zero runtime dependencies.",
  applicationName: "PortfolioForge",
  authors: [{ name: "PortfolioForge Engineering", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    "developer portfolio generator",
    "software engineer portfolio maker",
    "free developer portfolio builder",
    "bento grid portfolio template",
    "terminal matrix portfolio generator",
    "interactive cli portfolio",
    "minimalist developer resume template",
    "cyberpunk hud developer portfolio",
    "static html css js portfolio export",
    "github pages portfolio builder",
    "portfolioforge",
  ],
  referrer: "origin-when-cross-origin",
  creator: "PortfolioForge",
  publisher: "PortfolioForge",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "PortfolioForge — Developer Portfolio Generator",
    description:
      "Build and export interactive, standalone developer portfolios in Bento, Terminal, and Minimal themes in seconds.",
    siteName: "PortfolioForge",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PortfolioForge — Developer Portfolio Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PortfolioForge — Developer Portfolio Generator",
    description:
      "Build and export interactive, standalone developer portfolios in Bento, Terminal, and Minimal themes in seconds.",
    creator: "@portfolioforge",
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon" },
    ],
    apple: "/apple-icon",
  },
  category: "technology",
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#webapp`,
      "name": "PortfolioForge",
      "url": siteUrl,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description":
        "Next-generation live developer portfolio generator with real-time multi-theme preview and standalone static HTML/CSS/JS export capabilities.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
      },
      "featureList": [
        "Hyper Bento Grid Live Engine with Telemetry Cards",
        "Interactive Terminal CLI with Real Bash Engine & Typewriter Animations",
        "Minimal Architectural Editorial Theme with Swiss Typography",
        "Cyberpunk HUD 2099 Theme with Audio Equalizer & 3D Horizon Grid",
        "1-Click Standalone Single-File HTML Export",
        "Production-Grade Zero-Dependency ZIP Package Export",
        "100% Mobile Responsive Multi-Device Previews",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I create a developer portfolio with PortfolioForge?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Simply enter your profile details, engineering skills, featured projects, and social endpoints in the interactive editor pane. Choose your preferred design theme (Bento, Terminal, Minimal, or Cyberpunk), customize the accent colors, preview changes live, and click Export ZIP or Download HTML.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I host the exported portfolio on GitHub Pages, Vercel, or Netlify?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes! PortfolioForge generates pure standalone static HTML, CSS, and JavaScript files with zero backend dependencies. You can upload the files directly to GitHub Pages, Cloudflare Pages, Vercel, Netlify, AWS S3, or any standard web server.",
          },
        },
        {
          "@type": "Question",
          "name": "Is PortfolioForge free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, PortfolioForge is completely free to use with no account registration or subscriptions required. You have full ownership of your exported portfolio code.",
          },
        },
        {
          "@type": "Question",
          "name": "Is the generated portfolio mobile-responsive and SEO-friendly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "All templates generated by PortfolioForge are built with mobile-first responsive architecture, fluid typography, WCAG-compliant touch targets, Open Graph meta tags, and Schema.org structured data to ensure high search engine rankings.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${spaceGrotesk.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#05070c] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 min-h-screen w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
