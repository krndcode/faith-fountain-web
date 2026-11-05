import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Story } from "@/types";
import { formatDate } from "@/lib/utils";
import { siteImages } from "@/config/site-images";
import { Calendar, ArrowRight } from "lucide-react";
import { MotionCard } from "@/components/motion/MotionWrapper";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const imageSrc = story.featuredImage || siteImages.newsPlaceholder.src;

  return (
    <MotionCard className="h-full">
      <article className="group bg-white rounded-xl overflow-hidden border border-brand-border shadow-soft hover:shadow-card transition-all duration-300 flex flex-col h-full">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-ivory">
          <Image
            src={imageSrc}
            alt={story.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95 text-brand-forest shadow-sm">
              {story.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-charcoal-muted mb-2">
              <Calendar className="w-3.5 h-3.5 text-brand-growth" />
              <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
            </div>

            <h3 className="font-serif text-xl font-bold text-brand-forest group-hover:text-brand-growth transition-colors line-clamp-2">
              <Link href={`/news/${story.slug}`}>{story.title}</Link>
            </h3>

            <p className="mt-3 text-sm text-brand-charcoal-muted leading-relaxed line-clamp-3">
              {story.summary}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-brand-border/60">
            <Link
              href={`/news/${story.slug}`}
              className="inline-flex items-center text-sm font-semibold text-brand-growth hover:text-brand-growth-hover transition-colors group/link"
            >
              Read Story
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </MotionCard>
  );
}
