import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },
      colors: {
        cream: {
          DEFAULT: "#F5EFE0",
          50: "#FDFAF5",
          100: "#F5EFE0",
          200: "#E8DCC8",
          300: "#D4C4A0",
        },
        ink: {
          DEFAULT: "#1C1509",
          light: "#3D2E14",
          muted: "#7A6848",
          faint: "#B5A080",
        },
        rust: {
          DEFAULT: "#B84A1E",
          light: "#D4622A",
          dark: "#8C3614",
          pale: "#F2E4DC",
        },
        olive: {
          DEFAULT: "#4A5C2A",
          light: "#6A7E3E",
          pale: "#E4EBDA",
        },
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-600px 0" },
          "100%": { backgroundPosition: "600px 0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-up-delay-1": "fadeUp 0.6s 0.1s ease forwards both",
        "fade-up-delay-2": "fadeUp 0.6s 0.2s ease forwards both",
        "fade-up-delay-3": "fadeUp 0.6s 0.3s ease forwards both",
        "fade-in": "fadeIn 0.5s ease forwards",
        "shimmer": "shimmer 1.8s infinite linear",
      },
    },
  },
  plugins: [],
};
export default config;
