"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { galleryItems } from "@/data/gallery";
import { galleryContent } from "@/content/pages";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

export function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! > 0 ? prev! - 1 : galleryItems.length - 1
    );
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! < galleryItems.length - 1 ? prev! + 1 : 0
    );
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  // Empty State: when no genuine photos have been supplied yet
  if (galleryItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-12 bg-white rounded-3xl p-10 sm:p-14 border border-teal-900/10 shadow-xs text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-3xl bg-teal-100 flex items-center justify-center text-teal-900 mb-6 shadow-inner">
          <Camera className="w-8 h-8" aria-hidden="true" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-3">
          {galleryContent.emptyState.heading}
        </h3>

        <p className="text-ink/80 text-base sm:text-lg max-w-xl leading-relaxed font-sans">
          {galleryContent.emptyState.message}
        </p>
      </div>
    );
  }

  // Masonry / Responsive Grid when items exist
  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => setSelectedIndex(idx)}
            className="group relative cursor-pointer break-inside-avoid rounded-3xl overflow-hidden bg-white border border-teal-900/10 shadow-xs hover:shadow-xl transition-all duration-300"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelectedIndex(idx);
            }}
            aria-label={`View full image: ${item.caption}`}
          >
            <div className="relative aspect-auto">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 bg-white">
              <p className="text-xs sm:text-sm text-ink/85 font-medium">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && galleryItems[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500"
              aria-label="Close lightbox (Esc)"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500"
              aria-label="Previous image (Arrow Left)"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Image Container */}
            <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
              <div className="relative max-w-full max-h-[75vh]">
                <Image
                  src={galleryItems[selectedIndex].src}
                  alt={galleryItems[selectedIndex].alt}
                  width={galleryItems[selectedIndex].width}
                  height={galleryItems[selectedIndex].height}
                  className="rounded-2xl max-h-[75vh] w-auto object-contain"
                />
              </div>
              <p className="text-white text-sm sm:text-base text-center mt-4 px-4 font-sans">
                {galleryItems[selectedIndex].caption}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500"
              aria-label="Next image (Arrow Right)"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
