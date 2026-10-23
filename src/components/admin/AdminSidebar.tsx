"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Mail,
  HeartHandshake,
  Settings,
  ExternalLink,
  LogOut,
  ShieldAlert,
} from "lucide-react";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, isDemoSession, user } = useAdminAuth();

  const navLinks = [
    { title: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { title: "News & Stories", href: "/admin/stories", icon: FileText },
    { title: "Our Programs", href: "/admin/programs", icon: FolderTree },
    { title: "Inquiries Inbox", href: "/admin/inquiries", icon: Mail },
    { title: "Donation Records", href: "/admin/donations", icon: HeartHandshake },
    { title: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-brand-forest text-white flex flex-col h-full border-r border-brand-growth/20">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/images/logo-white.svg"
            alt="Faith Fountain Admin"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {isDemoSession && (
        <div className="mx-4 mt-3 p-2 bg-amber-500/20 border border-amber-400/30 rounded text-[11px] text-amber-200 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          <span>Local Demo Session Active</span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand-growth text-white shadow-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info & Sign Out */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="text-xs text-white/70">
          <p className="font-semibold text-white truncate">
            {user?.email || (isDemoSession ? "local-admin@faithfountain.org" : "Administrator")}
          </p>
          <p className="text-[10px] text-emerald-300">Faith Fountain Foundation</p>
        </div>

        <div className="space-y-1.5 pt-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/80 hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            type="button"
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-300 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
