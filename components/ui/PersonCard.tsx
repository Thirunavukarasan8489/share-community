"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface PersonCardProps {
  name: string;
  role: string;
  paragraphs: string[];
  imagePath: string;
  initials: string;
}

export function PersonCard({
  name,
  role,
  paragraphs,
  imagePath,
  initials,
}: PersonCardProps) {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-teal-900/10 shadow-xs overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Portrait Column */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { clipPath: "inset(0% 0% 100% 0%)" }
            }
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-sun-200/50 border-2 border-teal-900/15 flex items-center justify-center shadow-xs"
          >
            {!imageError ? (
              <Image
                src={imagePath}
                alt={`${name}`}
                fill
                loading="eager"
                sizes="(max-width: 640px) 192px, 224px"
                className="object-cover p-1 rounded-2xl"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4">
                <span className="font-serif text-3xl font-bold text-teal-900 tracking-wider">
                  {initials}
                </span>
                <span className="text-xs uppercase tracking-wider text-teal-600 font-semibold mt-2">
                  {role}
                </span>
              </div>
            )}

            {/* Fallback Dignified Initials Avatar */}
            {/* {imageError && (
              <div className="flex flex-col items-center justify-center p-4">
                <span className="font-serif text-3xl font-bold text-teal-900 tracking-wider">
                  {initials}
                </span>
                <span className="text-xs uppercase tracking-wider text-teal-600 font-semibold mt-2">
                  {role}
                </span>
              </div>
            )} */}
          </motion.div>

          <div className="mt-6 flex flex-col items-center">
            <h3 className="font-serif text-2xl font-bold text-ink">{name}</h3>
            <p className="font-serif italic text-teal-600 text-base font-medium mt-1">
              {role}
            </p>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 space-y-4 text-base sm:text-lg text-ink/85 leading-relaxed font-sans">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
