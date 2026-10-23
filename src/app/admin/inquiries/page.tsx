"use client";

import React, { useState } from "react";
import { Inquiry } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Mail,
  User,
  Phone,
  CheckCircle,
  Clock,
  Search,
  MessageSquare,
  X,
} from "lucide-react";

const sampleInquiries: Inquiry[] = [
  {
    id: "inq-1",
    type: "get-involved",
    name: "Kwesi Arthur",
    email: "kwesi.arthur@example.com",
    phone: "+233 50 123 4567",
    areaOfInterest: "donate-items",
    message:
      "We have gathered 60 exercise books, 40 sets of pens and pencils, and two boxes of mathematical sets from our fellowship in Accra. How can we arrange delivery to your distribution team?",
    privacyConsent: true,
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "inq-2",
    type: "contact",
    name: "Grace Osei",
    email: "grace.osei@example.ca",
    phone: "+1 416 555 0199",
    subject: "Inquiry regarding hospital bill relief support",
    message:
      "Greetings in Christ. I am located in Toronto, Canada and would like to learn more about how Faith Fountain Foundation coordinates payments directly to hospitals in Ghana. Thank you for your service.",
    privacyConsent: true,
    status: "reviewed",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(sampleInquiries);
  const [filterType, setFilterType] = useState<"all" | "contact" | "get-involved">("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const toggleStatus = (id: string) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const nextStatus = inq.status === "new" ? "reviewed" : inq.status === "reviewed" ? "responded" : "new";
          return { ...inq, status: nextStatus };
        }
        return inq;
      })
    );
  };

  const filtered = inquiries.filter((inq) =>
    filterType === "all" ? true : inq.type === filterType
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
            Inquiries Inbox
          </h1>
          <p className="text-xs text-brand-charcoal-muted mt-1">
            Review contact messages and participation requests from supporters.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-brand-border">
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              filterType === "all"
                ? "bg-brand-forest text-white"
                : "text-brand-charcoal hover:bg-brand-ivory"
            }`}
          >
            All ({inquiries.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType("contact")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              filterType === "contact"
                ? "bg-brand-forest text-white"
                : "text-brand-charcoal hover:bg-brand-ivory"
            }`}
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => setFilterType("get-involved")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              filterType === "get-involved"
                ? "bg-brand-forest text-white"
                : "text-brand-charcoal hover:bg-brand-ivory"
            }`}
          >
            Get Involved
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-charcoal">
            <thead className="bg-brand-ivory text-brand-forest text-xs uppercase font-bold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Sender Details</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Subject / Area</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {filtered.map((inq) => (
                <tr
                  key={inq.id}
                  className="hover:bg-brand-ivory/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedInquiry(inq)}
                >
                  <td className="py-4 px-4 sm:px-6">
                    <p className="font-semibold text-brand-forest">{inq.name}</p>
                    <p className="text-xs text-brand-charcoal-muted mt-0.5">
                      {inq.email}
                    </p>
                    {inq.phone && (
                      <p className="text-[11px] text-brand-charcoal-muted">
                        {inq.phone}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        inq.type === "contact"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {inq.type === "contact" ? "Contact" : "Get Involved"}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs">
                    <p className="text-xs font-medium text-brand-forest truncate">
                      {inq.subject || inq.areaOfInterest || "General Inquiry"}
                    </p>
                    <p className="text-xs text-brand-charcoal-muted line-clamp-1 mt-0.5">
                      {inq.message}
                    </p>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-brand-charcoal-muted">
                    {formatDate(inq.createdAt)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => toggleStatus(inq.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize transition-colors ${
                        inq.status === "new"
                          ? "bg-red-100 text-red-800 hover:bg-red-200"
                          : inq.status === "reviewed"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                      }`}
                    >
                      {inq.status}
                    </button>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInquiry(inq);
                      }}
                      className="text-xs font-bold text-brand-growth hover:underline"
                    >
                      Read Full
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Inquiry Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-brand-border space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-serif text-lg font-bold text-brand-forest">
                Inquiry from {selectedInquiry.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-brand-charcoal-muted hover:text-brand-forest rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-brand-charcoal">
              <div className="grid grid-cols-2 gap-2 bg-brand-ivory/50 p-3 rounded-lg border border-brand-border/60">
                <div>
                  <span className="text-brand-charcoal-muted">Email:</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="block font-semibold text-brand-growth hover:underline break-all"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-brand-charcoal-muted">Phone:</span>
                  <p className="font-semibold">{selectedInquiry.phone || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-brand-charcoal-muted">Type:</span>
                  <p className="font-semibold capitalize">{selectedInquiry.type}</p>
                </div>
                <div>
                  <span className="text-brand-charcoal-muted">Submitted:</span>
                  <p className="font-semibold">{formatDate(selectedInquiry.createdAt)}</p>
                </div>
              </div>

              <div>
                <span className="font-semibold text-brand-forest block mb-1">
                  Message:
                </span>
                <div className="p-4 bg-brand-ivory/30 border border-brand-border rounded-lg text-sm text-brand-charcoal leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=RE: Faith Fountain Foundation Inquiry`}
                className="px-4 py-2 rounded-lg bg-brand-growth hover:bg-brand-growth-hover text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-lg border border-brand-border text-xs font-semibold text-brand-forest hover:bg-brand-ivory"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
