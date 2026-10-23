"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { formatCurrency } from "@/lib/utils";
import { PayPalCheckout } from "./PayPalCheckout";
import {
  Heart,
  CheckCircle2,
  AlertCircle,
  Package,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export function DonationForm() {
  const [selectedCurrency, setSelectedCurrency] = useState("CAD");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  // Flow states
  const [checkoutStep, setCheckoutStep] = useState<"select" | "checkout" | "success" | "cancelled">("select");
  const [successDetails, setSuccessDetails] = useState<{
    orderId: string;
    captureId: string;
    amount: number;
    currency: string;
  } | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
    setInputError(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    setIsCustom(true);
    setInputError(null);
  };

  const handleProceedToPayment = () => {
    if (isNaN(effectiveAmount) || effectiveAmount <= 0) {
      setInputError("Please select or enter a valid donation amount.");
      return;
    }
    if (effectiveAmount < 1) {
      setInputError("Minimum donation amount is 1.00.");
      return;
    }
    if (effectiveAmount > 10000) {
      setInputError("For gifts above 10,000, please contact our team directly for wire arrangements.");
      return;
    }

    setInputError(null);
    setGeneralError(null);
    setCheckoutStep("checkout");
  };

  const handleSuccess = (details: {
    orderId: string;
    captureId: string;
    amount: number;
    currency: string;
  }) => {
    setSuccessDetails(details);
    setCheckoutStep("success");
  };

  const handleCancel = () => {
    setCheckoutStep("cancelled");
  };

  const handleReset = () => {
    setCheckoutStep("select");
    setSuccessDetails(null);
    setGeneralError(null);
    setInputError(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-soft">
      {/* SUCCESS CONFIRMATION STATE */}
      {checkoutStep === "success" && successDetails && (
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-growth flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-growth-soft text-brand-growth">
              Payment Verified
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-forest">
              Thank You for Your Generosity!
            </h2>
            <p className="text-brand-charcoal-muted max-w-lg mx-auto text-sm leading-relaxed">
              Your charitable gift has been securely received. Because of your compassion, we can continue delivering learning materials, supporting residential care, easing hospital bills, and sharing Christ’s hope.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="max-w-md mx-auto p-5 bg-brand-ivory rounded-xl border border-brand-border text-left space-y-2.5 text-xs text-brand-charcoal">
            <div className="flex justify-between border-b border-brand-border/60 pb-2">
              <span className="text-brand-charcoal-muted">Donation Amount:</span>
              <span className="font-bold text-brand-forest text-sm">
                {formatCurrency(successDetails.amount, successDetails.currency)}
              </span>
            </div>
            <div className="flex justify-between border-b border-brand-border/60 pb-2">
              <span className="text-brand-charcoal-muted">Payment Processor:</span>
              <span className="font-medium text-brand-forest">PayPal Checkout</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/60 pb-2">
              <span className="text-brand-charcoal-muted">Transaction Reference:</span>
              <span className="font-mono text-brand-charcoal break-all">
                {successDetails.captureId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-charcoal-muted">Beneficiary:</span>
              <span className="font-medium text-brand-forest">
                Faith Fountain Foundation
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg border border-brand-forest text-brand-forest hover:bg-brand-forest/5 font-semibold text-sm transition-colors"
            >
              Make Another Donation
            </button>
            <Link
              href="/impact"
              className="px-6 py-2.5 rounded-lg bg-brand-growth text-white hover:bg-brand-growth-hover font-semibold text-sm transition-colors"
            >
              Explore Our Impact
            </Link>
          </div>
        </div>
      )}

      {/* CANCELLED STATE */}
      {checkoutStep === "cancelled" && (
        <div className="text-center py-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-forest">
            Donation Cancelled
          </h3>
          <p className="text-sm text-brand-charcoal-muted max-w-md mx-auto">
            The PayPal checkout window was closed before completion. No payment has been deducted.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-forest text-white hover:bg-brand-forest-light text-sm font-semibold transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Return to Donation Form
          </button>
        </div>
      )}

      {/* SELECTION OR CHECKOUT STEP */}
      {(checkoutStep === "select" || checkoutStep === "checkout") && (
        <div className="space-y-8">
          {generalError && (
            <div
              role="alert"
              className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{generalError}</span>
            </div>
          )}

          {/* 1. Currency Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="currencySelect"
                className="block text-sm font-bold text-brand-forest uppercase tracking-wider"
              >
                1. Select Currency
              </label>
              <span className="text-xs text-brand-charcoal-muted">
                Canada &amp; International
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {siteConfig.paypalCurrencies.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelectedCurrency(c.code)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-semibold transition-all ${
                    selectedCurrency === c.code
                      ? "bg-brand-forest text-white border-brand-forest shadow-sm ring-2 ring-brand-forest/20"
                      : "bg-white text-brand-charcoal border-brand-border hover:bg-brand-ivory"
                  }`}
                >
                  {c.code} ({c.symbol})
                </button>
              ))}
            </div>
          </div>

          {/* 2. Amount Selection */}
          <div>
            <label className="block text-sm font-bold text-brand-forest uppercase tracking-wider mb-3">
              2. Select Donation Amount
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
              {siteConfig.defaultDonationAmounts.map((amt) => {
                const isSelected = !isCustom && selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleAmountSelect(amt)}
                    className={`py-3 px-2 rounded-xl border text-base font-bold transition-all ${
                      isSelected
                        ? "bg-brand-growth text-white border-brand-growth shadow-md scale-[1.02]"
                        : "bg-white text-brand-forest border-brand-border hover:bg-brand-ivory"
                    }`}
                  >
                    {formatCurrency(amt, selectedCurrency)}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Field */}
            <div className="relative">
              <div className="relative rounded-xl border border-brand-border focus-within:ring-2 focus-within:ring-brand-growth focus-within:border-brand-growth bg-white">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-charcoal-muted font-bold text-sm">
                  {selectedCurrency} $
                </span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  step="any"
                  value={customAmount}
                  onChange={handleCustomChange}
                  placeholder="Or enter custom amount"
                  className="w-full pl-20 pr-4 py-3 rounded-xl text-sm font-medium text-brand-charcoal focus:outline-none"
                />
              </div>
              {inputError && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {inputError}
                </p>
              )}
            </div>
          </div>

          {/* Impact Statement Box */}
          <div className="p-4 bg-brand-growth-soft/50 rounded-xl border border-brand-growth/20 text-xs text-brand-forest space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-growth" />
              100% Faithful Stewardship
            </p>
            <p className="leading-relaxed text-brand-charcoal-muted">
              Donations directly fund school supplies for children, food and care packages for Happy Home Orphanage, hospital discharge relief, and community outreach.
            </p>
          </div>

          {/* 3. Checkout Action or PayPal Buttons */}
          {checkoutStep === "select" ? (
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="w-full py-3.5 px-6 rounded-xl bg-brand-growth hover:bg-brand-growth-hover text-white font-bold text-base shadow-soft hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              Proceed with {formatCurrency(effectiveAmount, selectedCurrency)}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="space-y-4 pt-2 border-t border-brand-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-brand-charcoal-muted">Donation Amount:</p>
                  <p className="text-2xl font-serif font-bold text-brand-forest">
                    {formatCurrency(effectiveAmount, selectedCurrency)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutStep("select")}
                  className="text-xs font-semibold text-brand-growth hover:underline"
                >
                  Change Amount
                </button>
              </div>

              <PayPalCheckout
                amount={effectiveAmount}
                currency={selectedCurrency}
                onSuccess={handleSuccess}
                onError={(err) => setGeneralError(err)}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* In-Kind Items Donation Banner */}
          <div className="pt-6 border-t border-brand-border flex items-start gap-3 text-xs text-brand-charcoal-muted">
            <Package className="w-5 h-5 text-brand-growth shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-forest">
                Prefer to Donate School Supplies or Physical Items?
              </p>
              <p className="mt-0.5 leading-relaxed">
                We accept books, school uniforms, bags, footwear, exercise books, and stationery.{" "}
                <Link
                  href="/get-involved"
                  className="text-brand-growth font-semibold underline hover:text-brand-growth-hover"
                >
                  Learn how to donate items here &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
