"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  FolderTree,
  Mail,
  HeartHandshake,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { initialPrograms } from "@/config/initial-programs";
import { initialStories } from "@/config/initial-stories";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    publishedStories: initialStories.filter((s) => s.published).length,
    activePrograms: initialPrograms.filter((p) => p.active).length,
    inquiriesCount: 2, // simulated initial records
    donationsCount: 1, // simulated verified donation
  });

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-brand-forest text-white shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-3 py-1 rounded-full">
            Admin Overview
          </span>
          <h1 className="font-serif text-3xl font-bold text-white">
            Faith Fountain Foundation Management
          </h1>
          <p className="text-sm text-white/80 leading-relaxed font-sans">
            Welcome to the management console. Here you can publish field stories,
            review community inquiries, inspect verified PayPal donation
            records, and configure site settings.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-white rounded-xl border border-brand-border shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-charcoal-muted uppercase tracking-wider">
              Published Stories
            </p>
            <p className="text-3xl font-bold font-serif text-brand-forest mt-1">
              {stats.publishedStories}
            </p>
            <Link
              href="/admin/stories"
              className="text-xs text-brand-growth hover:underline font-semibold mt-2 inline-block"
            >
              Manage Stories &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-growth/10 text-brand-growth flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-brand-border shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-charcoal-muted uppercase tracking-wider">
              Active Programs
            </p>
            <p className="text-3xl font-bold font-serif text-brand-forest mt-1">
              {stats.activePrograms}
            </p>
            <Link
              href="/admin/programs"
              className="text-xs text-brand-growth hover:underline font-semibold mt-2 inline-block"
            >
              View Programs &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center">
            <FolderTree className="w-6 h-6 text-emerald-300" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-brand-border shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-charcoal-muted uppercase tracking-wider">
              Inquiries Inbox
            </p>
            <p className="text-3xl font-bold font-serif text-brand-forest mt-1">
              {stats.inquiriesCount}
            </p>
            <Link
              href="/admin/inquiries"
              className="text-xs text-brand-growth hover:underline font-semibold mt-2 inline-block"
            >
              Review Inquiries &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-growth/10 text-brand-growth flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border border-brand-border shadow-soft flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-brand-charcoal-muted uppercase tracking-wider">
              Verified Donations
            </p>
            <p className="text-3xl font-bold font-serif text-brand-forest mt-1">
              {stats.donationsCount}
            </p>
            <Link
              href="/admin/donations"
              className="text-xs text-brand-growth hover:underline font-semibold mt-2 inline-block"
            >
              View Donations &rarr;
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brand-forest text-white flex items-center justify-center">
            <HeartHandshake className="w-6 h-6 text-emerald-300" />
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity Stories */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h3 className="font-serif text-lg font-bold text-brand-forest">
              Latest Activity Stories
            </h3>
            <Link
              href="/admin/stories/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-growth text-white text-xs font-semibold hover:bg-brand-growth-hover transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Write New Story
            </Link>
          </div>

          <div className="divide-y divide-brand-border/60">
            {initialStories.slice(0, 3).map((story) => (
              <div key={story.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-brand-forest hover:text-brand-growth transition-colors line-clamp-1">
                    <Link href={`/admin/stories`}>{story.title}</Link>
                  </h4>
                  <p className="text-xs text-brand-charcoal-muted mt-0.5">
                    {story.category} &bull; {formatDate(story.publishedAt)}
                  </p>
                </div>
                <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Published
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <Link
              href="/admin/stories"
              className="text-xs font-semibold text-brand-growth hover:underline"
            >
              View all stories &rarr;
            </Link>
          </div>
        </div>

        {/* System & Integration Status */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-soft space-y-4">
          <div className="border-b border-brand-border pb-3">
            <h3 className="font-serif text-lg font-bold text-brand-forest">
              Integration &amp; Service Status
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-brand-ivory flex items-center justify-between">
              <span className="font-semibold text-brand-forest">
                PayPal Integration Mode
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold uppercase text-[10px]">
                Sandbox (Test Mode)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-brand-ivory flex items-center justify-between">
              <span className="font-semibold text-brand-forest">
                Firebase Firestore
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                Connected &amp; Ready
              </span>
            </div>

            <div className="p-3 rounded-lg bg-brand-ivory flex items-center justify-between">
              <span className="font-semibold text-brand-forest">
                Payment Security &amp; Idempotency
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                Active (Server-Side Capture)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-brand-ivory flex items-center justify-between">
              <span className="font-semibold text-brand-forest">
                Public Administrator Registration
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                Disabled (Console Only)
              </span>
            </div>
          </div>

          <div className="pt-2 text-right">
            <Link
              href="/admin/settings"
              className="text-xs font-semibold text-brand-growth hover:underline"
            >
              Manage settings &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
