"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

interface TextScrollFillProps {
  text: string;
  className?: string;
  tag?: "p" | "h2" | "h3" | "div";
}

function Word({
  children,
  progress,
  range,
  reduceMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean | null;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);

  if (reduceMotion) {
    return <span className="inline-block mr-[0.3em] text-ink">{children}</span>;
  }

  return (
    <span className="relative inline-block mr-[0.3em]">
      <span className="opacity-20 text-ink select-none absolute left-0 top-0">
        {children}
      </span>
      <motion.span style={{ opacity }} className="relative text-ink">
        {children}
      </motion.span>
    </span>
  );
}

export function TextScrollFill({
  text,
  className = "",
  tag = "p",
}: TextScrollFillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const content = words.map((word, i) => {
    const start = i / words.length;
    const end = start + 1 / words.length;
    return (
      <Word
        key={i}
        progress={scrollYProgress}
        range={[start, end]}
        reduceMotion={reduceMotion}
      >
        {word}
      </Word>
    );
  });

  if (tag === "h2") {
    return (
      <div ref={containerRef}>
        <h2 className={`leading-relaxed transition-colors ${className}`}>
          {content}
        </h2>
      </div>
    );
  }

  if (tag === "h3") {
    return (
      <div ref={containerRef}>
        <h3 className={`leading-relaxed transition-colors ${className}`}>
          {content}
        </h3>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <p className={`leading-relaxed transition-colors ${className}`}>
        {content}
      </p>
    </div>
  );
}
