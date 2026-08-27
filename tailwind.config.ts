import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080d",
        mist: "#12141c",
        foam: "#e8e4d9",
        gold: "#d4af7a",
        teal: "#3ee0c5",
        violet: "#8b7cff",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(212, 175, 122, 0.12)",
        teal: "0 0 48px rgba(62, 224, 197, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
