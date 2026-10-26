import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="text-white relative overflow-hidden dark-surface border-t border-teal-800 bg-cover bg-center bg-no-repeat md:bg-fixed"
      style={{
        backgroundImage: "url('/images/gallery/Education%20Support.jpeg')",
      }}
    >
      {/* Deep teal-900 fade overlay to guarantee legibility and subtle photographic texture */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal-900/96 via-teal-900/93 to-teal-900/98 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo isDark className="mb-4" />
            <p className="text-teal-100/90 text-sm max-w-sm mt-3 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {siteConfig.footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-teal-100/80 hover:text-sun-200 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Column */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide mb-4">
              Get Involved
            </h3>
            <ul className="space-y-3 text-sm">
              {siteConfig.footerNav.getInvolved.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-teal-100/80 hover:text-sun-200 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white tracking-wide mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3.5 text-sm text-teal-100/80">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sun-500 shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-sun-200 break-all transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sun-500 shrink-0 mt-1" aria-hidden="true" />
                <div className="space-y-1">
                  {siteConfig.contact.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block hover:text-sun-200 transition-colors text-xs sm:text-sm"
                    >
                      <span className="font-medium text-white">{p.number}</span>{" "}
                      <span className="text-teal-100/70 text-xs">
                        ({p.label} {p.flag})
                      </span>
                    </a>
                  ))}
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sun-500 shrink-0 mt-1" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-xs text-teal-100/90 font-sans space-y-0.5">
                  <span className="font-semibold text-white block">
                    {siteConfig.contact.organizationName}
                  </span>
                  <span>Kottapeta, Lingana Boinacherla Post,</span>
                  <span className="block">Lingana boinacherla Village, Narasapuram Mandal,</span>
                  <span className="block">West Godavari District, Andhra Pradesh - 534275. India.</span>
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-teal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-100/70">
          <p>© 2026 The Share Community. All Rights Reserved.</p>
          <p className="font-serif italic text-teal-100/90 text-sm">
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
