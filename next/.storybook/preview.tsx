import "@/styles/globals.css";

import { type Preview } from "@storybook/react";

import nextIntl from "./next-intl";

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
      en: { icon: "🇺🇸", title: "English", right: "EN" },
      fi: { icon: "🇫🇮", title: "Finnish", right: "FI" },
      sv: { icon: "🇸🇪", title: "Swedish", right: "SV" },
    },
  },
};

export default preview;
