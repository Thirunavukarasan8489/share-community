import React from "react";
import type { Metadata } from "next";
import { donateContent } from "@/content/pages";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DonateWidget } from "@/components/ui/DonateWidget";
import { FinancialTransparency } from "@/components/sections/FinancialTransparency";
import { ContactStrip } from "@/components/sections/ContactStrip";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support our charitable programmes and community initiatives. Together, we can create lasting change.",
};

export default function DonatePage() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={donateContent.title}
            subTitle={donateContent.subLine}
            highlightWord="Donate"
          />

          <DonateWidget />
        </div>
      </section>

      <FinancialTransparency />

      <ContactStrip />
    </>
  );
}
