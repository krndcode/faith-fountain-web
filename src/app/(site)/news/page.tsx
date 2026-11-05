import React from "react";
import { Metadata } from "next";
import { getPublishedStories } from "@/lib/firebase/firestore";
import { PageHero } from "@/components/common/PageHero";
import { StoryCard } from "@/components/news/StoryCard";
import { EmptyState } from "@/components/common/States";
import { CallToAction } from "@/components/common/CallToAction";
import { StaggerContainer, StaggerItem } from "@/components/motion/MotionWrapper";

export const metadata: Metadata = {
  title: "News and Stories | Field Reports & Updates",
  description:
    "Read the latest field reports, donation updates, and community stories from Faith Fountain Foundation in Canada and Ghana.",
};

export const revalidate = 60; // revalidate every minute

export default async function NewsPage() {
  const stories = await getPublishedStories();

  return (
    <div>
      <PageHero
        badge="Field Reports"
        title="News and Stories"
        description="Stay updated with our latest community outreach initiatives, school distributions, and foundation milestones."
        breadcrumb={[{ label: "News & Stories" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {stories.length === 0 ? (
            <EmptyState
              title="No Stories Published Yet"
              message="New field reports and activity updates will be published soon. Please check back shortly or connect with us on Facebook."
              actionHref="/"
              actionLabel="Return to Homepage"
            />
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story) => (
                <StaggerItem key={story.id}>
                  <StoryCard story={story} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
