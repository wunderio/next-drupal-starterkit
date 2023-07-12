const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./{components,lib,pages,stories,styles,ui}/**/*"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      steelgray: "#221f2d",
      scapaflow: "#555161",
      stone: "#767283",
      topaz: "#9b98a4",
      graysuit: "#c4c2cc",
      finnishwinter: "#e7e6eb",
      mischka: "#f7f7f8",
      white: "#ffffff",

      info: "#221f2d",
      success: "#007f6c",
      warning: "#f7a700",
      error: "#c80909",

      primary: {
        900: "#261da1",
        800: "#3f29ae",
        700: "#4d2fb6",
        600: "#5b37bf", // "Wunder purple"
        500: "#653cc5",
        400: "#7d59ce",
        300: "#9577d7",
        200: "#b49fe2",
        100: "#d2c5ed",
        50: "#ede7f8",
      },
      secondary: {
        900: "#9e005d",
        800: "#c30a63",
        700: "#d81066",
        600: "#ef146b",
        500: "#ff186e",
        400: "#ff4185",
        300: "#ff669d",
        200: "#ff93b9",
        100: "#ffbed5",
        50: "#ffe5ee",
      },
    },
    fontFamily: {
      inter: ["--font-inter", ...defaultTheme.fontFamily.sans],
      overpass: ["--font-overpass", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: ["0.813rem", { lineHeight: "1.5" }],
      sm: ["1rem", { lineHeight: "1.5" }],
      md: ["1.125rem", { lineHeight: "1.5" }],
      lg: ["1.25rem", { lineHeight: "1.5" }],
      xl: ["1.6rem", { lineHeight: "1.5" }],
      "2xl": ["1.9rem", { lineHeight: "1.5" }],
      "heading-xs": ["1.125rem", { lineHeight: "1.25" }],
      "heading-sm": ["1.9rem", { lineHeight: "1.25" }],
      "heading-md": ["2.4rem", { lineHeight: "1.25" }],
      "heading-lg": ["3.1rem", { lineHeight: "1.25" }],
      "heading-xl": ["3.8rem", { lineHeight: "1.25" }],
      "heading-2xl": ["4.75rem", { lineHeight: "1.25" }],
    },
    fontWeight: {
      light: "300",
      regular: "400",
      semibold: "500",
      bold: "700",
    },
    lineHeight: {
      1: "1",
      md: "1.25",
      lg: "1.5",
      xl: "1.75",
    },
    extend: {
      borderRadius: {
        ...defaultTheme.borderRadius,
        DEFAULT: "3px",
      },
      boxShadow: {
        ...defaultTheme.boxShadow,
        short: "0px 1px 1px rgba(34, 31, 45, 0.15)",
        long: "0px 12px 16px rgba(34, 31, 45, 0.15)",
      },
      opacity: {
        ...defaultTheme.opacity,
        15: "0.15",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
