"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowDown, Heart } from "lucide-react";
import { homeContent } from "@/content/home";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { hero } = homeContent;

  const headlineWords = hero.headline.split(" ");

  return (
    <section
      className="relative min-h-[88vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-teal-100/50 via-cream to-cream"
      aria-label="Welcome and Mission"
    >
      {/* Soft warm ambient ambient background light */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[400px] sm:h-[500px] rounded-full bg-sun-200/40 blur-3xl pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Dignified Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-sun-200/70 border border-sun-500/25 text-ink text-xs sm:text-sm font-semibold mb-6 tracking-wide"
        >
          <span>{hero.tagline}</span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ink tracking-tight mb-6 leading-[1.14]">
          {headlineWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-bottom"
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + idx * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl font-serif italic text-teal-900/90 mb-6 max-w-2xl px-2"
        >
          {hero.subHeadline}
        </motion.p>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="text-base sm:text-lg text-ink/80 max-w-2xl mb-10 leading-relaxed px-4"
        >
          {hero.intro}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4"
        >
          <Button
            href={hero.primaryCta.href}
            size="lg"
            variant="primary"
            className="w-full sm:w-auto shadow-sm"
          >
            <Heart className="w-5 h-5 fill-current" aria-hidden="true" />
            <span>{hero.primaryCta.text}</span>
          </Button>
          <Button
            href={hero.secondaryCta.href}
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            <span>{hero.secondaryCta.text}</span>
          </Button>
        </motion.div>

        {/* Subtle, natural scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-14 sm:mt-16 flex flex-col items-center gap-1.5 text-teal-900/50"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <ArrowDown className="w-4 h-4 text-teal-600 animate-bounce" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
