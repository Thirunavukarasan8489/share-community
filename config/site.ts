export interface NavItem {
  title: string;
  href: string;
}

export interface ContactPhone {
  number: string;
  label: string;
  country: string;
  tel: string;
  flag: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    email: string;
    phone: string;
    phones: ContactPhone[];
    address: string;
    addressLines: string[];
    organizationName: string;
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
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sharecommunity.com",
  contact: {
    email: "info@example.com",
    phone: "+91 98493 78466 (India) · 07858577712 (UK)",
    phones: [
      {
        number: "9849378466",
        label: "India",
        country: "India",
        tel: "+919849378466",
        flag: "🇮🇳",
      },
      {
        number: "07858577712",
        label: "United Kingdom",
        country: "United Kingdom",
        tel: "+447858577712",
        flag: "🇬🇧",
      },
    ],
    organizationName: "Share Community Trust",
    address:
      "Share Community Trust, Kottapeta, Lingana Boinacherla Post, Lingana boinacherla Village, Narasapuram Mandal, West Godavari District, Andhra Pradesh - 534275. India.",
    addressLines: [
      "Share Community Trust",
      "Kottapeta, Lingana Boinacherla Post",
      "Lingana boinacherla Village, Narasapuram Mandal",
      "West Godavari District, Andhra Pradesh - 534275",
      "India",
    ],
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
