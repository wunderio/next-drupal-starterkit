import "../styles/globals.css";

import { type Preview } from "@storybook/react";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18nConfig from "../i18n";
import i18n from "./i18n";

/** Adapted from https://storybook.js.org/recipes/react-i18next */
const withI18next = (Story, context) => {
  const { locale } = context.globals;

  // When the locale global changes, set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};

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
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fi", title: "Suomi" },
          { value: "sv", title: "Svenska" },
        ],
        showName: true,
      },
    },
  },
  globals: {
    locale: i18nConfig.defaultLocale,
    locales: Object.entries(i18nConfig.locales).reduce(
      (acc, [key, { name }]) => {
        acc[key] = name;
        return acc;
      },
      {},
    ),
  },
  decorators: [withI18next],
};

export default preview;
