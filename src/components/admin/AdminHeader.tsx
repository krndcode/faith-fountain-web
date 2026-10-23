"use client";

import React from "react";
import { Menu, Bell, Shield } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
}

export function AdminHeader({ onToggleMobileSidebar }: AdminHeaderProps) {
  const { user, isDemoSession } = useAdminAuth();

  return (
    <header className="h-16 bg-white border-b border-brand-border px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 text-brand-forest hover:bg-brand-ivory rounded-lg"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-serif font-bold text-lg text-brand-forest hidden sm:inline-block">
          Administrator Management Console
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-ivory border border-brand-border text-xs text-brand-forest">
          <Shield className="w-3.5 h-3.5 text-brand-growth" />
          <span className="font-semibold hidden sm:inline">Authorized:</span>
          <span className="font-mono text-brand-charcoal truncate max-w-[150px]">
            {user?.email || (isDemoSession ? "local-admin" : "admin")}
          </span>
        </div>
      </div>
    </header>
  );
}
