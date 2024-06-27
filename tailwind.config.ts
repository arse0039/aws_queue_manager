import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/(components)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "nav-light": "#F7F7F7",
        "nav-dark": "#1E1E1E",
        "page-dark": "#121212",
        "page-light": "#FFFFFF",
        "default-text-black": "#1A1A1A",
        "default-text-white": "#F0F0F0",
        "purple-accent": "#8A4FFF",
        "purple-accent-hover": "#6A2FF0",
        "dark-purple-accent": "#A875FF",
        "dark-purple-secondary": "#9B4DFF",
        "light-purple": "#E6D8FF",
        "error-red": "#FF4D4D",
        "success-green": " #4CAF50",

      },
    },
  },
  plugins: [],
};
export default config;
