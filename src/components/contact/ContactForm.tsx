"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validation/contact";
import { PrimaryButton } from "../common/PrimaryButton";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import Link from "next/link";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
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
            Message Sent Successfully
          </h3>
          <p className="text-sm text-brand-charcoal leading-relaxed">
            {successMessage}
          </p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="mt-4 text-xs font-semibold text-brand-growth underline hover:text-brand-growth-hover"
          >
            Send another message
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
                htmlFor="name"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
                }`}
                placeholder="e.g. Samuel Mensah"
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
                htmlFor="email"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
                }`}
                placeholder="e.g. samuel@example.com"
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
                htmlFor="phone"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Telephone Number{" "}
                <span className="text-xs font-normal text-brand-charcoal-muted">
                  (Optional)
                </span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth focus:border-brand-growth transition-all"
                placeholder="+233 50 000 0000"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-semibold text-brand-forest mb-1.5"
              >
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                aria-required="true"
                aria-invalid={errors.subject ? "true" : "false"}
                {...register("subject")}
                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                  errors.subject
                    ? "border-red-400 focus:ring-red-400"
                    : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
                }`}
                placeholder="Inquiry regarding education support"
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-brand-forest mb-1.5"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              aria-required="true"
              aria-invalid={errors.message ? "true" : "false"}
              {...register("message")}
              className={`w-full px-4 py-3 rounded-lg border text-sm text-brand-charcoal focus:outline-none focus:ring-2 transition-all ${
                errors.message
                  ? "border-red-400 focus:ring-red-400"
                  : "border-brand-border focus:ring-brand-growth focus:border-brand-growth"
              }`}
              placeholder="Please share your inquiry or how you would like to connect with Faith Fountain Foundation..."
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
                id="privacyConsent"
                type="checkbox"
                aria-required="true"
                {...register("privacyConsent")}
                className="mt-1 w-4 h-4 rounded border-brand-border text-brand-growth focus:ring-brand-growth focus:ring-2 cursor-pointer"
              />
              <label
                htmlFor="privacyConsent"
                className="text-xs text-brand-charcoal leading-relaxed cursor-pointer"
              >
                I agree to Faith Fountain Foundation storing and processing my
                contact details in accordance with the{" "}
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

          {/* Submit Button */}
          <PrimaryButton
            type="submit"
            variant="growth"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </PrimaryButton>
        </form>
      )}
    </div>
  );
}
