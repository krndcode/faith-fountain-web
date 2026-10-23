import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/common/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Canada & Ghana Foundation Offices",
  description:
    "Contact Faith Fountain Foundation via email, Ghana telephone numbers, WhatsApp, or Facebook. We are ready to answer your inquiries.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        badge="Connect With Us"
        title="We Would Love to Hear from You"
        description="Whether you have questions about our programs, wish to donate supplies, or want to partner with our Christian outreach, our team is here to assist."
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="py-20 bg-brand-ivory/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth border border-brand-growth/20">
                  Direct Inquiries
                </span>
                <h2 className="font-serif text-3xl font-bold text-brand-forest mt-3 leading-tight">
                  Official Contact Channels
                </h2>
                <p className="mt-3 text-sm text-brand-charcoal-muted leading-relaxed font-sans">
                  Please reach out to us through any of our official telephone,
                  messaging, or email channels below.
                </p>
              </div>

              {/* Locations Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-border space-y-2 shadow-soft">
                <div className="flex items-center gap-3 text-brand-forest font-serif font-bold text-base">
                  <div className="w-8 h-8 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Locations &amp; Offices</span>
                </div>
                <div className="pt-2 text-sm text-brand-charcoal space-y-1 pl-11">
                  <p>
                    <span className="font-semibold text-brand-forest">Head Office:</span> Canada
                  </p>
                  <p>
                    <span className="font-semibold text-brand-forest">Branches:</span> Ghana
                  </p>
                  <p className="text-xs text-brand-charcoal-muted pt-1">
                    Established in 2022. Serving communities across Canada and Ghana.
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-border space-y-2 shadow-soft">
                <div className="flex items-center gap-3 text-brand-forest font-serif font-bold text-base">
                  <div className="w-8 h-8 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Email Inquiries</span>
                </div>
                <div className="pt-2 text-sm pl-11">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-brand-growth font-semibold hover:underline break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                  <p className="text-xs text-brand-charcoal-muted mt-1">
                    Send general inquiries, partnership proposals, and receipts.
                  </p>
                </div>
              </div>

              {/* WhatsApp & Ghana Phone Contacts */}
              <div className="p-6 rounded-2xl bg-white border border-brand-border space-y-4 shadow-soft">
                <div className="flex items-center gap-3 text-brand-forest font-serif font-bold text-base">
                  <div className="w-8 h-8 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Telephone &amp; WhatsApp (Ghana)</span>
                </div>
                <div className="space-y-3 pl-11 text-sm">
                  {/* WhatsApp */}
                  <div>
                    <p className="text-xs font-semibold text-brand-forest uppercase tracking-wider">
                      WhatsApp Messaging &amp; Calls
                    </p>
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-growth font-bold hover:underline mt-0.5"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                      {siteConfig.contact.whatsappNumber}
                    </a>
                  </div>

                  {/* Ghana Phone Lines */}
                  <div>
                    <p className="text-xs font-semibold text-brand-forest uppercase tracking-wider">
                      Ghana Telephone Lines
                    </p>
                    {siteConfig.contact.phones.map((phone) => (
                      <a
                        key={phone.number}
                        href={`tel:${phone.tel}`}
                        className="block text-brand-charcoal hover:text-brand-growth font-medium text-sm mt-0.5"
                      >
                        {phone.label}: {phone.number}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facebook Card */}
              <div className="p-6 rounded-2xl bg-white border border-brand-border space-y-2 shadow-soft">
                <div className="flex items-center gap-3 text-brand-forest font-serif font-bold text-base">
                  <div className="w-8 h-8 rounded-lg bg-brand-growth/10 text-brand-growth flex items-center justify-center">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <span>Facebook Community</span>
                </div>
                <div className="pt-2 text-sm pl-11">
                  <a
                    href={siteConfig.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-growth font-semibold hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Visit Faith Fountain on Facebook &rarr;</span>
                  </a>
                  <p className="text-xs text-brand-charcoal-muted mt-1">
                    Follow field updates, photo albums, and fellowship announcements.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
