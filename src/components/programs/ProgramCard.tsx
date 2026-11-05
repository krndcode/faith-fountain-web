import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Program } from "@/types";
import { siteImages, SiteImageKey } from "@/config/site-images";
import { ArrowRight } from "lucide-react";
import { MotionCard } from "@/components/motion/MotionWrapper";

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const imageKey = program.imageKey as SiteImageKey;
  const imageConfig = siteImages[imageKey] || siteImages.educationSupport;

  return (
    <MotionCard className="h-full">
      <article className="group bg-white rounded-xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col h-full">
        {/* Program Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-ivory">
          <Image
            src={imageConfig.src}
            alt={imageConfig.alt || program.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-brand-forest group-hover:text-brand-growth transition-colors line-clamp-2">
              <Link href={`/programs/${program.slug}`}>{program.title}</Link>
            </h3>
            <p className="mt-3 text-sm text-brand-charcoal-muted leading-relaxed line-clamp-3">
              {program.shortDescription}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border/60">
            <Link
              href={`/programs/${program.slug}`}
              className="inline-flex items-center text-sm font-semibold text-brand-growth hover:text-brand-growth-hover transition-colors group/link"
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </MotionCard>
  );
}
