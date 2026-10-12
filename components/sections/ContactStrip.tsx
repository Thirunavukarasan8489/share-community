import React from "react";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactStrip() {
  return (
    <section className="bg-teal-100/60 border-t border-teal-900/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        <div>
          <h2 className="font-serif text-2xl font-bold text-ink mb-2">
            Get in Touch With The Share Community
          </h2>
          <p className="text-ink/80 text-sm max-w-xl font-sans">
            We welcome enquiries from supporters, volunteers, organisations and potential partners.
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm text-teal-900 font-medium">
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.phone}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.address}</span>
            </span>
          </div>
        </div>

        <Button href="/contact" variant="secondary" size="md" className="shrink-0 w-full sm:w-auto">
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
