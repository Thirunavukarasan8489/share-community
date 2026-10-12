import React from "react";
import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import { Hero } from "@/components/sections/Hero";
import { TextScrollFill } from "@/components/animation/TextScrollFill";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgrammeCard } from "@/components/ui/ProgrammeCard";
import { VisionMission } from "@/components/sections/VisionMission";
import { CTABand } from "@/components/sections/CTABand";
import { GalleryTeaser } from "@/components/sections/GalleryTeaser";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "The Share Community — Sharing Hope. Changing Lives.",
  description:
    "The Share Community is dedicated to improving lives through compassion, opportunity and meaningful action.",
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "The Share Community",
    slogan: "Sharing Hope. Changing Lives.",
    description:
      "The Share Community is dedicated to improving lives through compassion, opportunity and meaningful action.",
    founder: {
      "@type": "Person",
      name: "Late Pastor Vijay Kumar Mamuduri",
      jobTitle: "Founder",
    },
    employee: [
      {
        "@type": "Person",
        name: "Aaron Jeshurun Mamuduri",
        jobTitle: "Chief Executive Officer",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero */}
      <Hero />

      {/* 2. Belief statement with Scroll-Scrubbed Text Fill */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream border-t border-teal-900/5 relative"
        aria-label="Our Belief"
      >
        <div className="max-w-4xl mx-auto text-center">
          <TextScrollFill
            tag="h2"
            text={homeContent.belief.statement}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-bold tracking-tight mb-8"
          />

          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-ink/80 font-sans leading-relaxed max-w-3xl mx-auto">
              {homeContent.belief.continuation}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Welcome to The Share Community */}
      <section
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-teal-900/10 relative"
        aria-labelledby="welcome-heading"
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title={homeContent.welcome.heading}
            highlightWord="Share Community"
          />

          <div className="space-y-6 text-base sm:text-lg text-ink/85 leading-relaxed font-sans">
            {homeContent.welcome.paragraphs.map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="pt-6 border-t border-teal-900/10 flex items-center justify-center">
                <span className="font-serif italic text-xl sm:text-2xl font-bold text-teal-900 tracking-wide">
                  {homeContent.welcome.tagline}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. What We Do — 7 Cards */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream"
        aria-labelledby="what-we-do-heading"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={homeContent.whatWeDo.heading}
            highlightWord="Do"
            subTitle="Compassionate support and meaningful opportunities across seven pillars"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {homeContent.whatWeDo.items.map((item, idx) => (
              <ProgrammeCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                accent={item.accent as "sun" | "coral" | "leaf" | "teal"}
                icon={item.icon}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Vision & Our Mission */}
      <VisionMission
        vision={homeContent.visionMission.vision}
        mission={homeContent.visionMission.mission}
      />

      {/* 6. Be Part of the Change */}
      <section
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream"
        aria-labelledby="be-part-heading"
      >
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            title={homeContent.bePart.heading}
            highlightWord="Change"
          />

          <div className="space-y-4 text-lg sm:text-xl text-ink/85 leading-relaxed">
            {homeContent.bePart.paragraphs.map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Gallery Teaser */}
      <GalleryTeaser />

      {/* 8. Make a Difference Today (CTA Band) */}
      <CTABand />

      {/* 9. Contact Strip */}
      <ContactStrip />
    </>
  );
}
