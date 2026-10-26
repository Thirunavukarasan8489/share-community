import React from "react";
import { programmesContent } from "@/content/programmes";

export function FutureProgrammesMarquee() {
  const { futureProgrammes } = programmesContent;

  return (
    <section
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 text-white overflow-hidden relative dark-surface border-t border-teal-800 bg-cover bg-center bg-no-repeat md:bg-fixed"
      style={{
        backgroundImage:
          "url('/images/gallery/Livelihood%20%26%20Skills%20Development.jpeg')",
      }}
      aria-labelledby="future-programmes-heading"
    >
      {/* Deep teal-900 fade overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-teal-900/95 via-teal-900/90 to-teal-900/95 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
        <h2
          id="future-programmes-heading"
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          {futureProgrammes.title}
        </h2>

        <p className="text-teal-100/90 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          {futureProgrammes.intro}
        </p>
      </div>

      {/* Clean, responsive pill tags */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-wrap justify-center gap-3 sm:gap-4 py-4">
        {futureProgrammes.pills.map((pill, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base font-medium shadow-xs hover:bg-white/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-sun-500 shrink-0" />
            <span>{pill}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center mt-10">
        <p className="text-sm sm:text-base text-teal-100/80 italic font-serif leading-relaxed px-4">
          {futureProgrammes.note}
        </p>
      </div>
    </section>
  );
}
