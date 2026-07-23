import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        ink: "#1C1B19",
        indigo: "#2B3A55",
        marigold: "#E8A33D",
        vermilion: "#A13D2C",
        line: "#E4DFD3",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
