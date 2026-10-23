import React from "react";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactStrip() {
  return (
    <section className="bg-teal-100/60 border-t border-teal-900/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-4 max-w-3xl">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-1.5">
              Get in Touch With The Share Community
            </h2>
            <p className="text-ink/80 text-sm sm:text-base font-sans">
              We welcome enquiries from supporters, volunteers, organisations and potential partners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-teal-900 font-medium">
            {/* Email Link */}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 hover:text-coral-500 transition-colors"
            >
              <Mail className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              <span>{siteConfig.contact.email}</span>
            </a>

            {/* Phone Links */}
            <div className="inline-flex flex-wrap items-center gap-3">
              <Phone className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              {siteConfig.contact.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-1 hover:text-coral-500 transition-colors bg-white/70 px-2.5 py-1 rounded-full border border-teal-900/10"
                >
                  <span className="font-semibold">{p.number}</span>
                  <span className="text-[11px] text-ink/70">
                    {p.label} {p.flag}
                  </span>
                </a>
              ))}
            </div>

            {/* Address */}
            <span className="inline-flex items-center gap-2 text-ink/80">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
              <span>Andhra Pradesh, India</span>
            </span>
          </div>
        </div>

        <Button
          href="/contact"
          variant="secondary"
          size="md"
          className="shrink-0 w-full sm:w-auto"
        >
          <span>Contact Us</span>
          <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
