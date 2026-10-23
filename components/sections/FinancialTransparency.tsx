"use client";

import React from "react";
import { donateContent } from "@/content/pages";
import { ShieldCheck, Scale, FileCheck, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export function FinancialTransparency() {
  const { transparency } = donateContent;

  const items = [
    {
      text: transparency.paragraphs[0],
      icon: ShieldCheck,
      accent: "teal",
    },
    {
      text: transparency.paragraphs[1],
      icon: Scale,
      accent: "sun",
    },
    {
      text: transparency.paragraphs[2],
      icon: FileCheck,
      accent: "leaf",
    },
    {
      text: transparency.paragraphs[3],
      icon: HeartHandshake,
      accent: "coral",
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-teal-900/10"
      aria-labelledby="financial-transparency-heading"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
          </div>

          <h2
            id="financial-transparency-heading"
            className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-3 tracking-tight"
          >
            {transparency.title}
          </h2>

          <p className="font-serif italic text-teal-600 text-lg sm:text-xl font-medium">
            {transparency.subTitle}
          </p>
        </div>

        {/* 4 Structured Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="bg-cream/60 rounded-3xl p-6 sm:p-8 border border-teal-900/10 shadow-xs flex flex-col justify-start hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0 ${
                    item.accent === "teal"
                      ? "bg-teal-100 text-teal-900"
                      : item.accent === "sun"
                      ? "bg-sun-200 text-ink"
                      : item.accent === "leaf"
                      ? "bg-leaf-500/15 text-leaf-500"
                      : "bg-coral-500/15 text-coral-500"
                  }`}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>

                <p className="text-base sm:text-lg text-ink/85 leading-relaxed font-sans">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
