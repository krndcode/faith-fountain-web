import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "header" | "footer" | "admin" | "icon-only";
  className?: string;
  href?: string;
}

export function BrandLogo({
  variant = "header",
  className,
  href = "/",
}: BrandLogoProps) {
  const isDark = variant === "footer" || variant === "admin";

  const content = (
    <div className={cn("inline-flex items-center gap-3 group", className)}>
      {/* Official Circular Logo Emblem */}
      <div
        className={cn(
          "relative shrink-0 rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-105",
          isDark
            ? "w-11 h-11 bg-white p-0.5 ring-2 ring-emerald-400/30 shadow-md"
            : "w-11 h-11 bg-white border border-brand-border shadow-soft"
        )}
      >
        <Image
          src="/images/faith-fountain-logo.jpg"
          alt="Faith Fountain Foundation Logo"
          fill
          priority
          sizes="48px"
          className="object-cover rounded-full"
        />
      </div>

      {variant !== "icon-only" && (
        <div className="flex flex-col text-left leading-none">
          <span
            className={cn(
              "font-serif font-bold text-base sm:text-lg tracking-tight",
              isDark ? "text-white" : "text-brand-forest"
            )}
          >
            FAITH FOUNTAIN
          </span>
          <span
            className={cn(
              "font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mt-0.5",
              isDark ? "text-emerald-300" : "text-brand-growth"
            )}
          >
            FOUNDATION
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-growth rounded-md inline-block"
      >
        {content}
      </Link>
    );
  }

  return content;
}
