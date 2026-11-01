import React from "react";
import Image from "next/image";

interface WatermarkLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  position?: "center" | "top-right" | "bottom-right" | "top-left" | "bottom-left";
  rotate?: number;
  className?: string;
  opacityClassName?: string;
}

export function WatermarkLogo({
  size = "lg",
  position = "center",
  rotate = 0,
  className = "",
  opacityClassName = "opacity-[0.05] sm:opacity-[0.06]",
}: WatermarkLogoProps) {
  const sizeClasses = {
    sm: "w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72",
    md: "w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96",
    lg: "w-72 h-72 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] lg:w-[540px] lg:h-[540px]",
    xl: "w-80 h-80 sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px]",
  }[size];

  const positionContainerClasses = {
    center: "inset-0 flex items-center justify-center",
    "top-right": "top-0 right-0 flex justify-end items-start",
    "bottom-right": "bottom-0 right-0 flex justify-end items-end",
    "top-left": "top-0 left-0 flex justify-start items-start",
    "bottom-left": "bottom-0 left-0 flex justify-start items-end",
  }[position];

  const offsetClasses = {
    center: "",
    "top-right": "-translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16",
    "bottom-right": "translate-y-12 translate-x-12 sm:translate-y-16 sm:translate-x-16",
    "top-left": "-translate-y-12 -translate-x-12 sm:-translate-y-16 sm:-translate-x-16",
    "bottom-left": "translate-y-12 -translate-x-12 sm:translate-y-16 sm:-translate-x-16",
  }[position];

  return (
    <div
      className={`absolute ${positionContainerClasses} pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <div
        className={`relative ${sizeClasses} ${offsetClasses} ${opacityClassName} transition-opacity duration-300`}
        style={rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : undefined}
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 480px, 700px"
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}

