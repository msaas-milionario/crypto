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
        "orange": "#EB6C18"
      },
      gridTemplateColumns: {
        "my": "240px repeat(2, 1fr)"
      }
    },
  },
  plugins: [],
};
export default config;
