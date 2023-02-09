/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
