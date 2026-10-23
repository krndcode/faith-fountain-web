import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "growth" | "forest" | "white";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({
  href,
  variant = "growth",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-base gap-2",
    lg: "px-7 py-3.5 text-lg font-semibold gap-2.5 shadow-soft",
  };

  const variantStyles = {
    growth:
      "bg-brand-growth text-white hover:bg-brand-growth-hover focus-visible:ring-brand-growth shadow-sm hover:shadow",
    forest:
      "bg-brand-forest text-white hover:bg-brand-forest-light focus-visible:ring-brand-forest shadow-sm hover:shadow",
    white:
      "bg-white text-brand-forest hover:bg-brand-ivory focus-visible:ring-white shadow-soft",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
