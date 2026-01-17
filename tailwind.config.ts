import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      colors: {
        night: "#0f172a",
        dusk: "#1e293b",
        dawn: "#f8fafc",
        accent: {
          DEFAULT: "#38bdf8",
          soft: "#bae6fd"
        }
      }
    }
  },
  plugins: []
};

export default config;
