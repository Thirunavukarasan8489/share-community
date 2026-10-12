import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className = "", isDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun-500 rounded-lg p-1 transition-colors ${className}`}
      aria-label="The Share Community — Home"
    >
      {/* Sunrise & Hands SVG Motif */}
      <span
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${
          isDark
            ? "bg-sun-500 text-teal-900"
            : "bg-teal-900 text-sun-500 shadow-sm"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          aria-hidden="true"
        >
          {/* Sunrise arc and rays */}
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
          <path d="M12 3v3" />
          <path d="M5.6 5.6l2.1 2.1" />
          <path d="M18.4 5.6l-2.1 2.1" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          {/* Community caring hands arc */}
          <path d="M7 17a5 5 0 0 0 10 0" strokeWidth="2.2" />
        </svg>
      </span>

      <div className="flex flex-col">
        <span
          className={`font-serif tracking-tight font-bold text-base sm:text-xl transition-colors ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          THE SHARE COMMUNITY
        </span>
        <span
          className={`text-[10px] sm:text-xs font-sans tracking-wider uppercase font-medium ${
            isDark ? "text-sun-200" : "text-teal-600"
          }`}
        >
          Sharing Hope. Changing Lives.
        </span>
      </div>
    </Link>
  );
}
