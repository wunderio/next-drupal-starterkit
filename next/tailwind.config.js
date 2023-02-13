const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // These properties *replace* the defaults:
    fontFamily: {
      sans: ["var(--font-overpass)", ...fontFamily.sans],
    },
    fontSize: {
      xs: ["0.60rem", { lineHeight: "1.5" }],
      sm: ["0.80rem", { lineHeight: "1.5" }],
      md: ["1.00rem", { lineHeight: "1.5" }],
      lg: ["1.25rem", { lineHeight: "1.5" }],
      xl: ["1.60rem", { lineHeight: "1.5" }],
      "2xl": ["1.9rem", { lineHeight: "1.5" }],
      "heading-xs": ["1.25rem", { lineHeight: "1.25" }],
      "heading-sm": ["1.9rem", { lineHeight: "1.25" }],
      "heading-md": ["2.4rem", { lineHeight: "1.25" }],
      "heading-lg": ["3.1rem", { lineHeight: "1.25" }],
      "heading-xl": ["3.8rem", { lineHeight: "1.25" }],
      "heading-2xl": ["4.75rem", { lineHeight: "1.25" }],
    },
    fontWeight: {
      light: "300",
      regular: "400",
      bold: "700",
    },
    lineHeight: {
      md: "1.25",
      lg: "1.5",
      xl: "1.75",
    },
    // These properties *extend* the defaults:
    extend: {
      colors: {
        // Generated with https://uicolors.app/
        wunderpurple: {
          50: "#eeefff",
          100: "#e1e2fe",
          200: "#c8c9fd",
          300: "#a9a7fa",
          400: "#8f84f5",
          500: "#7d66ee",
          600: "#6f4ae1",
          700: "#5b37bf", // This is the official Wunder purple
          800: "#4e33a0",
          900: "#42307f",
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
