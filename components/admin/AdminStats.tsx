"use client";

import React from "react";
import { Images, Mail, Users, Building2, Bell } from "lucide-react";

interface AdminStatsProps {
  stats: {
    gallery: { total: number };
    contacts: { total: number; newCount: number };
    volunteers: { total: number; newCount: number };
    partners: { total: number; newCount: number };
  };
  onSelectTab: (tab: "gallery" | "contacts" | "volunteers" | "partners") => void;
}

export function AdminStats({ stats, onSelectTab }: AdminStatsProps) {
  const cards = [
    {
      id: "gallery" as const,
      title: "Gallery Images",
      count: stats.gallery.total,
      subtitle: "Published authentic photographs",
      icon: Images,
      badge: null,
      accent: "teal",
    },
    {
      id: "contacts" as const,
      title: "Contact Leads",
      count: stats.contacts.total,
      subtitle: `${stats.contacts.newCount} awaiting response`,
      icon: Mail,
      badge: stats.contacts.newCount > 0 ? `${stats.contacts.newCount} New` : null,
      accent: "sun",
    },
    {
      id: "volunteers" as const,
      title: "Volunteer Applications",
      count: stats.volunteers.total,
      subtitle: `${stats.volunteers.newCount} awaiting review`,
      icon: Users,
      badge: stats.volunteers.newCount > 0 ? `${stats.volunteers.newCount} New` : null,
      accent: "leaf",
    },
    {
      id: "partners" as const,
      title: "Partnership Enquiries",
      count: stats.partners.total,
      subtitle: `${stats.partners.newCount} awaiting response`,
      icon: Building2,
      badge: stats.partners.newCount > 0 ? `${stats.partners.newCount} New` : null,
      accent: "coral",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            onClick={() => onSelectTab(c.id)}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-teal-900/10 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                  c.accent === "sun"
                    ? "bg-sun-200/60 text-ink"
                    : c.accent === "leaf"
                    ? "bg-leaf-500/15 text-leaf-500"
                    : c.accent === "coral"
                    ? "bg-coral-500/15 text-coral-500"
                    : "bg-teal-100 text-teal-900"
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {c.badge && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sun-500 text-white shadow-xs animate-bounce">
                  <Bell className="w-3 h-3" />
                  <span>{c.badge}</span>
                </span>
              )}
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-serif font-bold text-ink block tracking-tight">
                {c.count}
              </span>
              <h3 className="font-serif font-bold text-sm sm:text-base text-ink group-hover:text-teal-900 transition-colors mt-1">
                {c.title}
              </h3>
              <p className="text-xs text-ink/65 mt-0.5 font-sans">
                {c.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
