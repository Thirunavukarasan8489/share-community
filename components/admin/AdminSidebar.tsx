"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Images,
  Mail,
  Users,
  Building2,
  ExternalLink,
  LogOut,
  X,
  Shield,
  Sparkles,
} from "lucide-react";

export type TabType = "gallery" | "contacts" | "volunteers" | "partners";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  stats?: {
    gallery: { total: number };
    contacts: { total: number; newCount: number };
    volunteers: { total: number; newCount: number };
    partners: { total: number; newCount: number };
  };
}

export function AdminSidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  stats,
}: AdminSidebarProps) {
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

  const navItems = [
    {
      id: "gallery" as const,
      label: "Gallery Management",
      icon: Images,
      description: "Photos & Media",
      count: stats?.gallery?.total ?? 0,
      badge: null,
    },
    {
      id: "contacts" as const,
      label: "Contact Leads",
      icon: Mail,
      description: "Public Enquiries",
      count: stats?.contacts?.total ?? 0,
      badge: stats?.contacts?.newCount && stats.contacts.newCount > 0 ? stats.contacts.newCount : null,
    },
    {
      id: "volunteers" as const,
      label: "Volunteer Leads",
      icon: Users,
      description: "Applicant Profiles",
      count: stats?.volunteers?.total ?? 0,
      badge: stats?.volunteers?.newCount && stats.volunteers.newCount > 0 ? stats.volunteers.newCount : null,
    },
    {
      id: "partners" as const,
      label: "Partner Leads",
      icon: Building2,
      description: "Collaborations",
      count: stats?.partners?.total ?? 0,
      badge: stats?.partners?.newCount && stats.partners.newCount > 0 ? stats.partners.newCount : null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay (Smooth fade) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink/75 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[85vw] lg:sticky lg:top-0 lg:h-screen lg:z-30 bg-teal-900 text-white flex flex-col border-r border-teal-800 shadow-xl lg:shadow-none transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0 lg:w-72 lg:opacity-100"
            : "-translate-x-full lg:w-0 lg:-translate-x-full lg:opacity-0 lg:overflow-hidden lg:pointer-events-none"
        }`}
        aria-label="Admin Navigation Sidebar"
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-teal-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sun-500 text-ink flex items-center justify-center p-2 shadow-sm shrink-0">
              <Image
                src="/logo.png"
                alt="The Share Community"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-serif font-bold text-sm tracking-wide text-white truncate">
                The Share Community
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sun-500 animate-pulse" />
                <span className="text-[11px] font-medium text-teal-100/70 tracking-wider uppercase">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>

          {/* Close button for Mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-teal-100/70 hover:text-white hover:bg-teal-800/60 transition-colors"
            title="Close Sidebar"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold text-teal-100/50 uppercase tracking-widest">
            Main Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`w-full group flex items-center justify-between px-3.5 py-3 rounded-2xl text-left text-xs transition-all duration-200 relative ${
                  isActive
                    ? "bg-teal-800/90 text-white font-bold shadow-xs border-l-4 border-sun-500 pl-3"
                    : "text-teal-100/75 hover:bg-teal-800/50 hover:text-white font-medium"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                      isActive
                        ? "bg-sun-500 text-ink shadow-xs"
                        : "bg-teal-800/60 text-teal-100/80 group-hover:bg-sun-500/20 group-hover:text-sun-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="block truncate text-xs sm:text-sm">
                      {item.label}
                    </span>
                    <span className="block text-[11px] text-teal-100/50 font-normal">
                      {item.description}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  {item.badge !== null ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sun-500 text-ink shadow-xs animate-pulse">
                      {item.badge} New
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-teal-100/40 group-hover:text-teal-100/70">
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {/* Quick Shortcuts Section */}
          <div className="pt-6 px-3 pb-2 text-[10px] font-bold text-teal-100/50 uppercase tracking-widest">
            Public Website
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs text-teal-100/75 hover:bg-teal-800/40 hover:text-white font-medium transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-800/60 flex items-center justify-center text-teal-100/80 shrink-0">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-semibold">View Live Website</span>
                <span className="block text-[10px] text-teal-100/50">
                  Open public home page
                </span>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-sun-500" />
          </Link>
        </div>

        {/* Sidebar Footer User Info & Logout */}
        <div className="p-4 border-t border-teal-800/80 bg-teal-950/40 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-teal-800 text-sun-400 flex items-center justify-center font-bold text-xs shrink-0">
                <Shield className="w-4 h-4 text-sun-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">Administrator</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-teal-100/60">Verified Session</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-teal-800/50 hover:bg-red-500/20 text-teal-100/80 hover:text-red-400 border border-teal-700/50 hover:border-red-500/30 text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
