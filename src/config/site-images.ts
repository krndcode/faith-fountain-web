/**
 * Site Image Asset Mapping
 * 
 * Update these paths when actual foundation photography and official logo files
 * are placed inside the `public/` directory.
 * 
 * Note: When a photograph file has not yet been provided, the application will
 * automatically render an elegant branded SVG / CSS fallback component to prevent
 * broken image icons or fabricated imagery.
 */

export interface SiteImageAsset {
  /** Path relative to the public/ directory */
  src: string;
  /** Accessible descriptive alt text */
  alt: string;
  /** Human-readable asset description for administrators */
  description: string;
  /** Set to true when actual high-resolution local file is placed in public/ */
  isCustomAssetAvailable: boolean;
  /** Dimensions when known */
  width?: number;
  height?: number;
}

export const siteImages = {
  // Foundation Logo
  logo: {
    src: "/images/logo.svg",
    alt: "Faith Fountain Foundation Logo",
    description: "Official foundation logo with cross & fountain motif",
    isCustomAssetAvailable: true,
    width: 280,
    height: 70,
  },
  logoWhite: {
    src: "/images/logo-white.svg",
    alt: "Faith Fountain Foundation Logo",
    description: "White variant for dark footer & hero backgrounds",
    isCustomAssetAvailable: true,
    width: 280,
    height: 70,
  },

  // Homepage Hero
  hero: {
    src: "/images/hero-community.svg",
    alt: "Faith Fountain Foundation community outreach and fellowship",
    description: "High-resolution photograph of foundation members serving communities",
    isCustomAssetAvailable: true,
    width: 1200,
    height: 700,
  },

  // About Page
  aboutStory: {
    src: "/images/about-story.svg",
    alt: "Foundation volunteers collaborating in community service",
    description: "Foundation leadership and team members in service",
    isCustomAssetAvailable: true,
    width: 1000,
    height: 650,
  },

  // Program Photographs
  educationSupport: {
    src: "/images/program-education.svg",
    alt: "Donation of books, uniforms, and learning materials to schools",
    description: "Books, school uniforms, exercise books, and mathematical sets donated to schoolchildren",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  communitySupport: {
    src: "/images/program-community.svg",
    alt: "Community members receiving essential relief items and food packages",
    description: "Essential care items and supplies provided to families in local communities",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  childrenInCare: {
    src: "/images/program-children.svg",
    alt: "Support and supplies provided to Happy Home Orphanage",
    description: "Supplies, provisions, and compassionate care for children in residential care",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  hospitalAssistance: {
    src: "/images/program-hospital.svg",
    alt: "Healthcare assistance and hospital bill relief for individuals in need",
    description: "Compassionate financial relief for patients facing medical and hospital expenses",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  gospelOutreach: {
    src: "/images/program-gospel.svg",
    alt: "Christian gospel outreach and compassionate ministry in action",
    description: "Fellowship, sharing biblical hope, and community outreach",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  // Future Goals
  schoolConstruction: {
    src: "/images/goal-school-construction.svg",
    alt: "Architectural concept for future school building projects",
    description: "Long-term goal of building enduring schools for underserved children",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  smallBusinessEmpowerment: {
    src: "/images/goal-small-business.svg",
    alt: "Empowerment through small business tools and trade skills",
    description: "Helping individuals establish sustainable small enterprises",
    isCustomAssetAvailable: true,
    width: 800,
    height: 500,
  },

  // News and Stories Default Fallback
  newsPlaceholder: {
    src: "/images/news-default.svg",
    alt: "Faith Fountain Foundation News & Updates",
    description: "Default featured image for news stories when no photograph is uploaded",
    isCustomAssetAvailable: true,
    width: 800,
    height: 480,
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;
