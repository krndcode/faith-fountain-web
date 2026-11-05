import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CallToAction } from "@/components/common/CallToAction";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from "@/components/motion/MotionWrapper";
import {
  BookOpen,
  Users,
  Shield,
  Package,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact | Documented Community Service Since 2022",
  description:
    "Review documented charitable activities of Faith Fountain Foundation, including donations to schools, Happy Home Orphanage, hospital bill relief, and future building goals.",
};

export default function ImpactPage() {
  const galleryItems = [
    {
      title: "School Learning Materials Outreach",
      category: "Education Support",
      image: "/images/schpro01.jpg",
      description: "Books, school uniforms, exercise books, and stationery distributed to pupils in Ghana.",
    },
    {
      title: "Happy Home Orphanage Delivery",
      category: "Children in Care",
      image: "/images/happyhome01.jpg",
      description: "Delivering essential nutrition and hygiene packages to residential care.",
    },
    {
      title: "Community Relief Distribution",
      category: "Community Support",
      image: "/images/comm01.jpg",
      description: "Providing household essentials and relief packages to families in hardship.",
    },
    {
      title: "Hospital Bill Financial Relief",
      category: "Healthcare Assistance",
      image: "/images/hospitalass1.jpg",
      description: "Relieving acute medical discharge debts and hospital expenses for vulnerable patients.",
    },
    {
      title: "Community Care & Accompaniment",
      category: "Community Support",
      image: "/images/community-care.jpg",
      description: "Hands-on compassion and care in local communities.",
    },
    {
      title: "Classroom Supplies Distribution",
      category: "Education Support",
      image: "/images/schpro02.jpg",
      description: "Equipping young minds with notebooks, math sets, and writing instruments.",
    },
    {
      title: "Residential Care Provisions",
      category: "Children in Care",
      image: "/images/happyhome02.jpg",
      description: "Supporting Happy Home Orphanage staff with daily sustenance supplies.",
    },
    {
      title: "Gospel Fellowship & Encouragement",
      category: "Outreach & Faith",
      image: "/images/comm03.jpg",
      description: "Sharing the message of Christ's love alongside practical aid.",
    },
    {
      title: "Empowering Students to Learn",
      category: "Education Support",
      image: "/images/schpro05.jpg",
      description: "Ensuring children can attend school prepared, confident, and with dignity.",
    },
  ];

  return (
    <div>
      <PageHero
        badge="Accountability &amp; Service"
        title="Our Impact Since 2022"
        description="Faithful stewardship through documented, authentic actions. We let our practical deeds speak to God's love and kindness."
        breadcrumb={[{ label: "Our Impact" }]}
      />

      {/* OVERVIEW SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <SectionHeading
              tagline="Transparent Record"
              title="Every Act of Kindness Matters"
              subtitle="Since establishing Faith Fountain Foundation in 2022, we have focused on steady, direct interventions that reach real people in genuine need."
              className="mb-14"
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Education */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/50 border border-brand-border space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-growth text-white flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-forest">
                    Education Support
                  </h3>
                  <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                    Regular distributions of books, school uniforms, durable
                    school bags, exercise books, and mathematical sets to help
                    underprivileged pupils stay in school with dignity.
                  </p>
                </div>
                <Link
                  href="/programs/education-support"
                  className="text-xs font-bold text-brand-growth hover:underline inline-flex items-center gap-1"
                >
                  Learn More &rarr;
                </Link>
              </MotionCard>
            </StaggerItem>

            {/* 2. Orphanage */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/50 border border-brand-border space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-300" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-forest">
                    Happy Home Orphanage
                  </h3>
                  <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                    Consistent provisions of nutrition, personal hygiene items,
                    and educational stationery supporting the children and
                    caregivers of Happy Home Orphanage in Ghana.
                  </p>
                </div>
                <Link
                  href="/programs/children-in-care"
                  className="text-xs font-bold text-brand-growth hover:underline inline-flex items-center gap-1"
                >
                  Learn More &rarr;
                </Link>
              </MotionCard>
            </StaggerItem>

            {/* 3. Community Relief */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/50 border border-brand-border space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-growth text-white flex items-center justify-center">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-forest">
                    Community Donations
                  </h3>
                  <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                    Distributions of essential non-perishable relief items, clean
                    clothing, and emergency supplies to families enduring severe
                    economic strain.
                  </p>
                </div>
                <Link
                  href="/programs/community-support"
                  className="text-xs font-bold text-brand-growth hover:underline inline-flex items-center gap-1"
                >
                  Learn More &rarr;
                </Link>
              </MotionCard>
            </StaggerItem>

            {/* 4. Hospital Assistance */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/50 border border-brand-border space-y-4 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-300" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-forest">
                    Hospital Bill Relief
                  </h3>
                  <p className="text-sm text-brand-charcoal-muted leading-relaxed">
                    Direct payments made to hospitals to clear outstanding
                    medical bills and discharge fees for patients in urgent
                    need.
                  </p>
                </div>
                <Link
                  href="/programs/hospital-assistance"
                  className="text-xs font-bold text-brand-growth hover:underline inline-flex items-center gap-1"
                >
                  Learn More &rarr;
                </Link>
              </MotionCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* PHOTO GALLERY SECTION - WITH REAL AUTHENTIC PHOTOGRAPHY */}
      <section className="py-20 bg-brand-ivory/40 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <SectionHeading
              tagline="Visual Documentation"
              title="Field Activity Gallery"
              subtitle="Authentic photographs documenting our service, school distributions, and community initiatives in Ghana."
              className="mb-14"
            />
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <StaggerItem key={index}>
                <MotionCard className="bg-white rounded-xl overflow-hidden border border-brand-border shadow-soft group h-full flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-brand-ivory">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/95 text-brand-forest shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-serif text-lg font-bold text-brand-forest group-hover:text-brand-growth transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs text-brand-charcoal-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FUTURE GOALS - CLEARLY DISTINGUISHED */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 mb-3">
                Planned Future Initiatives
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest">
                Our Future Long-Term Goals
              </h2>
              <p className="mt-4 text-base text-brand-charcoal-muted leading-relaxed">
                These strategic projects represent our long-term vision. They are
                actively in planning and will be launched as capital funding and
                partnerships are secured.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Future Goal 1 */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/60 border border-brand-border space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                    Future Goal
                  </span>
                  <Clock className="w-4 h-4 text-brand-charcoal-muted" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  1. Build Schools
                </h3>
                <p className="text-sm text-brand-charcoal leading-relaxed font-sans">
                  Construct enduring, well-equipped school facilities in
                  underserved communities to provide safe learning spaces for
                  hundreds of children who currently lack adequate classrooms.
                </p>
              </MotionCard>
            </StaggerItem>

            {/* Future Goal 2 */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/60 border border-brand-border space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                    Future Goal
                  </span>
                  <Clock className="w-4 h-4 text-brand-charcoal-muted" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  2. Small-Business Empowerment
                </h3>
                <p className="text-sm text-brand-charcoal leading-relaxed font-sans">
                  Equip low-income individuals and families with trade tools,
                  micro-grants, and practical mentorship so they can establish
                  self-sustaining businesses and care for their children
                  independently.
                </p>
              </MotionCard>
            </StaggerItem>

            {/* Future Goal 3 */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/60 border border-brand-border space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                    Future Goal
                  </span>
                  <Clock className="w-4 h-4 text-brand-charcoal-muted" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  3. Expand Community Assistance
                </h3>
                <p className="text-sm text-brand-charcoal leading-relaxed font-sans">
                  Scale our food and relief supply networks to reach additional
                  remote rural areas with clean water access and emergency family
                  aid during crises.
                </p>
              </MotionCard>
            </StaggerItem>

            {/* Future Goal 4 */}
            <StaggerItem>
              <MotionCard className="p-8 rounded-2xl bg-brand-ivory/60 border border-brand-border space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                    Future Goal
                  </span>
                  <Clock className="w-4 h-4 text-brand-charcoal-muted" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  4. Promote and Support the Gospel
                </h3>
                <p className="text-sm text-brand-charcoal leading-relaxed font-sans">
                  Partner with local churches, organize youth discipleship
                  camps, and distribute thousands of Bibles to nurture spiritual
                  growth and eternal hope.
                </p>
              </MotionCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
