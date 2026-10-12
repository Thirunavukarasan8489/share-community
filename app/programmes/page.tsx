import React from "react";
import type { Metadata } from "next";
import { programmesContent } from "@/content/programmes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgrammesList } from "@/components/sections/ProgrammesList";
import { FutureProgrammesMarquee } from "@/components/sections/FutureProgrammesMarquee";
import { ContactStrip } from "@/components/sections/ContactStrip";
import { Reveal } from "@/components/animation/Reveal";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Creating Opportunities. Strengthening Communities. Transforming Lives. Explore the education, healthcare, food assistance, children welfare, and livelihood initiatives of The Share Community.",
};

export default function ProgrammesPage() {
  const { header } = programmesContent;

  return (
    <>
      {/* Header and Intro */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={header.title}
            subTitle={header.subLine}
            highlightWord="Programmes"
          />

          <div className="space-y-4 text-lg sm:text-xl text-ink/85 leading-relaxed font-sans max-w-3xl mx-auto">
            {header.introParagraphs.map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Six Programmes with Sticky Navigation */}
      <ProgrammesList />

      {/* Future Programmes Row/Marquee */}
      <FutureProgrammesMarquee />

      {/* Contact Strip */}
      <ContactStrip />
    </>
  );
}
