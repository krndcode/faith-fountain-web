import type { Metadata } from "next";
import { Lora, Lato } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: `${siteConfig.name} | ${siteConfig.motto}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Faith Fountain Foundation",
    "Christian nonprofit",
    "charity Canada",
    "charity Ghana",
    "education support",
    "orphanage support",
    "hospital bill assistance",
    "Gospel outreach",
  ],
  authors: [{ name: "Faith Fountain Foundation" }],
  creator: "Faith Fountain Foundation",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.motto}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-community.svg",
        width: 1200,
        height: 700,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.motto}`,
    description: siteConfig.description,
    images: ["/images/hero-community.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-brand-charcoal antialiased selection:bg-brand-growth selection:text-white">
        {children}
      </body>
    </html>
  );
}
