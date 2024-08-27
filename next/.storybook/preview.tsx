import "@/styles/globals.css";

import { type Preview } from "@storybook/react";

import nextIntl from "./next-intl";

// TODO: Centralize internationalization configuration somewhere else

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
    nextIntl,
  },
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      fi: "Finnish",
      sv: "Swedish",
    },
  },
};

export default preview;
