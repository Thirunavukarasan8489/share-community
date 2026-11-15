"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar, TabType } from "./AdminSidebar";
import { AdminTopBar } from "./AdminTopBar";
import { AdminStats } from "./AdminStats";
import { GalleryManager } from "./GalleryManager";
import ContactLeads from "./ContactLeads";
import VolunteerLeads from "./VolunteerLeads";
import PartnerLeads from "./PartnerLeads";

interface StatsData {
  gallery: { total: number };
  contacts: { total: number; newCount: number };
  volunteers: { total: number; newCount: number };
  partners: { total: number; newCount: number };
}

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("gallery");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<StatsData>({
    gallery: { total: 0 },
    contacts: { total: 0, newCount: 0 },
    volunteers: { total: 0, newCount: 0 },
    partners: { total: 0, newCount: 0 },
  });

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Authenticate on mount
  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setIsCheckingAuth(false);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  // Responsive initialisation: default closed on mobile, open on desktop
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkWidth();
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, activeTab]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-3 border-teal-600 border-t-sun-500 rounded-full animate-spin mb-4" />
        <p className="text-ink/70 font-sans text-sm font-medium">Verifying admin session...</p>
      </div>
    );
  }

  return (
    <div className="h-screen h-[100dvh] bg-cream/70 flex text-ink font-sans overflow-hidden">
      {/* Responsive Slide-in / Collapsible Fixed Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
      />

      {/* Main Content Area (Fixed layout, internal scroll) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 transition-all duration-300 ease-in-out">
        {/* Admin Top Bar with Hamburger menu & Active status (Fixed at top) */}
        <AdminTopBar
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          activeTab={activeTab}
          onRefresh={fetchStats}
          isRefreshing={isRefreshing}
        />

        {/* Dedicated Scrollable Workspace Container */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-contain flex flex-col min-h-0"
        >
          {/* Inner Content */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-7">
            {/* Interactive KPI / Metric Summary Cards */}
            <AdminStats stats={stats} onSelectTab={setActiveTab} />

            {/* Active Tab Panel */}
            <div className="mt-2">
              {activeTab === "gallery" && (
                <GalleryManager onStatsChange={fetchStats} />
              )}
              {activeTab === "contacts" && <ContactLeads />}
              {activeTab === "volunteers" && <VolunteerLeads />}
              {activeTab === "partners" && <PartnerLeads />}
            </div>
          </main>

          {/* Clean Admin Footer */}
          <footer className="border-t border-ink/10 py-5 bg-white/70 text-center text-xs text-ink/60 mt-auto shrink-0">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <p>© 2026 The Share Community. Admin Control Centre.</p>
              <div className="flex items-center gap-3 text-ink/70">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  MongoDB Live
                </span>
                <span>•</span>
                <span className="text-teal-900 font-medium">Authorised Session</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
