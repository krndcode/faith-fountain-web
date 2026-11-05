"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  Lock,
  Mail,
  KeyRound,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Terminal,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, loginDemoAdmin, isFirebaseReady } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(
        err.message || "Invalid credentials or unauthorized administrator email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAccess = () => {
    loginDemoAdmin();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-brand-forest flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-growth/20 via-transparent to-transparent pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="flex justify-center mb-6">
          <BrandLogo variant="footer" href="/" />
        </div>

        <div className="bg-white py-8 px-6 shadow-elevated rounded-2xl sm:px-10 border border-brand-border">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-growth-soft text-brand-growth flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-forest">
              Administrator Access
            </h2>
            <p className="text-xs text-brand-charcoal-muted mt-1">
              Authorized personnel portal for Faith Fountain Foundation
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5 text-xs text-red-800"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative rounded-lg border border-brand-border focus-within:ring-2 focus-within:ring-brand-growth focus-within:border-brand-growth">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-charcoal-muted">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="faithfountain2022@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-brand-charcoal focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-pass"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-lg border border-brand-border focus-within:ring-2 focus-within:ring-brand-growth focus-within:border-brand-growth">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-charcoal-muted">
                  <KeyRound className="w-4 h-4" />
                </span>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm text-brand-charcoal focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-lg bg-brand-growth hover:bg-brand-growth-hover text-white font-bold text-sm shadow-soft transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Development / Testing Option */}
          <div className="mt-6 pt-6 border-t border-brand-border text-center space-y-3">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="text-xs font-semibold text-brand-forest hover:text-brand-growth underline"
            >
              Enter Local Test Session (Development Preview)
            </button>
            <p className="text-[11px] text-brand-charcoal-muted">
              Explore dashboard workflows before adding Firebase keys.
            </p>
          </div>

          {/* Initial Administrator Setup Instructions Toggle */}
          <div className="mt-6 pt-4 border-t border-brand-border/60">
            <button
              type="button"
              onClick={() => setShowSetupGuide(!showSetupGuide)}
              className="w-full flex items-center justify-between text-xs font-semibold text-brand-charcoal-muted hover:text-brand-forest"
            >
              <span>First Time Setup Instructions</span>
              {showSetupGuide ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showSetupGuide && (
              <div className="mt-3 p-3 bg-brand-ivory rounded-lg border border-brand-border text-left text-xs text-brand-charcoal space-y-2">
                <p className="font-semibold text-brand-forest flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-brand-growth" />
                  How to provision initial admin:
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-[11px] text-brand-charcoal-muted">
                  <li>Open the Firebase Console &rarr; Authentication &rarr; Users.</li>
                  <li>Click &ldquo;Add User&rdquo; and enter the authorized foundation email (e.g. <code className="text-brand-forest">faithfountain2022@gmail.com</code>).</li>
                  <li>Set a secure password.</li>
                  <li>Enter those credentials here to access live management.</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-white/70 hover:text-white transition-colors"
          >
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
