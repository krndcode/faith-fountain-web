import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { initialPrograms } from "@/config/initial-programs";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Facebook,
  ShieldCheck,
  Lock,
} from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-forest text-white border-t border-brand-growth/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Organization & Motto */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.svg"
                alt="Faith Fountain Foundation"
                width={240}
                height={55}
                className="h-12 w-auto"
              />
            </Link>
            <p className="font-serif italic text-emerald-300 text-sm font-medium">
              &ldquo;{siteConfig.motto}&rdquo;
            </p>
            <p className="text-white/80 text-sm leading-relaxed font-sans">
              A Christian nonprofit foundation established in 2022 with head office
              in Canada and branches in Ghana, serving children, families, and
              communities in need.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-growth flex items-center justify-center transition-colors text-white"
                aria-label="Faith Fountain Foundation on Facebook"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-growth flex items-center justify-center transition-colors text-white"
                aria-label="Connect via WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-growth flex items-center justify-center transition-colors text-white"
                aria-label="Send an email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>&rsaquo;</span> {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/donate"
                  className="text-emerald-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" /> Donate Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Programs */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
              Our Programs
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              {initialPrograms.map((program) => (
                <li key={program.id}>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>&rsaquo;</span> {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Locations</p>
                  <p className="text-white/80 text-xs">Head Office: Canada</p>
                  <p className="text-white/80 text-xs">Branches: Ghana</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Email Address</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-emerald-300 transition-colors text-xs break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Ghana Phone Numbers</p>
                  {siteConfig.contact.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.tel}`}
                      className="block hover:text-emerald-300 transition-colors text-xs"
                    >
                      {phone.number}
                    </a>
                  ))}
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-emerald-300 transition-colors text-xs text-emerald-300 font-medium mt-1"
                  >
                    WhatsApp: {siteConfig.contact.whatsappNumber}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 gap-4">
          <p>
            &copy; {currentYear} Faith Fountain Foundation. Established 2022. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy Policy
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-white/50"
            >
              <Lock className="w-3 h-3" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
