import React from "react";
import { Metadata } from "next";
import { PageHero } from "@/components/common/PageHero";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Lock, EyeOff, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Faith Fountain Foundation",
  description:
    "Read the Privacy Policy of Faith Fountain Foundation regarding personal data, donor records, child protection, and security practices.",
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHero
        badge="Legal &amp; Ethics"
        title="Privacy Policy"
        description="Faith Fountain Foundation is committed to honoring your trust and safeguarding personal information with transparency and Christian integrity."
        breadcrumb={[{ label: "Privacy Policy" }]}
      />

      <article className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Key Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-2">
              <EyeOff className="w-6 h-6 text-brand-growth" />
              <h3 className="font-serif font-bold text-brand-forest text-base">
                Child Protection
              </h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                We strictly uphold the safety and privacy of vulnerable children.
                No sensitive details or unconsented photos of children in care
                are published.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-2">
              <Lock className="w-6 h-6 text-brand-growth" />
              <h3 className="font-serif font-bold text-brand-forest text-base">
                Secure Donations
              </h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                Online gifts are handled securely through PayPal. We never store
                debit/credit card numbers or sensitive financial authentication
                credentials.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-ivory/60 border border-brand-border space-y-2">
              <ShieldCheck className="w-6 h-6 text-brand-growth" />
              <h3 className="font-serif font-bold text-brand-forest text-base">
                Minimal Data Collection
              </h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed">
                We only gather details necessary to reply to inquiries, verify
                payments, or coordinate material deliveries. We do not sell data.
              </p>
            </div>
          </div>

          {/* Policy Text Body */}
          <div className="prose prose-brand max-w-none text-brand-charcoal font-sans space-y-8 text-sm sm:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-brand-forest">
                1. Introduction
              </h2>
              <p>
                Faith Fountain Foundation (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) was established in 2022 as a Christian
                nonprofit foundation with its head office in Canada and active
                branches in Ghana. This Privacy Policy outlines our principles
                and practices regarding the collection, use, retention, and
                protection of personal data collected through our website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-brand-forest">
                2. Information We Collect
              </h2>
              <p>
                We collect personal information solely when voluntarily provided
                by you, such as when you:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-brand-charcoal-muted">
                <li>Submit an inquiry through our Contact Us page.</li>
                <li>Submit a volunteer, partnership, or in-kind donation inquiry through our Get Involved form.</li>
                <li>Make a charitable financial gift through our PayPal Checkout integration.</li>
                <li>Communicate directly with our team via email, telephone, or WhatsApp.</li>
              </ul>
              <p>
                Typical data collected includes your name, email address,
                telephone number, area of interest, and message content.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-brand-forest">
                3. How We Process Online Donations
              </h2>
              <p>
                Online donations are initiated through PayPal’s official
                checkout infrastructure. Payment transactions are executed
                directly on PayPal’s encrypted servers. Faith Fountain
                Foundation does not receive, process, or store credit card
                numbers, CVVs, or bank account credentials.
              </p>
              <p>
                Following verified server-side capture, our system retains a
                minimal administrative record comprising the PayPal order ID,
                capture reference, amount, currency, status, and timestamp.
                These records are restricted strictly to authorized
                administrators for financial accounting and audit purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-brand-forest">
                4. Child Protection &amp; Beneficiary Dignity
              </h2>
              <p>
                Faith Fountain Foundation is deeply committed to safeguarding
                the dignity, wellbeing, and safety of all children and
                beneficiaries we serve, including residents of Happy Home
                Orphanage. We adhere to ethical child protection standards:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-brand-charcoal-muted">
                <li>We do not publish identifiable names, private histories, or sensitive medical conditions of minors.</li>
                <li>Photographs of children in residential care are handled with strict privacy protocols and never published without appropriate verified authorization and consent.</li>
                <li>Beneficiaries receiving hospital bill assistance or emergency relief are treated with utmost respect and dignity.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-brand-forest">
                5. Data Retention &amp; Disclosure
              </h2>
              <p>
                We do not sell, rent, or trade your personal information with
                commercial marketers or third-party advertisers. Information is
                disclosed only when legally required by law, court order, or to
                protect the safety and legal rights of the foundation.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-brand-forest">
                6. Contacting Us Regarding Your Privacy
              </h2>
              <p>
                If you have questions about this Privacy Policy, wish to review
                or delete any information you have submitted, please email us
                directly at:
              </p>
              <p className="font-medium text-brand-forest">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-brand-growth underline hover:text-brand-growth-hover"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-xs text-brand-charcoal-muted">
                Last updated: October 2024 &bull; Faith Fountain Foundation
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
