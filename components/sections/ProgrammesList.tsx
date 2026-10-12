"use client";

import React, { useState, useEffect } from "react";
import { programmesContent } from "@/content/programmes";
import {
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Utensils,
  Smile,
  Users,
  Briefcase,
} from "lucide-react";

export function ProgrammesList() {
  const { programmes } = programmesContent;
  const [activeId, setActiveId] = useState(programmes[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const prog of programmes) {
        const el = document.getElementById(prog.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(prog.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [programmes]);

  const renderIcon = (id: string) => {
    const iconClass = "w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300 group-hover:scale-105";

    switch (id) {
      case "education-for-all":
        return <GraduationCap className={`${iconClass} text-sun-500`} aria-hidden="true" />;
      case "healthcare-and-wellbeing":
        return <HeartPulse className={`${iconClass} text-coral-500`} aria-hidden="true" />;
      case "food-and-essential-assistance":
        return <Utensils className={`${iconClass} text-leaf-500`} aria-hidden="true" />;
      case "childrens-welfare":
        return <Smile className={`${iconClass} text-sun-500`} aria-hidden="true" />;
      case "community-development":
        return <Users className={`${iconClass} text-teal-600`} aria-hidden="true" />;
      case "livelihood-and-skills-development":
        return <Briefcase className={`${iconClass} text-leaf-500`} aria-hidden="true" />;
      default:
        return <Users className={`${iconClass} text-teal-600`} aria-hidden="true" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Sticky Desktop Side Index */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-2 bg-white p-6 rounded-3xl border border-teal-900/10 shadow-sm">
          <p className="text-xs uppercase tracking-wider font-bold text-teal-900/70 mb-4 px-3">
            Programmes Index
          </p>
          <nav aria-label="Programmes quick navigation" className="space-y-1">
            {programmes.map((prog) => {
              const isCurrent = activeId === prog.id;
              return (
                <a
                  key={prog.id}
                  href={`#${prog.id}`}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isCurrent
                      ? "bg-teal-900 text-white font-semibold shadow-xs"
                      : "text-ink/75 hover:bg-teal-900/5 hover:text-ink"
                  }`}
                >
                  <span className="truncate">{prog.title}</span>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isCurrent ? "translate-x-1 text-sun-500" : "opacity-40"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Programme Blocks */}
        <div className="lg:col-span-8 space-y-14 lg:space-y-20">
          {programmes.map((prog, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <section
                key={prog.id}
                id={prog.id}
                className="scroll-mt-32 group relative bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-teal-900/10 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center ${
                    isReversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Column */}
                  <div
                    className={`md:col-span-8 space-y-4 ${
                      isReversed ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                      {prog.title}
                    </h2>

                    <p className="font-serif italic text-teal-600 text-lg font-medium">
                      {prog.subLine}
                    </p>

                    <div className="space-y-3 pt-2 text-ink/85 text-base sm:text-lg leading-relaxed font-sans">
                      {prog.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>

                  {/* Icon Column */}
                  <div
                    className={`md:col-span-4 flex items-center justify-center ${
                      isReversed ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    <div
                      className={`w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-6 border flex items-center justify-center shadow-xs transition-colors ${
                        prog.accent === "sun"
                          ? "bg-sun-200/40 border-sun-500/30"
                          : prog.accent === "coral"
                          ? "bg-coral-500/10 border-coral-500/30"
                          : prog.accent === "leaf"
                          ? "bg-leaf-500/10 border-leaf-500/30"
                          : "bg-teal-100/50 border-teal-600/30"
                      }`}
                    >
                      {renderIcon(prog.id)}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
