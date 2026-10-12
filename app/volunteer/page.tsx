import React from "react";
import type { Metadata } from "next";
import { volunteerContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VolunteerForm } from "@/components/sections/VolunteerForm";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "Become a Volunteer",
  description:
    "Give your time, knowledge, experience or skills to help make a difference with The Share Community.",
};

export default function VolunteerPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={volunteerContent.title}
            subTitle={volunteerContent.subLine}
            highlightWord="Volunteer"
          />

          <p className="text-lg sm:text-xl text-ink/85 leading-relaxed font-sans max-w-2xl mx-auto mb-10">
            {volunteerContent.description}
          </p>

          <VolunteerForm />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
