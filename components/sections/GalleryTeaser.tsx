"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Images, ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { homeContent } from "@/content/home";
import { galleryItems } from "@/data/gallery";

export function GalleryTeaser() {
  const { galleryTeaser } = homeContent;
  const previewItems = galleryItems.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-900 text-sun-500 flex items-center justify-center mb-5 shadow-xs">
            <Camera className="w-6 h-6" aria-hidden="true" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-3 tracking-tight">
            {galleryTeaser.title}
          </h2>

          <p className="font-serif italic text-teal-900 text-lg sm:text-xl mb-5 font-medium">
            {galleryTeaser.subLine}
          </p>

          <p className="text-ink/80 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            {galleryTeaser.text}
          </p>
        </div>

        {/* Image Previews */}
        {previewItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {previewItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-teal-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Link
                  href="/gallery"
                  className="block relative aspect-[4/3] w-full overflow-hidden bg-teal-900/5 focus:outline-none focus:ring-2 focus:ring-sun-500"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-900/80 backdrop-blur-md text-white shadow-xs">
                      {item.category}
                    </span>
                  </div>
                </Link>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink group-hover:text-teal-900 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-ink/70 line-clamp-2 font-sans">
                      {item.caption}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-teal-900/10">
                    <Link
                      href="/gallery"
                      className="inline-flex items-center text-xs font-semibold text-teal-900 group-hover:text-coral-500 transition-colors"
                    >
                      <span>View in gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Button href={galleryTeaser.href} variant="primary" size="lg">
            <Images className="w-5 h-5 mr-2" aria-hidden="true" />
            <span>{galleryTeaser.cta}</span>
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
