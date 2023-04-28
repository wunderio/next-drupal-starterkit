import "../styles/globals.css";
import { Preview } from "@storybook/react";
import i18n from "./i18next";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    i18n,
  },
  globals: {
    locale: "en",
    locales: {
      en: "English",
      fi: "Suomi",
      sv: "Svenska",
    },
  },
};

export default preview;
