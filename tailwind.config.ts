import type { Config } from "tailwindcss";
//
const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utilities/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "g-primary": "var(--bg-primary)",
        "c-primary": "var(--c-primary)",
        "tx-gray": "var(--tx-gray)",
      },
    },
  },
  plugins: [],
};
export default config;
