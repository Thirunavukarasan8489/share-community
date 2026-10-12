"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { aboutContent } from "@/content/about";

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { steps } = aboutContent.ourStory;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.7"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto py-12">
      {/* Central continuous background track */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-teal-900/10 -translate-x-1/2 rounded-full" />

      {/* Scrubbed drawing stroke */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-sun-500 origin-top -translate-x-1/2 rounded-full"
      />

      <div className="space-y-12 sm:space-y-16">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`relative flex flex-col sm:flex-row items-start ${
                isEven ? "sm:flex-row-reverse" : ""
              }`}
            >
              {/* Dot Indicator */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cream border-4 border-teal-900 z-10 flex items-center justify-center mt-1">
                <span className="w-2 h-2 rounded-full bg-sun-500" />
              </div>

              {/* Step Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`ml-12 sm:ml-0 sm:w-[45%] bg-white rounded-2xl p-6 sm:p-8 border border-teal-900/10 shadow-xs ${
                  isEven ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"
                }`}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider mb-3">
                  {step.year}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-3">
                  {step.title}
                </h3>

                <p className="text-ink/80 text-sm sm:text-base leading-relaxed font-sans">
                  {step.text}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
