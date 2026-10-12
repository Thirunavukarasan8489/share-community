"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subTitle?: string;
  highlightWord?: string;
  align?: "left" | "center";
  isDark?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subTitle,
  highlightWord,
  align = "center",
  isDark = false,
  className = "",
}: SectionHeadingProps) {
  const parts = highlightWord ? title.split(new RegExp(`(${highlightWord})`, "gi")) : [title];

  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "text-left max-w-3xl"
      } ${className}`}
    >
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {parts.map((part, index) => {
          const isHighlight =
            highlightWord && part.toLowerCase() === highlightWord.toLowerCase();

          if (isHighlight) {
            return (
              <span key={index} className="relative inline-block text-sun-500">
                {part}
                <motion.svg
                  className="absolute left-0 -bottom-1.5 w-full h-2.5 pointer-events-none"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 9 C 25 3, 75 11, 98 4"
                    fill="none"
                    stroke="#F5A524"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </h2>

      {subTitle && (
        <p
          className={`text-lg sm:text-xl font-serif italic ${
            isDark ? "text-teal-100/90" : "text-teal-600"
          }`}
        >
          {subTitle}
        </p>
      )}
    </div>
  );
}
