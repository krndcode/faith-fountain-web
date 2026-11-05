"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { PrimaryButton } from "../common/PrimaryButton";
import { BrandLogo } from "../common/BrandLogo";
import { Menu, X, Heart, Mail, Phone } from "lucide-react";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile navigation upon route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menu = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-brand-forest/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Animated Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 z-[70] h-[100dvh] w-[85%] max-w-sm bg-white shadow-elevated flex flex-col"
          >
            <div className="p-4 border-b border-brand-border flex items-center justify-between shrink-0">
              <BrandLogo variant="header" href="/" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md text-brand-charcoal hover:bg-brand-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-growth"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-1">
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
            <div className="shrink-0 p-4 bg-brand-ivory border-t border-brand-border text-xs text-brand-charcoal-muted space-y-2">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

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

      {mounted && createPortal(menu, document.body)}
    </div>
  );
}