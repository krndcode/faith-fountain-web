import React from "react";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { Heart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  title?: string;
  description?: string;
  showDonate?: boolean;
  showContact?: boolean;
  className?: string;
}

export function CallToAction({
  title = "Together, We Can Bring Hope",
  description = "Every gift of resources, time, and prayer strengthens our hands to serve vulnerable children, relieve families in crisis, and share God's enduring love in Canada and Ghana.",
  showDonate = true,
  showContact = true,
  className,
}: CallToActionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-brand-forest text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {/* Subtle decorative background circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-growth/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-growth/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth/20 text-emerald-300 border border-emerald-400/30 mb-4">
          Join Our Mission
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {showDonate && (
            <PrimaryButton href="/donate" variant="growth" size="lg">
              <Heart className="w-5 h-5 fill-current" />
              Support Our Work
            </PrimaryButton>
          )}
          {showContact && (
            <SecondaryButton href="/contact" variant="outline-white" size="lg">
              <MessageSquare className="w-5 h-5" />
              Contact Our Team
            </SecondaryButton>
          )}
        </div>
      </div>
    </section>
  );
}
