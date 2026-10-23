import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getProgramBySlug, getPrograms } from "@/lib/firebase/firestore";
import { siteImages, SiteImageKey } from "@/config/site-images";
import { PageHero } from "@/components/common/PageHero";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { CallToAction } from "@/components/common/CallToAction";
import {
  CheckCircle2,
  Heart,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Target,
  ListChecks,
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  if (!program) return { title: "Program Not Found" };

  return {
    title: `${program.title} | Faith Fountain Foundation Programs`,
    description: program.shortDescription,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const program = await getProgramBySlug(params.slug);

  if (!program) {
    notFound();
  }

  const imageKey = program.imageKey as SiteImageKey;
  const imageConfig = siteImages[imageKey] || siteImages.educationSupport;

  // Specific ethical / legal disclaimers as required by prompt
  const isChildrenInCare = program.slug === "children-in-care";
  const isHospitalAssistance = program.slug === "hospital-assistance";

  return (
    <div>
      <PageHero
        badge="Foundation Program"
        title={program.title}
        description={program.shortDescription}
        breadcrumb={[
          { label: "Our Programs", href: "/programs" },
          { label: program.title },
        ]}
      />

      <article className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Main Visual & Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden border border-brand-border bg-brand-ivory shadow-soft">
              <Image
                src={imageConfig.src}
                alt={imageConfig.alt || program.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth">
                Program Overview
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-forest">
                {program.title}
              </h2>
              <p className="text-base text-brand-charcoal leading-relaxed">
                {program.fullDescription}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <PrimaryButton href="/donate" variant="growth" size="md">
                  <Heart className="w-4 h-4 fill-current mr-1.5" />
                  Support This Program
                </PrimaryButton>
                <SecondaryButton
                  href="/contact"
                  variant="outline-forest"
                  size="md"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5" />
                  Inquire Directly
                </SecondaryButton>
              </div>
            </div>
          </div>

          {/* Child Protection Notice for Children in Care */}
          {isChildrenInCare && (
            <div className="p-6 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <span>Child Protection &amp; Privacy Statement</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed font-sans">
                Faith Fountain Foundation upholds the highest standards of child
                protection. Donations to Happy Home Orphanage are delivered with
                the utmost respect for children’s privacy, dignity, and security.
                We do not publish identifiable photographs, full names, or
                sensitive background stories of children in care.
              </p>
            </div>
          )}

          {/* Healthcare Disclaimer for Hospital Assistance */}
          {isHospitalAssistance && (
            <div className="p-6 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-base">
                <ShieldAlert className="w-5 h-5 text-blue-700" />
                <span>Medical Assistance Notice</span>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed font-sans">
                Faith Fountain Foundation provides financial relief to assist
                vulnerable patients with verified hospital bills and discharge
                expenses. The foundation does not own or operate healthcare
                clinics, dispense medical advice, or guarantee financial
                assistance to every applicant. Support is granted based on
                verified need and available charitable resources.
              </p>
            </div>
          )}

          {/* Program Objectives */}
          <div className="p-8 sm:p-10 rounded-2xl bg-brand-ivory/60 border border-brand-border space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-growth text-white flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  Key Program Objectives
                </h3>
                <p className="text-xs text-brand-charcoal-muted">
                  What we intentionally strive to achieve through this initiative
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.objectives.map((obj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-brand-border/60 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-growth shrink-0 mt-0.5" />
                  <p className="text-sm text-brand-charcoal leading-relaxed">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Foundation Activities */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-forest text-white flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest">
                  Documented Foundation Activities
                </h3>
                <p className="text-xs text-brand-charcoal-muted">
                  Practical steps carried out by foundation volunteers and staff
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {program.activities.map((act, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-brand-border/80 flex items-start gap-3 text-sm text-brand-charcoal"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-growth/10 text-brand-growth flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Support This Program */}
          <div className="p-8 rounded-2xl bg-brand-growth-soft/40 border border-brand-growth/30 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              How You Can Support {program.title}
            </h3>
            <p className="text-sm text-brand-charcoal leading-relaxed font-sans">
              {program.howToSupport}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <PrimaryButton href="/donate" variant="growth" size="md">
                Make a Dedicated Donation
              </PrimaryButton>
              <SecondaryButton
                href="/get-involved"
                variant="outline-forest"
                size="md"
              >
                Inquire About Item Donations
              </SecondaryButton>
            </div>
          </div>
        </div>
      </article>

      <CallToAction />
    </div>
  );
}
