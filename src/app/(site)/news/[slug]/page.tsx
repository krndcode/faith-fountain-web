import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getStoryBySlug, getPublishedStories } from "@/lib/firebase/firestore";
import { formatDate } from "@/lib/utils";
import { siteImages } from "@/config/site-images";
import { PageHero } from "@/components/common/PageHero";
import { CallToAction } from "@/components/common/CallToAction";
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const stories = await getPublishedStories();
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} | Faith Fountain Foundation News`,
    description: story.summary,
    openGraph: {
      title: story.title,
      description: story.summary,
      type: "article",
      publishedTime: story.publishedAt,
      authors: [story.author],
    },
  };
}

export default async function StoryDetailPage({ params }: Props) {
  const story = await getStoryBySlug(params.slug);

  if (!story || !story.published) {
    notFound();
  }

  const imageSrc = story.featuredImage || siteImages.newsPlaceholder.src;

  return (
    <div>
      <PageHero
        badge={story.category}
        title={story.title}
        description={story.summary}
        breadcrumb={[
          { label: "News & Stories", href: "/news" },
          { label: story.title },
        ]}
      />

      <article className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-border text-xs text-brand-charcoal-muted mb-8">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-growth" />
                <time dateTime={story.publishedAt}>
                  {formatDate(story.publishedAt)}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-growth" />
                <span>{story.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-brand-growth" />
                <span>{story.category}</span>
              </span>
            </div>

            <Link
              href="/news"
              className="inline-flex items-center text-brand-growth hover:text-brand-growth-hover font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              All News
            </Link>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-brand-border bg-brand-ivory mb-12 shadow-soft">
            <Image
              src={imageSrc}
              alt={story.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {/* Article Main Body */}
          <div className="prose prose-lg max-w-none text-brand-charcoal font-sans leading-relaxed space-y-6">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-brand-border flex items-center justify-between">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-growth transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Stories
            </Link>

            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-growth text-white hover:bg-brand-growth-hover text-sm font-semibold transition-colors"
            >
              Support Future Projects
            </Link>
          </div>
        </div>
      </article>

      <CallToAction />
    </div>
  );
}
