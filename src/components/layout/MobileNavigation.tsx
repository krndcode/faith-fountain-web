"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { PrimaryButton } from "../common/PrimaryButton";
import { Menu, X, Heart, Mail, Phone } from "lucide-react";
import Image from "next/image";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile navigation upon route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-brand-forest hover:bg-brand-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-growth transition-colors"
        aria-label={isOpen ? "Close main menu" : "Open main menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-forest/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-elevated transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-brand-border flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/images/logo.svg"
              alt="Faith Fountain Foundation"
              width={180}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-brand-charcoal hover:bg-brand-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-growth"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {siteConfig.navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-brand-growth-soft text-brand-forest font-semibold border-l-4 border-brand-growth"
                    : "text-brand-charcoal hover:bg-brand-ivory hover:text-brand-forest"
                }`}
              >
                {item.title}
              </Link>
            );
          })}

          <div className="pt-6">
            <PrimaryButton
              href="/donate"
              variant="growth"
              size="lg"
              className="w-full justify-center"
            >
              <Heart className="w-5 h-5 fill-current" />
              Donate Now
            </PrimaryButton>
          </div>
        </nav>

        {/* Footer Contact Snippet */}
        <div className="p-4 bg-brand-ivory border-t border-brand-border text-xs text-brand-charcoal-muted space-y-2">
          <p className="font-semibold text-brand-forest">Contact Details:</p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 text-brand-charcoal hover:text-brand-growth"
          >
            <Mail className="w-3.5 h-3.5 text-brand-growth" />
            {siteConfig.contact.email}
          </a>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-charcoal hover:text-brand-growth"
          >
            <Phone className="w-3.5 h-3.5 text-brand-growth" />
            WhatsApp: {siteConfig.contact.whatsappNumber}
          </a>
        </div>
      </div>
    </div>
  );
}
