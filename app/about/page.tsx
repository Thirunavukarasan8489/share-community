import React from "react";
import type { Metadata } from "next";
import { aboutContent } from "@/content/about";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { PersonCard } from "@/components/ui/PersonCard";
import { VisionMission } from "@/components/sections/VisionMission";
import { ValueCard } from "@/components/ui/ValueCard";
import { Reveal } from "@/components/animation/Reveal";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A Legacy of Compassion. A Future of Hope. Learn about the story, founder, leadership and values of The Share Community.",
};

export default function AboutPage() {
  const { header, ourStory, founder, ceo, visionMission, values } = aboutContent;

  return (
    <>
      {/* 1 & 2. Header & Intro */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={header.title}
            subTitle={header.subLine}
            highlightWord="Share Community"
          />

          <div className="space-y-6 text-lg sm:text-xl text-ink/85 leading-relaxed font-sans max-w-3xl mx-auto">
            {header.introParagraphs.map((p, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Story — Vertical Scroll Timeline */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream border-t border-teal-900/5"
        aria-labelledby="our-story-heading"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title={ourStory.heading}
            highlightWord="Story"
            subTitle="The foundations, faithful dedication, and enduring legacy that guide our journey"
          />

          <StoryTimeline />
        </div>
      </section>

      {/* 4 & 5. Leadership: Our Founder & CEO */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white border-y border-teal-900/10"
        aria-labelledby="leadership-heading"
      >
        <div className="max-w-5xl mx-auto space-y-16">
          <SectionHeading
            title="Leadership & Legacy"
            highlightWord="Legacy"
            subTitle="Honouring a founding vision of selfless service and stewarding it for generations to come"
          />

          {/* Our Founder */}
          <div id="founder">
            <h3 className="sr-only">Our Founder</h3>
            <PersonCard
              name={founder.name}
              role={founder.role}
              paragraphs={founder.paragraphs}
              imagePath={founder.imagePath}
              initials={founder.initials}
            />
          </div>

          {/* Chief Executive Officer */}
          <div id="ceo">
            <h3 className="sr-only">Chief Executive Officer</h3>
            <PersonCard
              name={ceo.name}
              role={ceo.role}
              paragraphs={ceo.paragraphs}
              imagePath={ceo.imagePath}
              initials={ceo.initials}
            />
          </div>
        </div>
      </section>

      {/* 6. Our Vision & Our Mission (About version) */}
      <VisionMission
        vision={visionMission.vision}
        mission={visionMission.mission}
      />

      {/* 7. Our Values — 8 Cards */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-cream"
        aria-labelledby="our-values-heading"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={values.heading}
            highlightWord="Values"
            subTitle="The eight foundational principles that underpin our character, conduct and programmes"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.items.map((val, idx) => (
              <ValueCard
                key={val.name}
                name={val.name}
                description={val.description}
                icon={val.icon}
                accent={val.accent}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <ContactStrip />
    </>
  );
}
