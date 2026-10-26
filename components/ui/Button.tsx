import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "coral";
  href?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  href,
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[44px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[52px]",
  }[size];

  const variantClasses = {
    // Primary: vibrant orange fill with crisp white text matching the template
    primary:
      "bg-sun-500 text-white hover:bg-coral-500 hover:shadow-md font-semibold focus-visible:ring-2 focus-visible:ring-sun-500 active:scale-[0.98]",
    secondary:
      "bg-white hover:bg-teal-100/60 text-teal-900 border border-teal-900/20 hover:border-teal-900/40 font-medium active:scale-[0.98]",
    ghost:
      "bg-transparent text-ink hover:bg-teal-900/10 font-medium active:scale-[0.98]",
    coral:
      "bg-coral-500 text-white hover:bg-coral-500/90 hover:shadow-md font-semibold active:scale-[0.98]",
  }[variant];

  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 cursor-pointer text-center select-none ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
