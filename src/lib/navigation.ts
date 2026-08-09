import { SITE_LOGO } from "./site";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type ServiceNavItem = {
  title: string;
  slug: string;
  category: "music" | "yoga" | "therapy" | string;
  subcategory?: string;
};

export const serviceCategories = ["music", "yoga", "therapy"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];

export const shopNavChildren: NavItem[] = [
  { label: "Malas", href: "/shop/malas" },
  { label: "Online Courses", href: "/shop/courses" },
];

/** Static fallback links used when Sanity has no published services yet. */
export const fallbackServiceNav: Record<ServiceCategory, NavItem[]> = {
  music: [
    { label: "Concerts", href: "/music/concerts" },
    { label: "Classes", href: "/music/classes" },
    { label: "Workshops", href: "/music/workshops" },
  ],
  yoga: [
    { label: "Classes", href: "/yoga/classes" },
    { label: "Retreats", href: "/yoga/retreats" },
    { label: "Individual", href: "/yoga/individual" },
  ],
  therapy: [
    { label: "Phonophoresis", href: "/therapy/phonophoresis" },
    { label: "Sound baths", href: "/therapy/sound-baths" },
  ],
};

export function buildMainNav(services: ServiceNavItem[] = []): NavItem[] {
  const byCategory = (category: ServiceCategory): NavItem[] => {
    const fromCms = services
      .filter(
        (service) =>
          service.category === category &&
          typeof service.slug === "string" &&
          service.slug.length > 0 &&
          typeof service.title === "string" &&
          service.title.length > 0,
      )
      .map((service) => ({
        label: service.title,
        href: `/${category}/${service.slug}`,
      }));

    return fromCms.length > 0 ? fromCms : fallbackServiceNav[category];
  };

  return [
    { label: "Music", href: "/music", children: byCategory("music") },
    { label: "Yoga", href: "/yoga", children: byCategory("yoga") },
    { label: "Therapy", href: "/therapy", children: byCategory("therapy") },
    { label: "Shop", href: "/shop", children: shopNavChildren },
    { label: "Contact", href: "/contact" },
  ];
}

/** Default static nav (fallback-only). Prefer `getMainNav()` for live data. */
export const mainNav: NavItem[] = buildMainNav();

export type ServiceFallback = {
  category: ServiceCategory;
  slug: string;
  title: string;
  subcategory: string;
  summary: string;
  body: string[];
  imageSrc: string;
  imageAlt: string;
};

export const serviceFallbacks: ServiceFallback[] = [
  {
    category: "music",
    slug: "concerts",
    title: "Live Concerts",
    subcategory: "Concerts",
    summary: "Intimate performances weaving clarinet, voice, and atmosphere.",
    body: [
      "Live concerts invite listeners into a shared field of resonance — from chamber settings to open spaces where sound can breathe.",
      "Each programme is shaped around presence, listening, and the quiet power of acoustic instruments.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Laura de la Riva performing with clarinet",
  },
  {
    category: "music",
    slug: "classes",
    title: "Music Classes",
    subcategory: "Classes",
    summary: "Guided classes for deepening musical listening and practice.",
    body: [
      "Classes focus on breath, tone, and attentive listening — suitable for beginners and experienced musicians alike.",
      "We explore sound as both craft and contemplative practice.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Music classes with Laura de la Riva",
  },
  {
    category: "music",
    slug: "workshops",
    title: "Music Workshops",
    subcategory: "Workshops",
    summary: "Immersive workshops on sound, improvisation, and group listening.",
    body: [
      "Workshops open space for collective exploration — improvisation, vibration, and the relationship between sound and body.",
      "No prior musical training is required; curiosity is enough.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Music workshop atmosphere",
  },
  {
    category: "yoga",
    slug: "classes",
    title: "Yoga Classes",
    subcategory: "Classes",
    summary: "Steady, breath-led yoga for clarity and grounded presence.",
    body: [
      "Classes combine mindful movement with spacious pauses, supporting nervous-system ease and embodied awareness.",
      "All levels are welcome; modifications are always offered.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Yoga practice with Laura de la Riva",
  },
  {
    category: "yoga",
    slug: "retreats",
    title: "Yoga Retreats",
    subcategory: "Retreats",
    summary: "Immersive retreats for rest, practice, and renewal.",
    body: [
      "Retreats weave asana, silence, and sound into a nourishing rhythm away from daily noise.",
      "Each gathering is intentionally paced so the body can settle and listen.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Yoga retreat setting",
  },
  {
    category: "yoga",
    slug: "individual",
    title: "Individual Yoga",
    subcategory: "Individual",
    summary: "One-to-one sessions tailored to your body and intention.",
    body: [
      "Private sessions meet you where you are — recovery, flexibility, breath, or a quieter relationship with practice.",
      "Together we shape a path that feels sustainable and kind.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Individual yoga session",
  },
  {
    category: "therapy",
    slug: "phonophoresis",
    title: "Phonophoresis",
    subcategory: "Phonophoresis",
    summary: "Therapeutic sound work supporting release and regulation.",
    body: [
      "Phonophoresis sessions use carefully guided sound to support the body's capacity for rest and integration.",
      "The work is gentle, attentive, and grounded in listening.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Phonophoresis therapy session",
  },
  {
    category: "therapy",
    slug: "sound-baths",
    title: "Sound Baths",
    subcategory: "Sound baths",
    summary: "Immersive sound baths for deep rest and nervous-system reset.",
    body: [
      "Sound baths invite you to receive — lying down, eyes soft, while waves of tone wash through the space.",
      "A practice of sound healing and nada yoga in community.",
    ],
    imageSrc: SITE_LOGO,
    imageAlt: "Sound bath with Laura de la Riva",
  },
];

export function getServiceFallback(
  category: string,
  slug: string,
): ServiceFallback | undefined {
  return serviceFallbacks.find(
    (service) => service.category === category && service.slug === slug,
  );
}
