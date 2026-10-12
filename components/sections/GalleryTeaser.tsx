"use client";

import React from "react";
import { motion } from "framer-motion";
import { Images, ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/home";

export function GalleryTeaser() {
  const { galleryTeaser } = homeContent;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-teal-100/50 border border-teal-900/10 rounded-3xl p-6 sm:p-12 md:p-14 text-center overflow-hidden shadow-xs"
        >
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-900 text-sun-500 flex items-center justify-center mb-6 shadow-xs">
              <Camera className="w-6 h-6" aria-hidden="true" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-3 tracking-tight">
              {galleryTeaser.title}
            </h2>

            <p className="font-serif italic text-teal-900 text-base sm:text-lg mb-6">
              {galleryTeaser.subLine}
            </p>

            <p className="text-ink/80 text-base sm:text-lg leading-relaxed mb-8 font-sans">
              {galleryTeaser.text}
            </p>

            <Button href={galleryTeaser.href} variant="primary" size="md">
              <Images className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{galleryTeaser.cta}</span>
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
