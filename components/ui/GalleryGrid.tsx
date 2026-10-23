"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { galleryItems, galleryCategories, type GalleryItem } from "@/data/gallery";
import { galleryContent } from "@/content/pages";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Filter,
} from "lucide-react";

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem: GalleryItem | null =
    selectedIndex !== null && filteredItems[selectedIndex]
      ? filteredItems[selectedIndex]
      : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || filteredItems.length === 0) return;
    setSelectedIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredItems.length - 1
    );
  }, [selectedIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || filteredItems.length === 0) return;
    setSelectedIndex((prev) =>
      prev! < filteredItems.length - 1 ? prev! + 1 : 0
    );
  }, [selectedIndex, filteredItems.length]);

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

  // Fallback empty state if zero images exist
  if (galleryItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto my-12 bg-white rounded-3xl p-8 sm:p-14 border border-teal-900/10 shadow-xs text-center flex flex-col items-center">
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

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center text-xs uppercase tracking-wider font-bold text-teal-900/60 mr-2">
          <Filter className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
          Filter:
        </div>
        {galleryCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-teal-900 text-sun-500 shadow-sm font-semibold scale-105"
                  : "bg-white text-ink/75 hover:bg-teal-100/60 hover:text-teal-900 border border-teal-900/10"
              }`}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-teal-900/10 shadow-xs hover:shadow-xl transition-all duration-300"
          >
            {/* Image Thumbnail Container */}
            <div
              onClick={() => setSelectedIndex(idx)}
              className="relative aspect-[4/3] w-full overflow-hidden bg-teal-900/5 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIndex(idx);
                }
              }}
              aria-label={`View full photo: ${item.title}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Category Pill Over Image */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/80 backdrop-blur-md text-white shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* Hover Expand Icon */}
              <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-ink/70 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-6 flex flex-col justify-between flex-grow bg-white">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-ink group-hover:text-teal-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-ink/75 leading-relaxed font-sans line-clamp-3">
                  {item.caption}
                </p>
              </div>

              {item.programmeId && (
                <div className="mt-5 pt-4 border-t border-teal-900/10 flex items-center justify-between">
                  <Link
                    href={`/programmes#${item.programmeId}`}
                    className="inline-flex items-center text-xs font-semibold text-teal-900 hover:text-coral-500 transition-colors group/link"
                  >
                    <span>View programme details</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                  <button
                    onClick={() => setSelectedIndex(idx)}
                    className="text-xs font-medium text-ink/60 hover:text-teal-900 transition-colors cursor-pointer"
                  >
                    Enlarge photo
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {activeItem && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${activeItem.title}`}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex items-center space-x-3 text-white">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm">
                  {activeItem.category}
                </span>
                <span className="text-xs text-white/70 font-sans">
                  {selectedIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <button
                onClick={handleClose}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 cursor-pointer"
                aria-label="Close lightbox (Esc)"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 z-20 cursor-pointer"
              aria-label="Previous photo (Arrow Left)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
            </button>

            {/* Central Stage */}
            <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center z-10 px-8 sm:px-14">
              <div className="relative w-full h-[55vh] sm:h-[65vh]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 90vw, 1200px"
                  className="rounded-2xl object-contain drop-shadow-2xl"
                />
              </div>

              {/* Caption and Information Card */}
              <div className="mt-4 w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-white text-center">
                <h4 className="font-serif text-lg sm:text-xl font-bold mb-1">
                  {activeItem.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
                  {activeItem.caption}
                </p>
                {activeItem.programmeId && (
                  <div className="mt-3">
                    <Link
                      href={`/programmes#${activeItem.programmeId}`}
                      onClick={handleClose}
                      className="inline-flex items-center text-xs font-semibold text-sun-500 hover:text-white transition-colors"
                    >
                      <span>Learn more about our {activeItem.title} programme</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 z-20 cursor-pointer"
              aria-label="Next photo (Arrow Right)"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
