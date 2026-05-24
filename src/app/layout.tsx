import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Aldo Giuliani Photography | Luxury Wedding & Reportage",
  description: "Servizi fotografici di lusso per matrimoni ed eventi. Lo stile inconfondibile di Aldo Giuliani tra reportage e alta moda.",
  keywords: "fotografo matrimoni, luxury wedding, reportage, Aldo Giuliani, fotografia di lusso",
};

import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-full">
      <head>
        {/* iubenda Privacy Controls and Cookie Solution - caricato prima di qualsiasi interazione */}
        <Script
          src="https://embeds.iubenda.com/widgets/d87794d5-2888-498a-abd6-cc2d5e8578cb.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} h-full min-h-full flex flex-col font-sans antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
