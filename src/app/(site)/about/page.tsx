import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CallToAction } from "@/components/common/CallToAction";
import {
  Heart,
  Shield,
  Sparkles,
  BookOpen,
  Target,
  Compass,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Our Story, Mission, Vision & Values",
  description:
    "Learn about Faith Fountain Foundation, established in 2022 with head office in Canada and branches in Ghana, demonstrating God's love through practical service.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        badge="About Our Foundation"
        title="Founded on Faith, Driven by Compassion"
        description="Connecting people who want to help with communities that need support in Canada and Ghana."
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* OUR STORY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest leading-tight">
                Faith Fountain Foundation
              </h2>
              <div className="space-y-4 text-base text-brand-charcoal-muted leading-relaxed font-sans">
                <p>
                  Faith Fountain Foundation was established in 2022 with a desire
                  to serve others through faith, compassion, and generosity.
                </p>
                <p>
                  We believe every person deserves dignity, care, and
                  opportunities to thrive. Our work responds to immediate needs
                  while supporting a future where children can learn and
                  families can build sustainable livelihoods.
                </p>
                <p>
                  With our head office in Canada and branches in Ghana, we connect
                  people who want to help with communities that need support.
                </p>
              </div>

              <div className="p-4 bg-brand-ivory rounded-xl border border-brand-border text-xs text-brand-forest font-medium space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-growth" />
                  International Connection &bull; Local Impact
                </p>
                <p className="text-brand-charcoal-muted">
                  Head Office: Canada &bull; Operational Branches: Ghana &bull; Established: 2022
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-brand-border bg-brand-ivory aspect-[4/3] shadow-card">
                <Image
                  src={siteImages.aboutStory.src}
                  alt={siteImages.aboutStory.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-brand-ivory/50 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Guiding Purpose"
            title="Our Mission &amp; Vision"
            subtitle="Clear, faith-centered statements that direct our community service and long-term endeavors."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <div className="p-8 rounded-2xl bg-white border border-brand-border shadow-soft space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-growth text-white flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-growth">
                  What We Do Today
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-forest mt-1 mb-3">
                  Our Mission
                </h3>
                <blockquote className="font-serif italic text-lg text-brand-forest/90 leading-relaxed pl-4 border-l-4 border-brand-growth">
                  &ldquo;{siteConfig.mission}&rdquo;
                </blockquote>
              </div>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed pt-4 border-t border-brand-border/60">
                Guiding every outreach visit, school donation, and care shipment.
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 rounded-2xl bg-white border border-brand-border shadow-soft space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center mb-4">
                  <Compass className="w-6 h-6 text-emerald-300" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-growth">
                  Where We Are Heading
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-forest mt-1 mb-3">
                  Our Vision
                </h3>
                <blockquote className="font-serif italic text-lg text-brand-forest/90 leading-relaxed pl-4 border-l-4 border-brand-forest">
                  &ldquo;{siteConfig.vision}&rdquo;
                </blockquote>
              </div>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed pt-4 border-t border-brand-border/60">
                Pioneering lasting infrastructure and self-reliance in Christ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Foundation Principles"
            title="Our Core Values"
            subtitle="These five pillars anchor every decision, partnership, and outreach initiative we undertake."
            className="mb-14"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {siteConfig.values.map((v, i) => (
              <div
                key={v.title}
                className="p-6 rounded-xl bg-brand-ivory/40 border border-brand-border space-y-3 hover:border-brand-growth transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-brand-forest text-white flex items-center justify-center text-xs font-bold">
                  0{i + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-forest">
                  {v.title}
                </h3>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <CallToAction />
    </div>
  );
}
