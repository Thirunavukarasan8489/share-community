"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Target } from "lucide-react";

interface VisionMissionProps {
  vision: {
    title: string;
    text: string;
  };
  mission: {
    title: string;
    text: string;
  };
}

export function VisionMission({ vision, mission }: VisionMissionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden dark-surface bg-cover bg-center bg-no-repeat md:bg-fixed"
      style={{
        backgroundImage: "url('/images/gallery/Community%20Development.jpeg')",
      }}
      aria-labelledby="vision-mission-heading"
    >
      {/* Deep teal-900 fade overlay to ensure text contrast and warm photographic depth */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal-900/95 via-teal-900/90 to-teal-900/95 pointer-events-none"
        aria-hidden="true"
      />

      <h2 id="vision-mission-heading" className="sr-only">
        Our Vision and Mission
      </h2>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Vision Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-lg hover:bg-white/15 transition-all"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sun-500 text-white flex items-center justify-center mb-6 shadow-sm">
                <Compass className="w-7 h-7" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                {vision.title}
              </h3>

              <p className="text-teal-100 text-lg sm:text-xl leading-relaxed font-sans font-light">
                {vision.text}
              </p>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-lg hover:bg-white/15 transition-all"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-6 shadow-sm">
                <Target className="w-7 h-7" aria-hidden="true" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                {mission.title}
              </h3>

              <p className="text-teal-100 text-lg sm:text-xl leading-relaxed font-sans font-light">
                {mission.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
