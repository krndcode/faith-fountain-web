import React from "react";
import { Loader2, AlertCircle, Inbox, RefreshCw } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { cn } from "@/lib/utils";

export function LoadingState({
  message = "Loading information...",
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <Loader2 className="w-10 h-10 text-brand-growth animate-spin mb-4" />
      <p className="text-sm font-medium text-brand-charcoal-muted">{message}</p>
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an issue while retrieving information. Please try again or reach out to our team.",
  onRetry,
  className,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-xl font-bold text-brand-forest mb-2">
        {title}
      </h3>
      <p className="text-sm text-brand-charcoal-muted leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <PrimaryButton variant="forest" size="sm" onClick={onRetry}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </PrimaryButton>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No records found",
  message = "There are currently no items to display in this category.",
  actionHref,
  actionLabel,
  className,
}: {
  title?: string;
  message?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-brand-ivory text-brand-forest flex items-center justify-center mb-4 border border-brand-border">
        <Inbox className="w-6 h-6 text-brand-charcoal-muted" />
      </div>
      <h3 className="font-serif text-xl font-bold text-brand-forest mb-2">
        {title}
      </h3>
      <p className="text-sm text-brand-charcoal-muted leading-relaxed mb-6">
        {message}
      </p>
      {actionHref && actionLabel && (
        <PrimaryButton href={actionHref} variant="growth" size="sm">
          {actionLabel}
        </PrimaryButton>
      )}
    </div>
  );
}
