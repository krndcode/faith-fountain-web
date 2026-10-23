import React from "react";
import { Metadata } from "next";
import { getPrograms } from "@/lib/firebase/firestore";
import { PageHero } from "@/components/common/PageHero";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { CallToAction } from "@/components/common/CallToAction";
import { SectionHeading } from "@/components/common/SectionHeading";

export const metadata: Metadata = {
  title: "Our Programs | Education, Community, Children & Gospel Outreach",
  description:
    "Explore the charitable programs of Faith Fountain Foundation, providing school learning materials, community relief, orphanage support, hospital bill assistance, and gospel ministry.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <div>
      <PageHero
        badge="Pathways of Service"
        title="Our Dedicated Programs"
        description="Faith in action through practical, compassionate assistance designed to meet immediate human needs and open opportunities for the future."
        breadcrumb={[{ label: "Our Programs" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Christian Service in Action"
            title="Meeting Needs, Sharing Hope"
            subtitle="Each program addresses verified challenges faced by vulnerable children, families, and communities in Ghana."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Help Support a Program Today"
        description="Your financial support or donation of items directly equips children with school materials, provides food for orphanages, and relieves medical distress."
      />
    </div>
  );
}
