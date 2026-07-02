import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";

import "./globals.css";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { localBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | 24/7 HVAC Repair in Delray Beach, FL`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Iris Cooling LLC",
    "HVAC Delray Beach",
    "AC repair Palm Beach County",
    "emergency HVAC Delray Beach",
    "AC installation Boca Raton",
    "24 hour HVAC Florida",
  ],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
        <StickyMobileBar />
      </body>
    </html>
  );
}
