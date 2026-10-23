"use client";

import React, { useState } from "react";
import { DonationRecord } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Heart, ShieldCheck, Download, Search } from "lucide-react";

const sampleDonations: DonationRecord[] = [
  {
    id: "don-1",
    paypalOrderId: "8XB12345678901234",
    paypalCaptureId: "99A98765432109876",
    amount: 100.0,
    currency: "CAD",
    status: "COMPLETED",
    donorEmail: "supporter.ca@example.com",
    donorName: "Generous Friend",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "don-2",
    paypalOrderId: "3KL45678901234567",
    paypalCaptureId: "12C54321098765432",
    amount: 50.0,
    currency: "USD",
    status: "COMPLETED",
    donorEmail: "outreach.partner@example.org",
    donorName: "Grace Fellowship",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

export default function AdminDonationsPage() {
  const [donations] = useState<DonationRecord[]>(sampleDonations);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = donations.filter(
    (d) =>
      d.paypalOrderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.paypalCaptureId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.donorEmail && d.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
            PayPal Donation Records
          </h1>
          <p className="text-xs text-brand-charcoal-muted mt-1">
            Verified server-side captures from online donations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Captures Only
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-charcoal-muted">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by order ID, capture ID, or donor email..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white"
        />
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-charcoal">
            <thead className="bg-brand-ivory text-brand-forest text-xs uppercase font-bold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Amount &amp; Currency</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">PayPal Capture ID</th>
                <th className="py-3.5 px-4">Donor (Optional)</th>
                <th className="py-3.5 px-4 sm:px-6">Date Recorded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-brand-ivory/30 transition-colors">
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <span className="font-serif font-bold text-base text-brand-forest">
                      {formatCurrency(d.amount, d.currency)}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-brand-charcoal">
                    {d.paypalCaptureId}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-brand-charcoal-muted">
                    {d.donorName || d.donorEmail || "Anonymous Donor"}
                  </td>
                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs text-brand-charcoal-muted">
                    {formatDate(d.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
