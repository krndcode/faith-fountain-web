/**
 * Site Image Asset Mapping
 * 
 * Maps official foundation photographs and logo files located in `public/images/`.
 */

export interface SiteImageAsset {
  /** Path relative to public/ */
  src: string;
  /** Accessible descriptive alt text */
  alt: string;
  /** Asset description for foundation records */
  description: string;
  /** High-resolution image available */
  isCustomAssetAvailable: boolean;
  width?: number;
  height?: number;
}

export const siteImages = {
  // Official Foundation Logo
  logo: {
    src: "/images/faith-fountain-logo.jpg",
    alt: "Faith Fountain Foundation Official Crest Logo",
    description: "Official circular foundation logo with cross, fountain, and Christian motif",
    isCustomAssetAvailable: true,
    width: 1440,
    height: 1440,
  },
  logoWhite: {
    src: "/images/faith-fountain-logo.jpg",
    alt: "Faith Fountain Foundation Official Crest Logo",
    description: "Official foundation logo badge",
    isCustomAssetAvailable: true,
    width: 1440,
    height: 1440,
  },

  // Homepage Hero
  hero: {
    src: "/images/hero.png",
    alt: "Faith Fountain Foundation community and outreach in Ghana",
    description: "High-resolution banner photograph of foundation outreach in Ghana",
    isCustomAssetAvailable: true,
    width: 1366,
    height: 768,
  },

  // About Page
  aboutStory: {
    src: "/images/schpro07.jpg",
    alt: "Faith Fountain Foundation community outreach and care mission",
    description: "Foundation leadership and team members providing community care",
    isCustomAssetAvailable: true,
    width: 1366,
    height: 768,
  },

  // Program Photographs (Using verified local photography)
  educationSupport: {
    src: "/images/schpro01.jpg",
    alt: "Donation of books, school uniforms, and learning materials to schools",
    description: "Books, school uniforms, exercise books, and mathematical sets donated to schoolchildren in Ghana",
    isCustomAssetAvailable: true,
    width: 1280,
    height: 720,
  },

  communitySupport: {
    src: "/images/comm21.jpg",
    alt: "Community members receiving essential relief items and food packages",
    description: "Essential care items and supplies provided to families in local communities",
    isCustomAssetAvailable: true,
    width: 960,
    height: 1280,
  },

  childrenInCare: {
    src: "/images/happyhome01.jpg",
    alt: "Support and supplies provided to Happy Home Orphanage",
    description: "Supplies, provisions, and compassionate care for children in residential care",
    isCustomAssetAvailable: true,
    width: 2048,
    height: 1536,
  },

  hospitalAssistance: {
    src: "/images/hospitalass1.jpg",
    alt: "Healthcare assistance and hospital bill relief for individuals in need",
    description: "Compassionate financial relief for patients facing medical and hospital expenses",
    isCustomAssetAvailable: true,
    width: 810,
    height: 1080,
  },

  gospelOutreach: {
    src: "/images/comm11.jpg",
    alt: "Christian gospel outreach and compassionate ministry in action",
    description: "Community gathering, sharing biblical hope, and gospel fellowship",
    isCustomAssetAvailable: true,
    width: 960,
    height: 1280,
  },

  // Future Goals
  schoolConstruction: {
    src: "/images/schpro04.jpg",
    alt: "Classroom and school environment for future school building projects",
    description: "Long-term goal of constructing enduring schools for underserved children",
    isCustomAssetAvailable: true,
    width: 1280,
    height: 720,
  },

  smallBusinessEmpowerment: {
    src: "/images/comm03.jpg",
    alt: "Community empowerment and livelihood support in Ghana",
    description: "Helping individuals and families establish sustainable livelihoods",
    isCustomAssetAvailable: true,
    width: 960,
    height: 1280,
  },

  // News and Stories Default Fallback
  newsPlaceholder: {
    src: "/images/comm07.jpg",
    alt: "Faith Fountain Foundation News & Updates",
    description: "Default featured image for news stories from field outreach",
    isCustomAssetAvailable: true,
    width: 960,
    height: 1280,
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
