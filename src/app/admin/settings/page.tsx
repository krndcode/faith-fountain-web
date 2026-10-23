"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  Save,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Globe,
  DollarSign,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [paypalMode, setPaypalMode] = useState<"sandbox" | "live">("sandbox");
  const [defaultCurrency, setDefaultCurrency] = useState("CAD");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
          Foundation Site Settings
        </h1>
        <p className="text-xs text-brand-charcoal-muted mt-1">
          Configure payment processor mode, supported currencies, and application policies.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* PayPal Payment Settings */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-soft space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-border pb-3">
            <DollarSign className="w-5 h-5 text-brand-growth" />
            <h2 className="font-serif text-lg font-bold text-brand-forest">
              PayPal Checkout Configuration
            </h2>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              Production Mode Safeguard
            </p>
            <p className="leading-relaxed font-sans">
              Live donations must only be toggled after thorough sandbox payment
              testing with verified foundation PayPal merchant credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <label
                htmlFor="paypal-mode"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Payment Environment Mode
              </label>
              <select
                id="paypal-mode"
                value={paypalMode}
                onChange={(e) => setPaypalMode(e.target.value as "sandbox" | "live")}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-growth bg-white"
              >
                <option value="sandbox">Sandbox (Development / Testing)</option>
                <option value="live">Live (Real Monetary Donations)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="default-currency"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Default Display Currency
              </label>
              <select
                id="default-currency"
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-growth bg-white"
              >
                <option value="CAD">CAD - Canadian Dollar (Primary Head Office)</option>
                <option value="USD">USD - US Dollar</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Foundation Official Details (Read Only Reference) */}
        <div className="bg-white rounded-2xl border border-brand-border p-6 shadow-soft space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-border pb-3">
            <Globe className="w-5 h-5 text-brand-growth" />
            <h2 className="font-serif text-lg font-bold text-brand-forest">
              Official Foundation Reference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-charcoal">
            <div className="p-3 bg-brand-ivory/50 rounded-lg border border-brand-border/60">
              <span className="text-brand-charcoal-muted">Organization:</span>
              <p className="font-bold text-brand-forest mt-0.5">{siteConfig.name}</p>
            </div>
            <div className="p-3 bg-brand-ivory/50 rounded-lg border border-brand-border/60">
              <span className="text-brand-charcoal-muted">Established:</span>
              <p className="font-bold text-brand-forest mt-0.5">{siteConfig.establishedYear}</p>
            </div>
            <div className="p-3 bg-brand-ivory/50 rounded-lg border border-brand-border/60">
              <span className="text-brand-charcoal-muted">Official Email:</span>
              <p className="font-bold text-brand-forest mt-0.5">{siteConfig.contact.email}</p>
            </div>
            <div className="p-3 bg-brand-ivory/50 rounded-lg border border-brand-border/60">
              <span className="text-brand-charcoal-muted">WhatsApp:</span>
              <p className="font-bold text-brand-forest mt-0.5">{siteConfig.contact.whatsappNumber}</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-growth">
              <CheckCircle2 className="w-4 h-4" />
              Settings updated successfully
            </span>
          ) : (
            <span />
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-brand-growth hover:bg-brand-growth-hover text-white text-sm font-bold shadow-soft transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
