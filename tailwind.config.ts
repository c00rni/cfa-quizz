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
        pureWhite: "#FFF",
        green: "#26D782",
        red: "#EE5454",
        lightGray: "#F4F6FA",
        grayNavy: "#626C7F",
        darkHeavy: "#313E51",
        lightBluish: "#ABC1E1",
      },
      backgroundColor: {
        purple: "#A729F5",
        lightBluish: "#ABC1E1",
        lightBlue: "#EDF1F9",
        lightGray: "#F4F6FA",
      },
      fontSize: {
        headingRegular: "4rem",
        headingBold: "8.8rem",
        regular: "1.8rem",
        medium: "2rem",
        semiMedium: "1.4rem"
      },
    },
  },
  plugins: [],
};
export default config;
