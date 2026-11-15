"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  PanelLeftClose,
  PanelLeft,
  ExternalLink,
  RefreshCw,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { TabType } from "./AdminSidebar";

interface AdminTopBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  activeTab: TabType;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const tabMeta: Record<TabType, { title: string; subtitle: string }> = {
  gallery: {
    title: "Gallery Management",
    subtitle: "Manage authentic community photographs & Cloudinary uploads",
  },
  contacts: {
    title: "Contact Form Leads",
    subtitle: "Enquiries and messages sent via the public contact form",
  },
  volunteers: {
    title: "Volunteer Applications",
    subtitle: "Review community members offering time, knowledge, and skills",
  },
  partners: {
    title: "Partnership Enquiries",
    subtitle: "Organisations, businesses, and groups seeking to collaborate",
  },
};

export function AdminTopBar({
  isSidebarOpen,
  onToggleSidebar,
  activeTab,
  onRefresh,
  isRefreshing,
}: AdminTopBarProps) {
  const router = useRouter();
  const current = tabMeta[activeTab];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-ink/10 shadow-xs">
      <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Hamburger menu toggle + Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 sm:p-2.5 rounded-xl bg-cream hover:bg-cream/80 text-ink/80 hover:text-ink border border-ink/10 transition-all focus:outline-none focus:ring-2 focus:ring-sun-500/40"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-label="Toggle Navigation Sidebar"
          >
            {/* Show PanelLeft/PanelLeftClose on desktop, Menu on mobile */}
            <span className="hidden lg:inline-block">
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-ink" />
              ) : (
                <PanelLeft className="w-4 h-4 text-sun-500" />
              )}
            </span>
            <span className="lg:hidden inline-block">
              <Menu className="w-5 h-5 text-ink" />
            </span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink/40 uppercase tracking-wider">
              <span>Admin</span>
              <ChevronRight className="w-3 h-3 text-ink/30" />
              <span className="text-sun-500 font-bold">{current.title}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-ink truncate font-serif">
              {current.title}
            </h1>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Refresh data button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh dashboard stats"
              className="p-2 sm:p-2.5 rounded-xl bg-cream hover:bg-cream/80 text-ink/70 hover:text-ink border border-ink/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-sun-500" : ""}`}
              />
            </button>
          )}

          {/* Quick link to public website */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cream hover:bg-cream/80 text-ink/80 hover:text-ink border border-ink/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
            <span>View Website</span>
          </Link>

          {/* Database indicator pill */}
          <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MongoDB Connected</span>
          </div>

          {/* Quick Logout for mobile/tablet */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 sm:p-2.5 rounded-xl bg-cream hover:bg-red-500/10 text-ink/60 hover:text-red-600 border border-ink/10 transition-colors"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
