import React from "react";
import type { Metadata } from "next";
import { galleryContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See Our Work in Action. Genuine photographs and stories from our charitable activities and community initiatives.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={galleryContent.title}
            subTitle={galleryContent.subLine}
            highlightWord="Gallery"
          />

          <p className="text-base sm:text-lg md:text-xl text-ink/85 leading-relaxed font-sans max-w-2xl mx-auto">
            {galleryContent.description}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <GalleryGrid />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
