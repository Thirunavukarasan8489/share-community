"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink, Shield } from "lucide-react";

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: "gallery" | "contacts" | "volunteers" | "partners") => void;
  stats?: {
    gallery: { total: number };
    contacts: { total: number; newCount: number };
    volunteers: { total: number; newCount: number };
    partners: { total: number; newCount: number };
  };
}

export function AdminHeader({
  activeTab,
  setActiveTab,
  stats,
}: AdminHeaderProps) {
  const router = useRouter();

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
    <header className="bg-teal-900 text-white border-b border-teal-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3.5 border-b border-teal-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sun-500 text-ink flex items-center justify-center p-1.5 shadow-xs">
              <Image
                src="/logo.png"
                alt="The Share Community"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-sm sm:text-base tracking-tight block">
                The Share Community
              </span>
              <span className="text-[10px] sm:text-xs text-teal-100/70 font-sans flex items-center gap-1">
                <Shield className="w-3 h-3 text-sun-500" />
                <span>Admin Control Center</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-teal-100 transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-500/20 hover:bg-coral-500/30 text-white text-xs font-semibold border border-coral-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3 h-3 text-coral-500" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav
          className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto scrollbar-none"
          aria-label="Admin Navigation Tabs"
        >
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "gallery"
                ? "bg-sun-500 text-white shadow-xs"
                : "text-teal-100/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🖼️ Gallery Manager</span>
            {stats && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-teal-950/40 text-white font-bold">
                {stats.gallery.total}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "contacts"
                ? "bg-sun-500 text-white shadow-xs"
                : "text-teal-100/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>📩 Contact Leads</span>
            {stats && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  stats.contacts.newCount > 0
                    ? "bg-coral-500 text-white animate-pulse"
                    : "bg-teal-950/40 text-white"
                }`}
              >
                {stats.contacts.newCount > 0
                  ? `${stats.contacts.newCount} new`
                  : stats.contacts.total}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("volunteers")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "volunteers"
                ? "bg-sun-500 text-white shadow-xs"
                : "text-teal-100/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🤝 Volunteer Leads</span>
            {stats && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  stats.volunteers.newCount > 0
                    ? "bg-coral-500 text-white animate-pulse"
                    : "bg-teal-950/40 text-white"
                }`}
              >
                {stats.volunteers.newCount > 0
                  ? `${stats.volunteers.newCount} new`
                  : stats.volunteers.total}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("partners")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "partners"
                ? "bg-sun-500 text-white shadow-xs"
                : "text-teal-100/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>🏢 Partner Leads</span>
            {stats && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  stats.partners.newCount > 0
                    ? "bg-coral-500 text-white animate-pulse"
                    : "bg-teal-950/40 text-white"
                }`}
              >
                {stats.partners.newCount > 0
                  ? `${stats.partners.newCount} new`
                  : stats.partners.total}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
