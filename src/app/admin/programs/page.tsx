"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialPrograms } from "@/config/initial-programs";
import { Program } from "@/types";
import { CheckCircle, Eye, FolderTree } from "lucide-react";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  const toggleActive = (id: string) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
          Our Programs
        </h1>
        <p className="text-xs text-brand-charcoal-muted mt-1">
          Review core charitable programs and public visibility settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="p-6 bg-white rounded-2xl border border-brand-border shadow-soft flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-ivory text-brand-forest border border-brand-border">
                  {prog.slug}
                </span>
                <button
                  type="button"
                  onClick={() => toggleActive(prog.id)}
                  className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    prog.active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  {prog.active ? "Active" : "Hidden"}
                </button>
              </div>

              <h3 className="font-serif text-lg font-bold text-brand-forest">
                {prog.title}
              </h3>
              <p className="text-xs text-brand-charcoal-muted leading-relaxed line-clamp-3">
                {prog.shortDescription}
              </p>

              <div className="pt-2 text-[11px] text-brand-charcoal space-y-1">
                <p>
                  <span className="font-bold text-brand-forest">Objectives:</span>{" "}
                  {prog.objectives.length} documented
                </p>
                <p>
                  <span className="font-bold text-brand-forest">Activities:</span>{" "}
                  {prog.activities.length} documented
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs">
              <Link
                href={`/programs/${prog.slug}`}
                target="_blank"
                className="text-brand-growth font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                Preview Public Page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
