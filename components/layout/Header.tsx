"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ScrollProgress } from "@/components/animation/ScrollProgress";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-sun-500 text-ink font-semibold rounded-md shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-teal-900/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2"
              aria-label="Main Navigation"
            >
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "text-teal-900 font-semibold bg-teal-100/70"
                        : "text-ink/80 hover:text-ink hover:bg-teal-900/5"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button href="/donate" size="sm" variant="primary">
                <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
                <span>Donate</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                href="/donate"
                size="sm"
                variant="primary"
                className="py-1.5 px-3 text-xs"
              >
                Donate
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-ink hover:bg-teal-900/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar right under header */}
        <ScrollProgress />
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-cream flex flex-col pt-24 px-6 pb-8 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col gap-4 text-center my-auto">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-serif py-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-teal-900 font-bold bg-teal-100/80"
                        : "text-ink hover:text-teal-600"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <Button
                href="/donate"
                size="lg"
                variant="primary"
                className="w-full"
              >
                Donate Now
              </Button>
              <Button
                href="/volunteer"
                size="md"
                variant="secondary"
                className="w-full"
              >
                Become a Volunteer
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
