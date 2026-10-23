import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  badge?: string;
  breadcrumb?: { label: string; href?: string }[];
  className?: string;
}

export function PageHero({
  title,
  description,
  badge,
  breadcrumb,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-gradient-to-b from-brand-forest to-[#0B4D20] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-brand-growth/20",
        className
      )}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-growth/15 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-growth/80" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {badge && (
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth/25 text-emerald-300 border border-emerald-400/30 mb-4">
            {badge}
          </span>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-2xl font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
