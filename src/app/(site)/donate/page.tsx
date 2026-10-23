import React from "react";
import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { DonationForm } from "@/components/donate/DonationForm";
import {
  Heart,
  ShieldCheck,
  BookOpen,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donate Online | Support Faith Fountain Foundation",
  description:
    "Make a secure online charitable donation to Faith Fountain Foundation via PayPal Checkout to support education, orphanage care, hospital bill relief, and Gospel outreach.",
};

export default function DonatePage() {
  return (
    <div>
      <PageHero
        badge="Online Giving"
        title="Support Faith Fountain Foundation"
        description="Your compassionate generosity provides books for school pupils, food for children in residential care, relief for hospital patients, and shares the Gospel."
        breadcrumb={[{ label: "Donate" }]}
      />

      <section className="py-20 bg-brand-ivory/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Mission Context & Trust */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                  Faith in Action
                </span>
                <h2 className="font-serif text-3xl font-bold text-brand-forest mt-3 leading-tight">
                  Where Your Donation Goes
                </h2>
                <p className="mt-3 text-sm text-brand-charcoal-muted leading-relaxed font-sans">
                  Faith Fountain Foundation was established in 2022 to demonstrate
                  God&apos;s love in practical ways. Every gift received is
                  carefully stewarded toward genuine community assistance in
                  Ghana.
                </p>
              </div>

              {/* Four pillars list */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border/80">
                  <div className="w-9 h-9 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-forest">
                      Equipping Schoolchildren
                    </h3>
                    <p className="text-xs text-brand-charcoal-muted mt-0.5 leading-relaxed">
                      Supplying uniforms, school bags, exercise books, pens, and
                      mathematical sets to pupils who lack basic supplies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border/80">
                  <div className="w-9 h-9 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-forest">
                      Happy Home Orphanage Care
                    </h3>
                    <p className="text-xs text-brand-charcoal-muted mt-0.5 leading-relaxed">
                      Delivering essential nutrition staples, personal care
                      items, and educational items to children in care.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white border border-brand-border/80">
                  <div className="w-9 h-9 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-brand-forest">
                      Hospital Bill Relief
                    </h3>
                    <p className="text-xs text-brand-charcoal-muted mt-0.5 leading-relaxed">
                      Assisting vulnerable patients with unpaid medical bills
                      and discharge fees during acute emergencies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & In-Kind Note */}
              <div className="p-5 rounded-xl bg-white border border-brand-border space-y-3">
                <div className="flex items-center gap-2 text-brand-forest font-serif font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-brand-growth" />
                  <span>Secure Server-Side Processing</span>
                </div>
                <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                  All transactions are processed through official PayPal
                  Checkout and verified directly by our secure servers. We never
                  store credit card numbers or financial passwords.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-brand-forest text-white space-y-2">
                <p className="font-serif font-bold text-sm text-emerald-300">
                  Prefer to Donate Physical Items?
                </p>
                <p className="text-xs text-white/80 leading-relaxed">
                  We gladly receive school uniforms, school bags, footwear, and
                  learning materials.{" "}
                  <Link
                    href="/get-involved#needed-items"
                    className="text-white underline font-semibold hover:text-emerald-300"
                  >
                    View our requested school supplies list &rarr;
                  </Link>
                </p>
              </div>
            </div>

            {/* Right Column: Donation Form & Checkout */}
            <div className="lg:col-span-7">
              <DonationForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
