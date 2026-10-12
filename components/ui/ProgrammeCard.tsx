"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Utensils,
  Smile,
  Users,
  Briefcase,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface ProgrammeCardProps {
  id: string;
  title: string;
  description: string;
  accent: "sun" | "coral" | "leaf" | "teal";
  icon: string;
  index: number;
}

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  HeartPulse,
  Utensils,
  Smile,
  Users,
  Briefcase,
  ShieldAlert,
};

export function ProgrammeCard({
  id,
  title,
  description,
  accent,
  icon,
  index,
}: ProgrammeCardProps) {
  const IconComponent = iconMap[icon] || Users;

  const accentStyles = {
    sun: {
      iconBg: "bg-sun-500/15 text-sun-500 border-sun-500/30",
      borderHover: "hover:border-sun-500/40",
      barBg: "bg-sun-500",
    },
    coral: {
      iconBg: "bg-coral-500/15 text-coral-500 border-coral-500/30",
      borderHover: "hover:border-coral-500/40",
      barBg: "bg-coral-500",
    },
    leaf: {
      iconBg: "bg-leaf-500/15 text-leaf-500 border-leaf-500/30",
      borderHover: "hover:border-leaf-500/40",
      barBg: "bg-leaf-500",
    },
    teal: {
      iconBg: "bg-teal-600/15 text-teal-600 border-teal-600/30",
      borderHover: "hover:border-teal-600/40",
      barBg: "bg-teal-600",
    },
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative bg-white rounded-3xl p-6 sm:p-8 border border-teal-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between ${accentStyles.borderHover}`}
    >
      <div>
        {/* Accent bar */}
        <div className={`w-10 h-1 rounded-full mb-6 ${accentStyles.barBg}`} />

        {/* Icon Tile */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-6 transition-colors ${accentStyles.iconBg}`}
        >
          <IconComponent className="w-6 h-6" aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-3 tracking-tight group-hover:text-teal-900 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          {description}
        </p>
      </div>

      {/* Link to programmes */}
      <Link
        href={`/programmes#${id}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 group-hover:text-ink transition-colors mt-auto pt-4 border-t border-teal-900/5"
      >
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
