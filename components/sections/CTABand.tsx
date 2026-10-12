"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeContent } from "@/content/home";

export function CTABand() {
  const { makeADifference } = homeContent;

  const iconMap: Record<string, React.ElementType> = {
    Donate: Heart,
    Volunteer: Users,
    "Partner With Us": Handshake,
  };

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/30 to-cream relative overflow-hidden"
      aria-labelledby="cta-band-heading"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={makeADifference.heading}
          subTitle={makeADifference.subLine}
          highlightWord="Difference"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {makeADifference.cards.map((card, idx) => {
            const Icon = iconMap[card.title] || Heart;
            const isDonate = card.title === "Donate";

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                  isDonate
                    ? "bg-white border-2 border-sun-500/60 shadow-md"
                    : "bg-white border border-teal-900/10 shadow-xs hover:shadow-md"
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
                      isDonate
                        ? "bg-sun-500 text-ink shadow-xs"
                        : card.accent === "leaf"
                        ? "bg-leaf-500/15 text-leaf-500"
                        : "bg-teal-100 text-teal-900"
                    }`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-ink mb-3">
                    {card.title}
                  </h3>

                  <p className="text-ink/80 text-base leading-relaxed mb-8 font-sans">
                    {card.description}
                  </p>
                </div>

                <Button
                  href={card.href}
                  variant={isDonate ? "primary" : "secondary"}
                  size="md"
                  className="w-full justify-center"
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
