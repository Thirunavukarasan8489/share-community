"use client";

import React from "react";
import { donateContent } from "@/content/pages";
import { Button } from "@/components/ui/Button";
import { Heart, ArrowRight, Mail } from "lucide-react";

export function DonateWidget() {
  const donateUrl = process.env.NEXT_PUBLIC_DONATE_URL;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-12 border-2 border-sun-500/40 shadow-xs text-center max-w-2xl mx-auto">
      <div className="w-14 h-14 rounded-2xl bg-sun-500 text-ink flex items-center justify-center mx-auto mb-6 shadow-xs">
        <Heart className="w-7 h-7 fill-current" aria-hidden="true" />
      </div>

      <h2 className="font-serif text-3xl font-bold text-ink mb-4">
        {donateContent.title}
      </h2>

      <p className="text-base sm:text-lg text-ink/85 leading-relaxed font-sans mb-8">
        {donateContent.description}
      </p>

      {donateUrl ? (
        <Button
          href={donateUrl}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          <span>{donateContent.buttonText}</span>
          <ArrowRight className="w-5 h-5 ml-1" aria-hidden="true" />
        </Button>
      ) : (
        <div className="space-y-6">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <span>{donateContent.buttonText}</span>
            <ArrowRight className="w-5 h-5 ml-1" aria-hidden="true" />
          </Button>

          <div className="pt-6 border-t border-teal-900/10 text-left bg-teal-100/30 rounded-2xl p-6">
            <h3 className="font-serif text-lg font-bold text-teal-900 mb-2">
              {donateContent.contactAlternative.heading}
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-4">
              {donateContent.contactAlternative.text}
            </p>
            <Button href={donateContent.contactAlternative.href} variant="secondary" size="sm">
              <Mail className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{donateContent.contactAlternative.buttonText}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
