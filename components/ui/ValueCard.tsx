"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  ShieldCheck,
  UserCheck,
  Eye,
  Award,
  HandHeart,
  Users2,
  Sun,
} from "lucide-react";

interface ValueCardProps {
  name: string;
  description: string;
  icon: string;
  accent: string;
  index: number;
}

const iconMap: Record<string, React.ElementType> = {
  Heart,
  ShieldCheck,
  UserCheck,
  Eye,
  Award,
  HandHeart,
  Users2,
  Sun,
};

export function ValueCard({
  name,
  description,
  icon,
  accent,
  index,
}: ValueCardProps) {
  const IconComponent = iconMap[icon] || Heart;

  const accentStyles = {
    coral: "bg-coral-500/15 text-coral-500",
    teal: "bg-teal-600/15 text-teal-900",
    sun: "bg-sun-500/20 text-ink",
    leaf: "bg-leaf-500/15 text-leaf-500",
  }[accent] || "bg-teal-100 text-teal-900";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${accentStyles}`}
        >
          <IconComponent className="w-6 h-6" aria-hidden="true" />
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-2 group-hover:text-teal-900 transition-colors">
          {name}
        </h3>

        <p className="text-ink/80 text-sm sm:text-base leading-relaxed font-sans">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
