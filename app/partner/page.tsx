import React from "react";
import type { Metadata } from "next";
import { partnerContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PartnerForm } from "@/components/sections/PartnerForm";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "Partner With Us",
  description:
    "We welcome partnerships with organisations, businesses, professionals and community groups that share our commitment to positive change.",
};

export default function PartnerPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={partnerContent.title}
            subTitle={partnerContent.subLine}
            highlightWord="Partner"
          />

          <p className="text-lg sm:text-xl text-ink/85 leading-relaxed font-sans max-w-2xl mx-auto mb-10">
            {partnerContent.description}
          </p>

          <PartnerForm />
        </div>
      </section>

      <ContactStrip />
    </>
  );
}
