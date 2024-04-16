import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#A729F5",
        pureWhite: "#FFF",
        green: "#26D782",
        red: "#EE5454",
        lightGray: "#F4F6FA",
        grayNavy: "#626C7F",
        darkHeavy: "#313E51",
        lightBluish: "#ABC1E1",
      }
    },
  },
  plugins: [],
};
export default config;
