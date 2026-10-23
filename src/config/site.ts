export interface NavItem {
  title: string;
  href: string;
}

export const siteConfig = {
  name: "Faith Fountain Foundation",
  shortName: "Faith Fountain",
  motto: "Faith in action. Hope for every life.",
  establishedYear: 2022,
  description:
    "A Christian nonprofit foundation established in 2022 with head office in Canada and branches in Ghana, dedicated to supporting education, community assistance, hospital bills, and Gospel outreach.",
  contact: {
    email: "faithfountain2022@gmail.com",
    whatsappNumber: "+233 59 447 9869",
    whatsappUrl: "https://wa.me/233594479869",
    phones: [
      { label: "Ghana Line 1", number: "+233 53 334 8886", tel: "+233533348886" },
      { label: "Ghana Line 2", number: "+233 26 057 1582", tel: "+233260571582" },
    ],
    locations: {
      headOffice: "Canada",
      branches: "Ghana",
    },
    facebookUrl: "https://www.facebook.com/share/18LRR8wppM/?mibextid=wwXIfr",
  },
  navigation: [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Our Programs", href: "/programs" },
    { title: "Our Impact", href: "/impact" },
    { title: "News & Stories", href: "/news" },
    { title: "Get Involved", href: "/get-involved" },
    { title: "Contact Us", href: "/contact" },
  ] as NavItem[],
  mission:
    "To demonstrate God's love through practical support that strengthens education, improves wellbeing, and brings hope to people in need.",
  vision:
    "To build schools, help people in need establish businesses, and promote and support the Gospel.",
  values: [
    {
      title: "Faith",
      description: "Letting our Christian faith guide our service.",
    },
    {
      title: "Compassion",
      description: "Responding to people's needs with kindness.",
    },
    {
      title: "Dignity",
      description: "Treating everyone with respect.",
    },
    {
      title: "Generosity",
      description: "Sharing resources to support others.",
    },
    {
      title: "Empowerment",
      description: "Creating opportunities for people to become self-reliant.",
    },
  ],
  futureGoals: [
    {
      title: "Build Schools",
      description:
        "Constructing enduring educational facilities to provide quality learning environments for underserved children.",
    },
    {
      title: "Small-Business Empowerment",
      description:
        "Providing micro-grants, basic training, and tools to help individuals and families establish sustainable livelihoods.",
    },
    {
      title: "Expand Community Assistance",
      description:
        "Widening our distribution network for essential relief items, clean water, and emergency family provisions.",
    },
    {
      title: "Promote and Support the Gospel",
      description:
        "Partnering with local fellowships, sharing biblical hope, and demonstrating Christ's love through compassionate action.",
    },
  ],
  requestedSchoolSupplies: [
    "School bags",
    "School uniforms",
    "Footwear",
    "Exercise books",
    "Pens and pencils",
    "Mathematical sets",
    "Other useful learning materials",
  ],
  paypalCurrencies: [
    { code: "CAD", symbol: "CA$", label: "Canadian Dollar (CAD)" },
    { code: "USD", symbol: "$", label: "US Dollar (USD)" },
    { code: "GBP", symbol: "£", label: "British Pound (GBP)" },
    { code: "EUR", symbol: "€", label: "Euro (EUR)" },
  ],
  defaultDonationAmounts: [10, 25, 50, 100, 250],
};
