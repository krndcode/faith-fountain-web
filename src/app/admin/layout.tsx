"use client";

import React, { useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-ivory">
        <Loader2 className="w-10 h-10 text-brand-growth animate-spin mb-3" />
        <p className="text-sm font-semibold text-brand-forest">
          Checking administrator authorization...
        </p>
      </div>
    );
  }

  // If on login page, just render the login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not logged in and not on login page, redirect
  if (!isAdmin) {
    router.replace("/admin/login");
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
        <p className="text-sm text-brand-charcoal-muted">
          Redirecting to administrator sign in...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-brand-ivory/40">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="fixed inset-y-0 w-64">
          <AdminSidebar />
        </div>
      </div>

      {/* Mobile Sidebar Backdrop & Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-forest/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-forest transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onCloseMobile={() => setMobileOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleMobileSidebar={() => setMobileOpen(!mobileOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </AdminAuthProvider>
  );
}
