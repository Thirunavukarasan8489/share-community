import React, { Suspense } from "react";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Share Community",
  description: "Administrative dashboard for managing gallery images and lead enquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center font-sans text-ink/70">
          Loading Admin Dashboard...
        </div>
      }
    >
      <AdminDashboardClient />
    </Suspense>
  );
}

