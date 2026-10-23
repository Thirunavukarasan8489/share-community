import React from "react";
import type { Metadata } from "next";
import { contactContent } from "@/content/pages";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "We welcome enquiries from supporters, volunteers, organisations and potential partners. Get in touch with The Share Community.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-100/40 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            title={contactContent.title}
            subTitle={contactContent.subLine}
            highlightWord="Contact"
          />

          <p className="text-lg sm:text-xl text-ink/85 leading-relaxed font-sans max-w-2xl mx-auto mb-12">
            {contactContent.intro}
          </p>

          {/* Contact Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16 items-stretch">
            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-teal-900/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-ink text-lg">Email</h3>
                <p className="text-xs text-ink/60 mt-1 mb-3">
                  For general and partnership enquiries
                </p>
              </div>
              <div className="pt-3 border-t border-teal-900/10">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-semibold text-teal-900 hover:text-coral-500 break-all transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>

            {/* Telephone Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-teal-900/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sun-200/60 text-ink flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-ink text-lg">Phone</h3>
                <p className="text-xs text-ink/60 mt-1 mb-3">
                  Direct contact numbers
                </p>
              </div>
              <div className="pt-3 border-t border-teal-900/10 space-y-2">
                {siteConfig.contact.phones.map((p) => (
                  <div key={p.tel} className="flex items-center justify-between text-sm">
                    <a
                      href={`tel:${p.tel}`}
                      className="font-semibold text-teal-900 hover:text-coral-500 transition-colors"
                    >
                      {p.number}
                    </a>
                    <span className="text-xs font-medium text-ink/70 flex items-center gap-1 bg-cream px-2.5 py-0.5 rounded-full border border-teal-900/10">
                      <span>{p.label}</span>
                      <span aria-hidden="true">{p.flag}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-teal-900/10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-leaf-500/15 text-leaf-500 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-serif font-bold text-ink text-lg">Address</h3>
                <p className="text-xs text-ink/60 mt-1 mb-3">
                  Registered office & operational base
                </p>
              </div>
              <div className="pt-3 border-t border-teal-900/10">
                <address className="not-italic text-xs sm:text-sm text-ink/85 leading-relaxed space-y-0.5 font-sans">
                  {siteConfig.contact.addressLines.map((line, idx) => (
                    <span
                      key={idx}
                      className={idx === 0 ? "font-semibold text-teal-900 block" : "block"}
                    >
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
