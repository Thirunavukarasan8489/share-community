export interface GalleryItem {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  category: string;
  programmeId?: string;
}

export const galleryCategories = [
  "All",
  "Education",
  "Healthcare",
  "Food Assistance",
  "Children's Welfare",
  "Community",
  "Livelihood & Skills",
  "Emergency Relief",
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "education-support",
    title: "Education Support",
    src: "/images/gallery/Education%20Support.jpeg",
    alt: "Education Support programme providing learning opportunities and academic assistance",
    caption:
      "Education Support — Opening doors to brighter futures through learning materials, academic guidance and educational access.",
    width: 1620,
    height: 971,
    category: "Education",
    programmeId: "education-for-all",
  },
  {
    id: "healthcare-wellbeing",
    title: "Healthcare & Wellbeing",
    src: "/images/gallery/Healthcare%20%26%20Wellbeing.jpeg",
    alt: "Healthcare and wellbeing initiatives supporting health and human dignity in the community",
    caption:
      "Healthcare & Wellbeing — Supporting community health, preventive care initiatives and preserving human dignity.",
    width: 1254,
    height: 1254,
    category: "Healthcare",
    programmeId: "healthcare-and-wellbeing",
  },
  {
    id: "food-essential-assistance",
    title: "Food & Essential Assistance",
    src: "/images/gallery/Food%20%26%20Essential%20Assistance.jpeg",
    alt: "Food and essential supplies distributed to individuals and families facing hardship",
    caption:
      "Food & Essential Assistance — Providing practical nourishment and relief to people facing acute hardship and times of difficulty.",
    width: 901,
    height: 869,
    category: "Food Assistance",
    programmeId: "food-and-essential-assistance",
  },
  {
    id: "childrens-welfare",
    title: "Children's Welfare",
    src: "/images/gallery/Children%27s%20Welfare.jpeg",
    alt: "Children's welfare activities fostering encouragement, safety and flourishing development",
    caption:
      "Children's Welfare — Protecting, encouraging and nurturing young lives to ensure every child has the opportunity to flourish.",
    width: 1536,
    height: 1024,
    category: "Children's Welfare",
    programmeId: "childrens-welfare",
  },
  {
    id: "community-development",
    title: "Community Development",
    src: "/images/gallery/Community%20Development.jpeg",
    alt: "Community development activities strengthening local relationships and shared progress",
    caption:
      "Community Development — Strengthening local bonds, facilities and cooperative initiatives for lasting resilience and shared growth.",
    width: 1536,
    height: 1024,
    category: "Community",
    programmeId: "community-development",
  },
  {
    id: "livelihood-skills",
    title: "Livelihood & Skills Development",
    src: "/images/gallery/Livelihood%20%26%20Skills%20Development.jpeg",
    alt: "Livelihood and practical vocational skills development training for sustainable self-reliance",
    caption:
      "Livelihood & Skills Development — Equipping people with practical vocational skills to build sustainable independence and bright futures.",
    width: 1536,
    height: 1024,
    category: "Livelihood & Skills",
    programmeId: "livelihood-and-skills-development",
  },
  {
    id: "emergency-disaster-relief",
    title: "Emergency & Disaster Relief",
    src: "/images/gallery/Emergency%20%26%20Disaster%20Relief.jpeg",
    alt: "Emergency and disaster relief assistance delivered during acute crises",
    caption:
      "Emergency & Disaster Relief — Responsive, compassionate assistance deployed to alleviate immediate crisis and aid recovery.",
    width: 1268,
    height: 1240,
    category: "Emergency Relief",
    programmeId: "emergency-and-disaster-relief",
  },
];
