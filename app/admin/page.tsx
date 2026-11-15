import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/adminAuth";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | The Share Community",
  description: "Administrative dashboard for managing gallery images and lead enquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const isAuth = await isAuthenticatedAdmin();

  if (!isAuth) {
    redirect("/admin/login");
  }

  return <AdminDashboardClient />;
}
