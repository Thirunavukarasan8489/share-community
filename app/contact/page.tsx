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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-16">
            <div className="bg-white rounded-3xl p-6 border border-teal-900/10 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-ink text-base">Email</h3>
                <p className="text-sm text-ink/80 mt-1 break-all">
                  {siteConfig.contact.email}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-teal-900/10 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sun-200/60 text-ink flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-ink text-base">Telephone</h3>
                <p className="text-sm text-ink/80 mt-1">
                  {siteConfig.contact.phone}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-teal-900/10 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-leaf-500/15 text-leaf-500 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-ink text-base">Address</h3>
                <p className="text-sm text-ink/80 mt-1">
                  {siteConfig.contact.address}
                </p>
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
