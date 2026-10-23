import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GetInvolvedForm } from "@/components/get-involved/GetInvolvedForm";
import { CallToAction } from "@/components/common/CallToAction";
import {
  Heart,
  Package,
  Users,
  Handshake,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved | Volunteer, Partner & Donate Items",
  description:
    "Join Faith Fountain Foundation by giving financially, donating school supplies, volunteering, or partnering with our Christian community initiatives in Canada and Ghana.",
};

export default function GetInvolvedPage() {
  const participationOptions = [
    {
      title: "1. Donate Money",
      icon: Heart,
      description:
        "Support our charitable operations directly through online PayPal giving. Donations fund learning materials, hospital bill relief, and orphanage supplies.",
      actionLabel: "Donate Online",
      actionHref: "/donate",
      highlight: true,
    },
    {
      title: "2. Donate Items",
      icon: Package,
      description:
        "Provide tangible educational materials and essential supplies. We actively collect school bags, uniforms, footwear, and stationery for students in Ghana.",
      actionLabel: "View Needed Items",
      actionHref: "#needed-items",
      highlight: false,
    },
    {
      title: "3. Volunteer",
      icon: Users,
      description:
        "Offer your time, professional skills, or logistical help in Canada or Ghana to assist with outreach distributions, sorting supplies, or administration.",
      actionLabel: "Volunteer Inquiry",
      actionHref: "#inquiry-form",
      highlight: false,
    },
    {
      title: "4. Partner With Us",
      icon: Handshake,
      description:
        "We welcome partnerships with local churches, Christian ministries, schools, and civic organizations seeking to demonstrate God's love through practical aid.",
      actionLabel: "Partner Inquiry",
      actionHref: "#inquiry-form",
      highlight: false,
    },
  ];

  return (
    <div>
      <PageHero
        badge="Join the Mission"
        title="Get Involved with Faith Fountain"
        description="Whether through financial gifts, educational supplies, volunteer service, or organizational partnership, your support brings hope to lives in need."
        breadcrumb={[{ label: "Get Involved" }]}
      />

      {/* 4 PARTICIPATION OPTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Ways to Serve"
            title="Four Ways You Can Make a Difference"
            subtitle="Explore how you can align your resources and heart with the mission of Faith Fountain Foundation."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {participationOptions.map((opt, idx) => {
              const Icon = opt.icon;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border flex flex-col justify-between transition-all duration-200 ${
                    opt.highlight
                      ? "bg-brand-growth-soft/30 border-brand-growth shadow-soft"
                      : "bg-white border-brand-border hover:shadow-card"
                  }`}
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        opt.highlight
                          ? "bg-brand-growth text-white"
                          : "bg-brand-forest text-emerald-300"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brand-forest">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={opt.actionHref}
                      className={`inline-flex items-center text-xs font-bold uppercase tracking-wider ${
                        opt.highlight
                          ? "text-brand-growth hover:underline"
                          : "text-brand-forest hover:text-brand-growth"
                      }`}
                    >
                      {opt.actionLabel} &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEEDED SCHOOL SUPPLIES SECTION */}
      <section id="needed-items" className="py-20 bg-brand-ivory/50 border-y border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                In-Kind Item Donations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest leading-tight">
                Requested School Supplies &amp; Materials
              </h2>
              <p className="text-base text-brand-charcoal-muted leading-relaxed font-sans">
                Many pupils in rural Ghana lack basic learning equipment. Donating
                physical school supplies removes a major barrier to consistent
                school attendance and helps children learn with dignity.
              </p>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                If you or your group have gathered items to send, please submit
                the inquiry form below or message our team via WhatsApp to
                coordinate collection in Canada or Ghana.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-soft space-y-4">
                <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                  <BookOpen className="w-6 h-6 text-brand-growth" />
                  <h3 className="font-serif text-xl font-bold text-brand-forest">
                    Requested Items Checklist
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {siteConfig.requestedSchoolSupplies.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-brand-ivory/40 border border-brand-border/60 text-xs text-brand-charcoal font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-growth shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTICIPATION INQUIRY FORM */}
      <section id="inquiry-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            tagline="Get in Touch"
            title="Participation Inquiry Form"
            subtitle="Let us know how you would like to participate. Our team will review your message and reply promptly."
            className="mb-12"
          />

          <GetInvolvedForm />
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
