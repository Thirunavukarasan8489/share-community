export interface NavItem {
  title: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  nav: NavItem[];
  footerNav: {
    explore: NavItem[];
    getInvolved: NavItem[];
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "The Share Community",
  tagline: "Sharing Hope. Changing Lives.",
  description:
    "The Share Community is dedicated to improving lives through compassion, opportunity and meaningful action.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sharecommunity.org",
  contact: {
    // Official placeholders as specified in AGENTS.md §3.8
    email: "[Official Email]",
    phone: "[Telephone Number]",
    address: "[Official Address]",
  },
  nav: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Programmes", href: "/programmes" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
  ],
  footerNav: {
    explore: [
      { title: "Home", href: "/" },
      { title: "About Us", href: "/about" },
      { title: "Our Programmes", href: "/programmes" },
      { title: "Gallery", href: "/gallery" },
      { title: "Contact", href: "/contact" },
    ],
    getInvolved: [
      { title: "Donate", href: "/donate" },
      { title: "Become a Volunteer", href: "/volunteer" },
      { title: "Partner With Us", href: "/partner" },
    ],
  },
  social: {
    // TODO(owner): provide official social media URLs if applicable
  },
};
