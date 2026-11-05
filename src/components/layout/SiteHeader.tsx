"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { PrimaryButton } from "../common/PrimaryButton";
import { MobileNavigation } from "./MobileNavigation";
import { BrandLogo } from "../common/BrandLogo";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm">
      {/* Top Banner with locations and quick contacts */}
      <div className="bg-brand-forest text-white/90 text-xs py-2 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Head Office: Canada &bull; Branches: Ghana (Est. 2022)</span>
            </span>
            <span className="text-white/40">|</span>
            <span className="italic text-white/80 font-serif">
              &ldquo;{siteConfig.motto}&rdquo;
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {siteConfig.contact.whatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <BrandLogo variant="header" href="/" />

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {siteConfig.navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-growth ${
                    isActive
                      ? "text-brand-growth font-semibold bg-brand-growth-soft"
                      : "text-brand-forest hover:text-brand-growth hover:bg-brand-ivory"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action & Mobile Menu */}
          <div className="flex items-center gap-3">
            <PrimaryButton
              href="/donate"
              variant="growth"
              size="md"
              className="hidden sm:inline-flex"
            >
              <Heart className="w-4 h-4 fill-current" />
              Donate
            </PrimaryButton>

            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
