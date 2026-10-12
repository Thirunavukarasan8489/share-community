import React from "react";

interface WaveDividerProps {
  fillColor?: string;
  backgroundColor?: string;
  inverted?: boolean;
  className?: string;
}

export function WaveDivider({
  fillColor = "var(--cream)",
  backgroundColor = "transparent",
  inverted = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ backgroundColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`relative block w-full h-8 sm:h-12 md:h-16 ${
          inverted ? "rotate-180" : ""
        }`}
      >
        <path
          d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
