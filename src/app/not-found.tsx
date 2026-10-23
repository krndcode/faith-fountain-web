import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { Home, Compass, MessageSquare } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-brand-ivory/50 px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-center">
          <Image
            src="/images/logo.svg"
            alt="Faith Fountain Foundation"
            width={240}
            height={55}
            className="h-12 w-auto"
          />
        </div>

        <div className="w-16 h-16 rounded-full bg-brand-forest text-emerald-300 flex items-center justify-center mx-auto shadow-soft">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-growth">
            404 &bull; Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
            A Pathway That Does Not Exist
          </h1>
          <p className="text-sm text-brand-charcoal-muted leading-relaxed font-sans">
            The page you are looking for may have been moved, updated, or does not
            exist. Please return to our home page or explore our charitable
            programs.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton href="/" variant="growth" size="md">
            <Home className="w-4 h-4 mr-1.5" />
            Return Home
          </PrimaryButton>
          <SecondaryButton href="/programs" variant="outline-forest" size="md">
            Our Programs
          </SecondaryButton>
          <SecondaryButton href="/contact" variant="ghost" size="md">
            <MessageSquare className="w-4 h-4 mr-1.5" />
            Contact Us
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
