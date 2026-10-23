import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  tagline?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  tagline,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {tagline && (
        <span
          className={cn(
            "inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3",
            dark
              ? "bg-brand-growth/20 text-emerald-300 border border-emerald-500/30"
              : "bg-brand-growth-soft text-brand-growth border border-brand-growth/20"
          )}
        >
          {tagline}
        </span>
      )}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight",
          dark ? "text-white" : "text-brand-forest"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg font-sans leading-relaxed",
            dark ? "text-white/80" : "text-brand-charcoal-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
