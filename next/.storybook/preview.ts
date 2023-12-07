import "../styles/globals.css";
import { Preview } from "@storybook/react";

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
