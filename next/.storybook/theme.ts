import { create } from "@storybook/theming/create";

export default create({
  base: "dark",

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Branding
  brandTitle: "Wunder Component Library",
  brandUrl: "https://wunder.io",
  brandTarget: "_blank",
  // brandImage: "https://storybook.js.org/images/placeholders/350x150.png",

  // Main colors
  colorPrimary: "#5b37bf", // primary-600
  colorSecondary: "#ff4185", // secondary-400

  // UI
  // appBg: colors.mischka,
  // appContentBg: colors.mischka,
  // appBorderColor: colors.primary[600],
  // appBorderRadius: 4,

  // Text colors
  // textColor: colors.steelgray,
  // textInverseColor: colors.mischka,

  // Toolbar default and active colors
  // barTextColor: colors.steelgray,
  // barSelectedColor: colors.secondary[600],
  // barBg: colors.mischka,

  // Form colors
  // inputBg: colors.mischka,
  // inputBorder: colors.steelgray,
  // inputTextColor: colors.steelgray,
  // inputBorderRadius: 2,
});
