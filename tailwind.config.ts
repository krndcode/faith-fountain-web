import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: "#073B17",
          "forest-light": "#0B4D20",
          growth: "#078A12",
          "growth-hover": "#06730F",
          "growth-soft": "#E8F5E9",
          ivory: "#F5F2E9",
          "ivory-light": "#FAF8F4",
          charcoal: "#333B35",
          "charcoal-muted": "#5C665F",
          "charcoal-light": "#7D8780",
          border: "#E2DDD2",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Lora", "Merriweather", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Lato", "Open Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(7, 59, 23, 0.05)",
        card: "0 4px 20px rgba(7, 59, 23, 0.07)",
        elevated: "0 10px 30px rgba(7, 59, 23, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
