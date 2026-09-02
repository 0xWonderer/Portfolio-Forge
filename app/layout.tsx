import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PortfolioForge | Next-Gen Developer Portfolio Generator",
  description:
    "Design and generate interactive, high-aesthetic developer portfolios live with real-time preview and export standalone static HTML/CSS/JS packages.",
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
      <body className="font-sans antialiased bg-[#07090e] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
