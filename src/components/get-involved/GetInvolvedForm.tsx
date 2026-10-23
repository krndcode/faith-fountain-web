"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getInvolvedFormSchema,
  GetInvolvedFormData,
} from "@/lib/validation/contact";
import { PrimaryButton } from "../common/PrimaryButton";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import Link from "next/link";

interface GetInvolvedFormProps {
  defaultArea?: GetInvolvedFormData["areaOfInterest"];
}

export function GetInvolvedForm({
  defaultArea = "volunteer",
}: GetInvolvedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GetInvolvedFormData>({
    resolver: zodResolver(getInvolvedFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      areaOfInterest: defaultArea,
      message: "",
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: GetInvolvedFormData) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/get-involved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry");
      }

      setSuccessMessage(result.message);
      reset();
    } catch (err: any) {
      setErrorMessage(
        err.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-soft">
      {successMessage ? (
        <div
          role="alert"
          className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3"
        >
          <CheckCircle2 className="w-12 h-12 text-brand-growth mx-auto" />
          <h3 className="font-serif text-xl font-bold text-brand-forest">
            Inquiry Received
          </h3>
          <p className="text-sm text-brand-charcoal leading-relaxed">
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="mt-4 text-xs font-semibold text-brand-growth underline hover:text-brand-growth-hover"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {errorMessage && (
            <div
              role="alert"
              className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800 text-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="gi-name"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="gi-name"
                type="text"
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
                }`}
                placeholder="e.g. Kwesi Arthur"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="gi-email"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="gi-email"
                type="email"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
                }`}
                placeholder="e.g. kwesi@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Telephone Number */}
            <div>
              <label
                htmlFor="gi-phone"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Telephone Number{" "}
                <span className="text-xs font-normal text-brand-charcoal-muted">
                  (Optional)
                </span>
              </label>
              <input
                id="gi-phone"
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth focus:border-brand-growth transition-all"
                placeholder="+233 24 000 0000"
              />
            </div>

            {/* Area of Interest */}
            <div>
              <label
                htmlFor="gi-area"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Area of Interest <span className="text-red-500">*</span>
              </label>
              <select
                id="gi-area"
                {...register("areaOfInterest")}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth focus:border-brand-growth transition-all bg-white"
              >
                <option value="volunteer">Volunteer With Our Team</option>
                <option value="donate-items">Donate Physical Items (Books, Uniforms, Supplies)</option>
                <option value="partner">Partner as Church or Organization</option>
                <option value="donate-money">Financial Giving &amp; Inquiries</option>
                <option value="general-inquiry">General Inquiry</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="gi-message"
              className="block text-sm font-semibold text-brand-forest mb-1.5"
            >
              How would you like to participate or support?{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="gi-message"
              rows={4}
              aria-required="true"
              aria-invalid={errors.message ? "true" : "false"}
              {...register("message")}
              className={`w-full px-4 py-3 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                errors.message
                  ? "border-red-400 focus:ring-red-400"
                  : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
              }`}
              placeholder="Tell us about the items you wish to donate, your volunteer skills, or your partnership vision..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Privacy Consent */}
          <div className="space-y-1">
            <div className="flex items-start gap-2.5">
              <input
                id="gi-privacyConsent"
                type="checkbox"
                aria-required="true"
                {...register("privacyConsent")}
                className="mt-1 w-4 h-4 rounded border-brand-border text-brand-growth focus:ring-brand-growth focus:ring-2 cursor-pointer"
              />
              <label
                htmlFor="gi-privacyConsent"
                className="text-xs text-brand-charcoal leading-relaxed cursor-pointer"
              >
                I agree to Faith Fountain Foundation holding my contact details
                to respond to this inquiry in accordance with the{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-brand-growth underline hover:text-brand-growth-hover"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            {errors.privacyConsent && (
              <p className="text-xs text-red-600 font-medium pl-6">
                {errors.privacyConsent.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <PrimaryButton
            type="submit"
            variant="growth"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Submitting Inquiry...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Participation Inquiry
              </>
            )}
          </PrimaryButton>
        </form>
      )}
    </div>
  );
}
